/**
 * ==========================================================================
 * MedFA - Điều phối Trang Chi tiết Tình huống Sơ cấp cứu (topic-detail.html)
 * ==========================================================================
 * Tách riêng từ inline script để mã nguồn dễ đọc, dễ bảo trì cho developer.
 * Chức năng chính:
 *  1. Nạp dữ liệu chi tiết tình huống theo tham số `?id=...`
 *  2. Đồng bộ SEO động: Title, Description, Canonical, Open Graph & Schema.org
 *     (MedicalWebPage + HowTo + BreadcrumbList + Citation nguồn y khoa)
 *  3. Render Timeline 4 phút vàng, Video minh họa, Nguồn tham khảo & Tình huống liên quan
 *  4. Bộ đếm nhịp ép tim CPR 110 BPM (Web Audio API + Visual Pulse)
 */
(function () {
  'use strict';

  /**
   * Escape ký tự đặc biệt HTML để chống XSS (tái sử dụng hàm escapeHTML từ js/components/layout.js)
   * @param {string|number} str
   * @returns {string}
   */
  function escapeTopicHTML(str) {
    if (window.MedFAComponents?.escapeHTML) {
      return window.MedFAComponents.escapeHTML(str);
    }
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /**
   * Tạo URL tuyệt đối cho trang chi tiết hiện tại
   * @param {string} topicId
   * @returns {string}
   */
  function getTopicCanonicalUrl(topicId) {
    if (window.MedFASeoHelper) {
      return window.MedFASeoHelper.buildCanonicalUrl(`topic-detail.html?id=${encodeURIComponent(topicId)}`);
    }
    return window.location.href;
  }

  /**
   * Nhúng Structured Data Schema.org (MedicalWebPage + HowTo) giúp Google hiển thị Rich Snippets
   * và ghi nhận trích dẫn (citation) từ các nguồn y khoa chính thống (E-E-A-T).
   * @param {Object} topic
   */
  function injectTopicSchema(topic) {
    if (!topic) return;
    const existing = document.getElementById('dynamic-topic-schema');
    if (existing) existing.remove();

    const canonicalUrl = getTopicCanonicalUrl(topic.id);
    const displayTitle = topic.fullTitle || topic.title;
    const citations = Array.isArray(topic.sources)
      ? topic.sources
          .filter(s => s && s.url && s.url.startsWith('https://'))
          .map(s => ({
            '@type': 'CreativeWork',
            name: s.name || s.url,
            url: s.url
          }))
      : [];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: displayTitle,
          description: topic.shortDesc || topic.lead,
          inLanguage: 'vi-VN',
          medicalAudience: {
            '@type': 'MedicalAudience',
            audienceType: 'Patient'
          },
          about: {
            '@type': 'MedicalCondition',
            name: topic.title
          },
          ...(citations.length > 0 ? { citation: citations } : {})
        },
        {
          '@type': 'HowTo',
          name: `Quy trình sơ cứu: ${displayTitle}`,
          description: topic.lead || topic.shortDesc,
          step: Array.isArray(topic.steps)
            ? topic.steps.map((s, idx) => ({
                '@type': 'HowToStep',
                position: s.stepNumber || idx + 1,
                name: s.title,
                text: s.desc
              }))
            : []
        }
      ]
    };

    const scriptEl = document.createElement('script');
    scriptEl.id = 'dynamic-topic-schema';
    scriptEl.type = 'application/ld+json';
    scriptEl.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(scriptEl);
  }

  /**
   * Kiểm tra xem tình huống hiện tại có liên quan đến Hồi sinh tim phổi (CPR) hay không (DRY)
   * Dùng chung để quyết định bật/tắt cả Widget CPR Metronome và Bảng thông số CPR & AED.
   * @param {Object} topic
   * @returns {boolean}
   */
  const CPR_TOPIC_IDS = new Set([
    'ngung-tuan-hoan-cpr',
    'hoi-sinh-tim-phoi-nguoi-lon',
    'duoi-nuoc-o-tre-em',
    'dien-giat',
    'hoc-di-vat',
    'hoc-di-vat-o-tre-em'
  ]);

  function isCprTopic(topic) {
    if (!topic) return false;
    if (CPR_TOPIC_IDS.has(topic.id)) return true;
    const text = [
      topic.title || '',
      topic.lead || '',
      topic.emergencyAlert || '',
      ...(Array.isArray(topic.steps) ? topic.steps.map(s => `${s.title || ''} ${s.desc || ''}`) : [])
    ].join(' ').toLowerCase();
    return text.includes('cpr') || text.includes('ép tim') || text.includes('hồi sinh tim phổi');
  }

  function stepUsesCpr(step) {
    if (typeof step.showCprAedGuide === 'boolean') return step.showCprAedGuide;
    // Dữ liệu dự phòng có thể chưa có cờ showCprAedGuide.
    const text = `${step.title || ''} ${step.desc || ''}`;
    return /\b(?:CPR|chest compressions?)\b|ép tim|ép ngực|hồi sinh tim phổi/iu.test(text);
  }

  let stepCprGuide;
  let stopPageMetronome;

  function renderStepCprAgeGuide(step) {
    const slot = document.getElementById('step-guide-cpr-age-slot');
    if (!slot) return;
    slot.hidden = !stepUsesCpr(step);
    if (!slot.hidden && !slot.firstElementChild) {
      stepCprGuide = window.MedFAComponents?.mountCprAgeGuide(slot);
    }
    if (!slot.hidden) stepCprGuide?.selectAge(guideAudience?.cprAge || guideDefaultCprAge);
  }

  let guideSteps = [];
  let guideTopicTitle = '';
  let guideHistory = [];
  let guideAudiences = [];
  let guideAudience;
  let guideDefaultCprAge;

  function nextGuideIndex(start) {
    return guideSteps.findIndex((step, index) =>
      index >= start && !guideAudience?.skip?.includes(step.stepNumber));
  }

  function matchGuideRoute(decision, answers) {
    return decision.routes.find(route =>
      Object.entries(route.when).every(([key, value]) =>
        Object.prototype.hasOwnProperty.call(answers, key) && answers[key] === value));
  }

  function renderGuideIntake(container, nextButton) {
    container.innerHTML = `
      <h3 tabindex="-1" data-i18n="detail.guideIntake"></h3>
      <fieldset>
        <legend data-i18n="detail.guideAudienceQuestion"></legend>
        <div class="step-guide-dialog__answers step-guide-dialog__audiences">
          ${guideAudiences.map(({ id }) => `
            <label>
              <input type="radio" name="guide-audience" value="${escapeTopicHTML(id)}" ${guideAudience?.id === id ? 'checked' : ''}>
              <span data-i18n="detail.guideAudience.${escapeTopicHTML(id)}"></span>
            </label>`).join('')}
        </div>
      </fieldset>`;
    window.I18n?.applyTranslations(container);
    nextButton.disabled = !guideAudience;
    nextButton.textContent = t('detail.guideNext');
    container.onchange = event => {
      if (!event.target.matches('input[name="guide-audience"]')) return;
      guideAudience = guideAudiences.find(audience => audience.id === event.target.value);
      nextButton.disabled = !guideAudience;
    };
  }

  function renderGuideDecision(container, decision, answers, nextButton) {
    const presetAnswers = guideAudience?.answers || {};
    container.innerHTML = `
      <h3 tabindex="-1" data-i18n="detail.guideDecision"></h3>
      ${decision.questions.map(key => {
        const preset = Object.prototype.hasOwnProperty.call(presetAnswers, key);
        return `<fieldset>
          <legend>${escapeTopicHTML(t(`detail.guideQuestion.${key}`))}</legend>
          <div class="step-guide-dialog__answers">
            ${[true, false].map(value => `<label>
              <input type="radio" name="${escapeTopicHTML(key)}" value="${value}" ${answers[key] === value ? 'checked' : ''} ${preset ? 'disabled' : ''}>
              <span data-i18n="detail.${value ? 'guideYes' : 'guideNo'}"></span>
            </label>`).join('')}
          </div>
        </fieldset>`;
      }).join('')}
      <p class="step-guide-dialog__note" aria-live="polite"></p>`;
    window.I18n?.applyTranslations(container);

    const note = container.querySelector('.step-guide-dialog__note');
    const update = () => {
      const route = matchGuideRoute(decision, answers);
      nextButton.disabled = !route;
      nextButton.textContent = t(route?.go === 0 ? 'detail.guideFinish' : 'detail.guideNext');
      note.textContent = route?.note ? t(`detail.guideNote.${route.note}`) : '';
    };
    container.onchange = event => {
      const input = event.target;
      if (!input.matches('input[type="radio"]') || input.disabled) return;
      answers[input.name] = input.value === 'true';
      update();
    };
    update();
  }

  function renderStepGuide(moveFocus = false) {
    const frame = guideHistory.at(-1);
    const intake = frame?.index === -1;
    const assessment = frame?.kind === 'decision';
    if (!frame || (!intake && !guideSteps[frame.index])) return;

    if (moveFocus) stepCprGuide?.stop();

    const step = guideSteps[frame.index];
    const count = guideSteps.length;
    const stepNumber = step?.stepNumber || 0;
    const image = document.getElementById('step-guide-image');
    const imagePlaceholder = document.getElementById('step-guide-image-placeholder');
    const progress = document.querySelector('.step-guide-dialog__progress');
    const progressFill = document.getElementById('step-guide-progress-fill');
    const previousButton = document.getElementById('step-guide-previous');
    const nextButton = document.getElementById('step-guide-next');
    const panel = document.getElementById('step-guide-panel');

    document.getElementById('step-guide-heading').textContent = guideTopicTitle;
    document.getElementById('step-guide-count').textContent = intake
      ? t('detail.guideIntake')
      : assessment
        ? t('detail.guideDecision')
        : t('detail.guideStepCount', { current: stepNumber, total: count });

    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', String(count));
    progress.setAttribute('aria-valuenow', String(stepNumber));
    progressFill.style.width = `${(stepNumber / count) * 100}%`;
    previousButton.disabled = guideHistory.length <= 1;
    const variant = guideAudience?.steps?.[stepNumber];
    document.getElementById('step-guide-figure').hidden = intake || assessment;
    document.getElementById('step-guide-copy').hidden = intake || assessment;
    panel.hidden = !intake && !assessment;

    if (intake) {
      renderGuideIntake(panel, nextButton);
      if (moveFocus) panel.querySelector('h3').focus();
      return;
    }

    if (assessment) {
      renderGuideDecision(panel, step.guideDecision, frame.answers, nextButton);
      if (moveFocus) panel.querySelector('h3').focus();
      return;
    }

    panel.replaceChildren();
    panel.onchange = null;
    const stepTitle = document.getElementById('step-guide-step-title');
    stepTitle.textContent = step.title || '';
    document.getElementById('step-guide-step-description').textContent = step.desc || '';
    const audienceNote = document.getElementById('step-guide-audience-note');
    audienceNote.textContent = variant?.note ? t(`detail.guideVariant.${variant.note}`) : '';
    audienceNote.hidden = !variant?.note;
    renderStepCprAgeGuide(step);

    nextButton.disabled = false;
    nextButton.textContent = !step.guideDecision && nextGuideIndex(frame.index + 1) < 0
      ? (window.t ? t('detail.guideFinish') : 'Hoàn tất')
      : (window.t ? t('detail.guideNext') : 'Tiếp theo');

    const imageNumber = String(stepNumber).padStart(2, '0');
    const imagePath = `images/steps/${encodeURIComponent(new URLSearchParams(window.location.search).get('id') || 'hoc-di-vat')}/step-${imageNumber}`;
    const imageFormats = ['webp', 'png'];
    let imageFormatIndex = 0;
    image.alt = `${guideTopicTitle} - ${step.title || ''}`;
    image.hidden = true;
    imagePlaceholder.hidden = false;
    image.onload = () => {
      image.hidden = false;
      imagePlaceholder.hidden = true;
    };
    image.onerror = () => {
      if (imageFormatIndex < imageFormats.length - 1) {
        imageFormatIndex += 1;
        image.src = `${imagePath}.${imageFormats[imageFormatIndex]}`;
        return;
      }
      image.hidden = true;
      imagePlaceholder.hidden = false;
    };
    image.src = `${imagePath}.${imageFormats[imageFormatIndex]}`;
    if (moveFocus) stepTitle.focus();
  }

  function initializeStepGuide() {
    const dialog = document.getElementById('step-guide-dialog');
    const openButton = document.getElementById('open-step-guide');
    const closeButton = document.getElementById('step-guide-close');
    const previousButton = document.getElementById('step-guide-previous');
    const nextButton = document.getElementById('step-guide-next');
    if (!dialog || !openButton || !closeButton || !previousButton || !nextButton) return;

    openButton.addEventListener('click', () => {
      if (guideSteps.length === 0) return;
      stopPageMetronome?.();
      guideAudience = undefined;
      guideHistory = [{ index: guideAudiences.length ? -1 : 0 }];
      renderStepGuide();
      dialog.showModal();
      closeButton.focus();
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => stepCprGuide?.stop());
    previousButton.addEventListener('click', () => {
      if (guideHistory.length <= 1) return;
      guideHistory.pop();
      renderStepGuide(true);
    });
    nextButton.addEventListener('click', () => {
      const frame = guideHistory.at(-1);
      if (frame?.index === -1) {
        if (!guideAudience) return;
        const index = nextGuideIndex(0);
        if (index < 0) return;
        guideHistory.push({ index });
        renderStepGuide(true);
        return;
      }
      const step = frame && guideSteps[frame.index];
      if (frame?.kind === 'decision' && step?.guideDecision) {
        const route = matchGuideRoute(step.guideDecision, frame.answers || {});
        if (!route) return;
        if (route.go === 0) {
          dialog.close();
          return;
        }
        const destination = guideSteps.findIndex(item => item.stepNumber === route.go);
        if (destination < 0) {
          console.error(`Invalid step-guide destination: ${route.go}`);
          return;
        }
        const index = nextGuideIndex(destination);
        if (index < 0) {
          dialog.close();
          return;
        }
        guideHistory.push({ index });
        renderStepGuide(true);
        return;
      }
      if (step?.guideDecision) {
        frame.answers = frame.answers || { ...guideAudience?.answers };
        guideHistory.push({ index: frame.index, kind: 'decision', answers: frame.answers });
        renderStepGuide(true);
        return;
      }
      const index = frame ? nextGuideIndex(frame.index + 1) : -1;
      if (index < 0) {
        dialog.close();
        return;
      }
      guideHistory.push({ index });
      renderStepGuide(true);
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  /**
   * Nạp khối Lưu ý y khoa (MEDICAL_DISCLAIMER_HTML) từ js/components/detail.js và gắn danh sách nguồn của bài
   */
  function renderMedicalDisclaimer(topic) {
    const disclaimer = document.getElementById('medical-disclaimer');
    if (!disclaimer) return;
    const markup = window.MedFAComponents?.MEDICAL_DISCLAIMER_HTML;
    if (markup && !disclaimer.dataset.loaded) {
      disclaimer.innerHTML = markup;
      disclaimer.dataset.loaded = 'true';
    }
    window.I18n?.applyTranslations(disclaimer);

    const list = document.getElementById('detail-source-list');
    if (!list) return;
    list.replaceChildren();

    for (const source of topic?.sources || []) {
      if (!source?.name && !source?.url) continue;
      let url;
      try {
        url = new URL(source.url);
      } catch {
        continue;
      }
      if (url.protocol !== 'https:') continue;

      const link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = source.name || url.hostname;
      link.className = 'underline text-primary hover:text-primary-container';

      const item = document.createElement('li');
      item.append(link);
      if (source.accessDate) {
        const dateNote = document.createElement('span');
        dateNote.className = 'text-xs text-on-surface-variant ml-1.5';
        const accessedPrefix = window.t ? t('disclaimer.accessedDate', { date: source.accessDate }) : `(Đối chiếu: ${source.accessDate})`;
        dateNote.textContent = accessedPrefix;
        item.append(dateNote);
      }
      list.append(item);
    }

    const emptyNotice = document.getElementById('detail-sources-empty');
    if (emptyNotice) {
      emptyNotice.hidden = list.childElementCount > 0;
    }
  }

  /**
   * Render động thanh mốc thời gian thiếu oxy cho bất kỳ bài học nào có dữ liệu timeline
   * @param {Object} topic
   */
  function renderTopicTimeline(topic) {
    const timelineBox = document.getElementById('choking-timeline');
    const labelsGrid = document.getElementById('hypoxia-timeline-labels');
    if (!timelineBox || !labelsGrid) return;

    if (!Array.isArray(topic.timeline) || topic.timeline.length === 0) {
      timelineBox.hidden = true;
      return;
    }

    const barsContainer = timelineBox.querySelector('.flex.w-full.bg-surface-container, .w-full.bg-surface-container');
    const colorMap = {
      safe: 'bg-secondary-container',
      warning: 'bg-primary-fixed',
      danger: 'bg-on-tertiary-container',
      critical: 'bg-tertiary'
    };
    const textMap = {
      safe: '',
      warning: '',
      danger: 'text-tertiary font-semibold',
      critical: 'text-tertiary font-bold'
    };

    const count = topic.timeline.length;
    const pct = `${(100 / count).toFixed(2)}%`;

    if (barsContainer) {
      barsContainer.innerHTML = topic.timeline.map(item => {
        const bg = colorMap[item.level] || 'bg-primary-fixed';
        return `<div class="h-full ${bg} transition-all" style="width: ${pct}" title="${escapeTopicHTML(item.time)}: ${escapeTopicHTML(item.status)}"></div>`;
      }).join('');
    }

    labelsGrid.className = `grid grid-cols-${Math.min(count, 4)} gap-2 text-center text-xs mt-2 text-on-surface-variant hypoxia-timeline-labels`;
    labelsGrid.innerHTML = topic.timeline.map(item => {
      const cls = textMap[item.level] || '';
      return `<div class="${cls}"><strong>${escapeTopicHTML(item.time)}</strong><br><span class="hidden sm:inline">${escapeTopicHTML(item.status)}</span></div>`;
    }).join('');

    timelineBox.hidden = false;
  }

  const CREATOR_EN_MAP = {
    'Bệnh viện Đa Khoa Tâm Anh': 'Tam Anh General Hospital',
    'Bệnh viện Đa khoa Tâm Anh': 'Tam Anh General Hospital',
    'Bệnh viện Bạch Mai / Báo Sức khỏe & Đời sống': 'Bach Mai Hospital / Health & Life Newspaper',
    'Bệnh viện Đại học Y dược TP.HCM': 'University Medical Center HCMC',
    'Bệnh viện Bỏng quốc gia Lê Hữu Trác': 'Le Huu Trac National Burn Hospital',
    'Bệnh viện Chấn thương Chỉnh hình TP.HCM': 'Hospital for Traumatology and Orthopaedics HCMC',
    'Bệnh viện Đa khoa tỉnh Phú Thọ': 'Phu Tho Provincial General Hospital',
    'Bệnh viện Hoàn Mỹ Sài Gòn': 'Hoan My Saigon Hospital',
    'Bệnh viện Nam Sài Gòn': 'South Saigon International General Hospital',
    'Sức khỏe & Đời sống (SKĐS)': 'Health & Life Newspaper (SKDS)',
    'Báo Sức khỏe & Đời sống': 'Health & Life Newspaper',
    'Báo Pháp Luật TP HCM': 'Ho Chi Minh City Law Newspaper',
    'Dr. Wynn Tran Official': 'Dr. Wynn Tran Official',
    'CDC Đồng Nai': 'Dong Nai CDC',
    'VTV24': 'VTV24',
    'THVL Tổng Hợp': 'THVL General',
    'Truyền hình Quảng Trị': 'Quang Tri Television',
    'Kênh sức khỏe cộng đồng': 'Community Health Channel',
    'HTV7': 'HTV7',
    '1LIFE FIRST AID (BS. Phạm Quang Vinh)': '1LIFE FIRST AID (Dr. Pham Quang Vinh)',
    'Nghệ An TV': 'Nghe An TV',
    'Y học thường thức – BS Nguyễn Trung Thực': 'General Medicine – Dr. Nguyen Trung Thuc',
    'VTV Sức khỏe': 'VTV Health',
    'Học Y Cùng Tui': 'Study Medicine With Me'
  };

  /**
   * Render liên kết video hướng dẫn — mở trực tiếp trên YouTube (không nhúng iframe)
   * @param {Object} topic
   */
  function renderTopicVideo(topic) {
    const videoSection = document.getElementById('detail-video-section');
    const creatorEl = document.getElementById('detail-video-creator');
    const linkEl = document.getElementById('detail-video-link');
    const linkLabelEl = document.getElementById('detail-video-link-label');

    if (!videoSection || !linkEl || !topic?.video?.youtubeUrl) {
      if (videoSection) videoSection.hidden = true;
      return;
    }

    try {
      const parsed = new URL(topic.video.youtubeUrl);
      if (parsed.protocol !== 'https:') {
        videoSection.hidden = true;
        return;
      }
      linkEl.href = parsed.href;
      if (linkLabelEl) {
        const isYouTube = parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be');
        const ytText = window.t ? t('detail.youtubeView') : 'Mở trên YouTube';
        const vidText = window.t ? t('detail.videoGuide') : 'Xem video hướng dẫn';
        linkLabelEl.textContent = isYouTube ? ytText : vidText;
      }
      if (creatorEl) {
        const lang = typeof window !== 'undefined' && window.I18n ? window.I18n.getLanguage() : 'vi';
        const prefix = (typeof window !== 'undefined' && typeof window.t === 'function')
          ? window.t('detail.videoSourcePrefix')
          : (lang === 'en' ? 'Professional Source: ' : lang === 'ja' ? '専門資料: ' : 'Nguồn chuyên môn: ');
        const fallback = (typeof window !== 'undefined' && typeof window.t === 'function')
          ? window.t('detail.videoFallbackDesc')
          : (lang === 'en'
            ? 'Visual instructional video for first aid procedure.'
            : lang === 'ja'
              ? '応急手当の手順を解説する動画です。'
              : 'Video minh họa trực quan quy trình sơ cấp cứu.');

        let creatorName = topic.video.creator || '';
        if (lang === 'en' && CREATOR_EN_MAP[creatorName]) {
          creatorName = CREATOR_EN_MAP[creatorName];
        }

        creatorEl.textContent = creatorName
          ? `${prefix}${creatorName}`
          : fallback;
      }

      videoSection.hidden = false;
    } catch {
      videoSection.hidden = true;
    }
  }

  /**
   * Render tối đa 3 tình huống liên quan cùng chuyên mục nhằm tăng liên kết nội bộ (Internal Linking SEO)
   * @param {Object} currentTopic
   * @param {Array<Object>} allTopics
   */
  function renderRelatedTopics(currentTopic, allTopics) {
    const section = document.getElementById('related-topics-section');
    const grid = document.getElementById('related-topics-grid');
    if (!section || !grid || !currentTopic || !Array.isArray(allTopics)) return;

    const sameCategory = allTopics.filter(
      t => t.id !== currentTopic.id && t.category === currentTopic.category && !t.needsMedicalReview
    );
    const fallbackPool = allTopics.filter(
      t => t.id !== currentTopic.id && t.category !== currentTopic.category && !t.needsMedicalReview
    );
    const related = [...sameCategory, ...fallbackPool].slice(0, 3);

    if (related.length === 0) {
      section.hidden = true;
      return;
    }

    grid.innerHTML = related.map(item =>
      window.MedFAComponents?.createRelatedTopicCardHTML
        ? window.MedFAComponents.createRelatedTopicCardHTML(item)
        : ''
    ).join('');

    section.hidden = false;
  }

  /**
   * Bơm động 2 component CPR (CPR_METRONOME_HTML & CPR_TABLE_HTML) từ js/components/detail.js
   * chỉ khi isCprTopic(topic) === true; các bài không phải CPR sẽ giữ 2 slot trống và ẩn hoàn toàn.
   * @param {Object} topic
   */
  function renderCprComponents(topic) {
    const hasCpr = isCprTopic(topic);
    const metronomeSlot = document.getElementById('cpr-metronome-slot');
    const tableSlot = document.getElementById('cpr-table-slot');

    if (metronomeSlot) {
      metronomeSlot.hidden = !hasCpr;
      if (hasCpr && !metronomeSlot.firstElementChild) {
        stopPageMetronome = window.MedFAComponents?.mountCprMetronome(metronomeSlot);
      }
      if (!hasCpr) stopPageMetronome?.();
    }

    if (tableSlot) {
      if (hasCpr) {
        if (!tableSlot.dataset.mounted && window.MedFAComponents?.CPR_TABLE_HTML) {
          tableSlot.innerHTML = window.MedFAComponents.CPR_TABLE_HTML;
          tableSlot.dataset.mounted = 'true';
        }
        tableSlot.hidden = false;
        window.I18n?.applyTranslations(tableSlot);
      } else {
        tableSlot.hidden = true;
        tableSlot.innerHTML = '';
        delete tableSlot.dataset.mounted;
      }
    }
  }

  /**
   * Điểm khởi chạy chính của trang Chi tiết tình huống
   */
  let renderRevision = 0;

  async function renderCurrentTopicDetail() {
    const revision = ++renderRevision;
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id') || 'hoc-di-vat';
    const allTopics = await window.DataLoader?.loadTopics();
    const topic = Array.isArray(allTopics)
      ? allTopics.find(t => t.id === topicId)
      : await window.DataLoader?.getTopicById(topicId);
    const matchesTopic = topic?.id === topicId;

    if (revision !== renderRevision) return;
    renderMedicalDisclaimer(matchesTopic ? topic : null);

    if (!matchesTopic || !topic) {
      guideSteps = [];
      document.getElementById('open-step-guide').hidden = true;
      const title = window.t ? t('detail.unavailableTitle') : 'Chủ đề hiện không khả dụng';
      document.title = `${title} - MedFA`;
      const breadcrumbEl = document.getElementById('breadcrumb-topic-title');
      const detailTitleEl = document.getElementById('detail-title');
      const detailLeadEl = document.getElementById('detail-lead');
      if (breadcrumbEl) breadcrumbEl.textContent = title;
      if (detailTitleEl) detailTitleEl.textContent = title;
      if (detailLeadEl) detailLeadEl.textContent = window.t ? t('detail.unavailableDesc') : 'Quay lại thư viện để chọn một chủ đề đang có.';
      const catBadge = document.getElementById('detail-category-badge');
      const readTimeBadge = document.getElementById('detail-read-time');
      if (catBadge) catBadge.hidden = true;
      if (readTimeBadge) readTimeBadge.hidden = true;
      return;
    }

    guideSteps = !topic.needsMedicalReview && Array.isArray(topic.steps) ? topic.steps : [];
    guideAudiences = topic.guideAudiences || [];
    guideDefaultCprAge = topic.guideDefaultCprAge;
    guideTopicTitle = topic.fullTitle || topic.title;
    document.getElementById('open-step-guide').hidden = guideSteps.length === 0;
    if (document.getElementById('step-guide-dialog').open) renderStepGuide();

    // Cập nhật SEO Meta, Canonical, Open Graph & Structured Data
    const displayTitle = topic.fullTitle || topic.title;
    const seoDesc = topic.shortDesc || topic.lead;
    const canonicalUrl = getTopicCanonicalUrl(topic.id);

    if (window.MedFASeoHelper) {
      window.MedFASeoHelper.updateDynamicHeadMeta({
        title: `${displayTitle} - MedFA`,
        description: seoDesc,
        canonicalUrl
      });
      window.MedFASeoHelper.injectBreadcrumbSchema([
        { name: window.t ? t('detail.breadcrumbHome') : 'Trang chủ', url: window.MedFASeoHelper.buildCanonicalUrl('index.html') },
        { name: window.t ? t('detail.breadcrumbTopics') : 'Thư viện sơ cấp cứu', url: window.MedFASeoHelper.buildCanonicalUrl('topics.html') },
        { name: displayTitle, url: canonicalUrl }
      ]);
    } else {
      document.title = `${displayTitle} - MedFA`;
    }

    injectTopicSchema(topic);

    // Cập nhật nội dung giao diện trang
    const breadcrumb = document.getElementById('breadcrumb-topic-title');
    if (breadcrumb) breadcrumb.textContent = displayTitle;

    const titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = displayTitle;

    const leadEl = document.getElementById('detail-lead');
    if (leadEl) leadEl.textContent = topic.lead || topic.shortDesc;

    const catBadge = document.getElementById('detail-category-badge');
    const catLabel = document.getElementById('detail-category-label');
    if (catBadge && catLabel) {
      const lang = typeof window !== 'undefined' && window.I18n ? window.I18n.getLanguage() : 'vi';
      const categoryName = (en, ja, vi) => lang === 'en' ? en : lang === 'ja' ? ja : vi;
      const catKey = (topic.category || '').toLowerCase();
      const rawLabel = (topic.categoryLabel || '').toLowerCase();

      let icon = 'medical_services';
      let labelText = topic.categoryLabel || topic.category;

      if (catKey === 'tai-nan' || catKey === 'chan-thuong' || rawLabel.includes('chấn thương') || rawLabel.includes('trauma')) {
        icon = 'personal_injury';
        labelText = categoryName('Trauma', '外傷', 'Chấn thương');
      } else if (catKey === 'tre-em' || rawLabel.includes('trẻ em') || rawLabel.includes('pediatric')) {
        icon = 'child_care';
        labelText = categoryName('Pediatric', '小児', 'Trẻ em');
      } else if (catKey === 'sinh-hoat' || rawLabel.includes('sinh hoạt') || rawLabel.includes('daily life')) {
        icon = 'home';
        labelText = categoryName('Daily Life', '日常生活', 'Sinh hoạt');
      } else if (catKey === 'ngoai-troi' || rawLabel.includes('ngoài trời') || rawLabel.includes('outdoor')) {
        icon = 'nature_people';
        labelText = categoryName('Outdoors', '屋外', 'Ngoài trời');
      } else if (catKey === 'benh-ly' || rawLabel.includes('bệnh lý') || rawLabel.includes('medical')) {
        icon = 'ecg_heart';
        labelText = categoryName('Medical', '医療', 'Bệnh lý');
      } else if (topic.id && topic.id.includes('hoc-di-vat')) {
        icon = 'air';
        labelText = categoryName('Airway Choking', '気道異物', 'Cấp cứu đường thở');
      }

      const iconEl = catBadge.querySelector('.material-symbols-outlined');
      if (iconEl) iconEl.textContent = icon;
      catLabel.textContent = labelText;
    }

    const readTime = document.getElementById('detail-read-time');
    if (readTime && topic.readTime) {
      readTime.innerHTML = `<span class="material-symbols-outlined text-[15px]">timer</span><span>${window.t ? t('detail.readPrefix') + ' ' : 'Đọc '}${escapeTopicHTML(topic.readTime)}</span>`;
    }

    // Khóa hiển thị hướng dẫn thao tác đối với bài chưa qua đối chiếu y khoa
    if (topic.needsMedicalReview) {
      if (leadEl) leadEl.textContent = window.t ? t('detail.reviewNotice') : 'Bài này đang chờ đối chiếu nội dung y khoa. Xem hướng dẫn chính thức bên dưới.';
      return;
    }

    const chokingNote = document.getElementById('choking-alert-note');
    if (chokingNote) chokingNote.hidden = topic.id !== 'hoc-di-vat';

    renderTopicTimeline(topic);
    renderTopicVideo(topic);
    renderCprComponents(topic);
    renderRelatedTopics(topic, allTopics);

    const alertEl = document.getElementById('detail-alert-text');
    if (alertEl && topic.emergencyAlert) {
      alertEl.textContent = topic.emergencyAlert;
    }

    const stepsContainer = document.getElementById('detail-steps-container');
    if (stepsContainer && Array.isArray(topic.steps) && topic.steps.length > 0 && window.MedFAComponents?.createStepCardHTML) {
      stepsContainer.innerHTML = topic.steps.map(window.MedFAComponents.createStepCardHTML).join('');
    }

    const dosList = document.getElementById('detail-dos-list');
    if (dosList && Array.isArray(topic.dos) && topic.dos.length > 0 && window.MedFAComponents?.createBulletListHTML) {
      dosList.innerHTML = window.MedFAComponents.createBulletListHTML(topic.dos, 'text-emerald-600');
    }

    const dontsList = document.getElementById('detail-donts-list');
    if (dontsList && Array.isArray(topic.donts) && topic.donts.length > 0 && window.MedFAComponents?.createBulletListHTML) {
      dontsList.innerHTML = window.MedFAComponents.createBulletListHTML(topic.donts, 'text-rose-600');
    }

    const guidanceEl = document.getElementById('topic-guidance');
    if (guidanceEl) guidanceEl.hidden = false;

  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeStepGuide();
    if (window.t) document.title = t('detail.pageTitle');
    renderCurrentTopicDetail();
  });

  window.addEventListener('medfa:languageChanged', () => {
    renderCurrentTopicDetail();
  });

})();

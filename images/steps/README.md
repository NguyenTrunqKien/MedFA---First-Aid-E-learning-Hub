# Step illustration images

The step-by-step guide looks for one optional WebP image per step using this layout:

```text
images/
└── steps/
    ├── hoc-di-vat/
    │   ├── step-01.webp
    │   ├── step-02.webp
    │   └── step-03.webp
    └── bong-cap-do-1-2/
        ├── step-01.webp
        └── step-02.webp
```

- Use the topic `id` from `data/topics.json` as the folder name.
- Name images by their displayed order: `step-01.webp`, `step-02.webp`, and so on.
- Use WebP images with a 16:9 landscape composition where possible.
- Add only the files for steps that have an illustration; missing images show an in-app placeholder.
- Keep each image in its topic folder. No JSON or backend changes are needed.

For example, the first step of `hoc-di-vat` uses `images/steps/hoc-di-vat/step-01.webp`.

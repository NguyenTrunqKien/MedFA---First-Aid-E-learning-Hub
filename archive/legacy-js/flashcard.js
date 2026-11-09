/**
 * MedFA Flashcard Interaction Module
 * Quick recall card flip logic for mobile first aid triage
 */

const Flashcard = (() => {
  function init() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Flashcard.init);

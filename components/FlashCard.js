// FlashCard.js
// Shows a flashcard that can flip between two modes:
// Mode 1: English → German (default)
// Mode 2: German → English (flipped)
// Audio available for BOTH English and German

import { useState } from "react";

export default function FlashCard({ card, onNext, flipped }) {

  const [revealed, setRevealed] = useState(false);

  // Speaks any text in any language using the free Web Speech API
  const playAudio = (text, lang) => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support audio. Please try Chrome or Edge.");
      return;
    }
    // Stop anything currently playing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;    // "en-GB" for English, "de-DE" for German
    utterance.rate = 0.85;    // Slightly slower — easier to follow
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Reset and move to next card
  const handleNext = () => {
    setRevealed(false);
    onNext();
  };

  // Decide question and answer based on flip direction
  const questionText   = flipped ? card.german  : card.english;
  const answerText     = flipped ? card.english : card.german;
  const questionLabel  = flipped ? "Translate to English" : "Translate to German";
  const answerLabel    = flipped ? "English" : "German";
  const questionLang   = flipped ? "de-DE" : "en-GB"; // language code for question audio
  const answerLang     = flipped ? "en-GB" : "de-DE"; // language code for answer audio

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-xl w-full mx-auto">

      {/* ── Question side (always visible) ── */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
          {questionLabel}
        </p>

        {/* Question text + audio button side by side */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-2xl font-semibold text-white leading-snug">
            {questionText}
          </p>

          {/* Audio button for the question */}
          <button
            onClick={() => playAudio(questionText, questionLang)}
            title={`Hear ${flipped ? "German" : "English"} pronunciation`}
            className="mt-1 p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-xl transition-colors flex-shrink-0"
          >
            🔊
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <hr className="border-gray-700 mb-6" />

      {/* ── Answer section ── */}
      {!revealed ? (

        // Before reveal — Show Answer button
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-xl text-lg transition-colors duration-200"
        >
          Show Answer 👀
        </button>

      ) : (

        // After reveal — answer + audio + grammar note + next
        <div className="space-y-4">

          {/* Answer text + audio button */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-yellow-400 mb-1">
                {answerLabel}
              </p>
              <p className="text-2xl font-bold text-yellow-300">
                {answerText}
              </p>
            </div>

            {/* Audio button for the answer */}
            <button
              onClick={() => playAudio(answerText, answerLang)}
              title={`Hear ${flipped ? "English" : "German"} pronunciation`}
              className="mt-1 p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-xl transition-colors flex-shrink-0"
            >
              🔊
            </button>
          </div>

          {/* Grammar note */}
          {card.grammar_note && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <span className="text-yellow-500 font-semibold">💡 Why this way? </span>
                {card.grammar_note}
              </p>
            </div>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl text-lg transition-colors duration-200"
          >
            Next sentence →
          </button>

        </div>
      )}

    </div>
  );
}
// page.js — Main page of the app
"use client";

import { useState, useEffect } from "react";
import FlashCard from "@/components/FlashCard";

const LANGUAGES = [
  { id: "german", label: "🇩🇪 German" },
];

const LEVELS = [
  { id: "a1", label: "A1 — Complete Beginner" },
  { id: "a2", label: "A2 — Elementary" },
  { id: "b1", label: "B1 — Intermediate" },
  { id: "b2", label: "B2 — Upper Intermediate" },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("german");
  const [level, setLevel] = useState("a1");
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // flipped = false means English → German
  // flipped = true  means German → English
  const [flipped, setFlipped] = useState(false);

  // Track if the flip icon is spinning (for animation)
  const [isSpinning, setIsSpinning] = useState(false);

  // Load cards whenever level changes
  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await import(`../data/${level}.json`);
        const shuffled = [...data.default].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Could not load cards:", error);
      }
    };
    loadCards();
  }, [level]);

  // Move to next card
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= cards.length ? 0 : prev + 1));
  };

  // Toggle direction + trigger spin animation
  const handleFlip = () => {
    // Start spinning animation
    setIsSpinning(true);

    // Toggle the direction
    setFlipped((prev) => !prev);

    // Reset card to hidden state when direction changes
    setCurrentIndex(0);

    // Stop spinning after 500ms (matches CSS transition duration)
    setTimeout(() => setIsSpinning(false), 500);
  };

  const currentCard = cards[currentIndex];
  const currentLevelLabel = LEVELS.find((l) => l.id === level)?.label.split("—")[0].trim();

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-10">

      {/* ── App title ── */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-black tracking-tight">
          🇩🇪 <span className="text-yellow-400">Denk</span> auf Deutsch
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Think in German — not just translate
        </p>
      </div>

      {/* ── Language tab + Level dropdown + Flip button ── */}
      <div className="flex items-center gap-4 mb-8 bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 w-full max-w-xl">

        {/* Language tabs */}
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => {
            const isActive = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                  ${isActive
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }
                `}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-700" />

        {/* Level dropdown */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="bg-gray-800 text-white text-sm font-semibold border border-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-yellow-400 cursor-pointer flex-1"
        >
          {LEVELS.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>
              {lvl.label}
            </option>
          ))}
        </select>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-700" />

        {/* ── Flip direction button ── */}
        <button
          onClick={handleFlip}
          title={flipped ? "Switch to English → German" : "Switch to German → English"}
          className="flex flex-col items-center gap-1 group"
        >
          {/* Direction labels above and below the icon */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            <span className={flipped ? "text-gray-500" : "text-yellow-400"}>EN</span>

            {/* The spinning flip icon */}
            <span
              className="text-gray-400 group-hover:text-yellow-400 transition-all duration-500 text-base"
              style={{
                display: "inline-block",
                transform: isSpinning ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.5s ease",
              }}
            >
              ⇄
            </span>

            <span className={flipped ? "text-yellow-400" : "text-gray-500"}>DE</span>
          </div>
        </button>

      </div>

      {/* ── Direction indicator below the bar ── */}
      <p className="text-gray-600 text-xs mb-4 tracking-wide">
        {flipped
          ? "🇩🇪 German  →  🇬🇧 English"
          : "🇬🇧 English  →  🇩🇪 German"
        }
      </p>

      {/* ── Progress ── */}
      {cards.length > 0 && (
        <p className="text-gray-500 text-sm mb-6 tracking-wide">
          <span className="text-yellow-500 font-semibold">{currentLevelLabel}</span>
          {" · "}Card {currentIndex + 1}
        </p>
      )}

      {/* ── Flash card ── */}
      {currentCard ? (
        <FlashCard
          card={currentCard}
          onNext={handleNext}
          flipped={flipped}
        />
      ) : (
        <p className="text-gray-500 mt-10">Loading cards...</p>
      )}

      {/* ── Footer ── */}
      <p className="mt-10 text-gray-600 text-xs tracking-wide">
        Created by{" "}
        <span className="text-yellow-500 font-semibold">CindyDike</span>
      </p>

    </main>
  );
}
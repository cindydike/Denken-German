// LevelSelector.js
// This component shows 4 buttons: A1, A2, B1, B2
// When the user clicks a button, it tells the main page which level was chosen

// The 4 levels with their labels and descriptions
const LEVELS = [
  { id: "a1", label: "A1", description: "Complete Beginner" },
  { id: "a2", label: "A2", description: "Elementary" },
  { id: "b1", label: "B1", description: "Intermediate" },
  { id: "b2", label: "B2", description: "Upper Intermediate" },
];

// This component receives 2 things from the parent page:
// - selectedLevel: which level is currently active e.g. "a1"
// - onSelectLevel: a function to call when user picks a new level
export default function LevelSelector({ selectedLevel, onSelectLevel }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">

      {/* Loop through each level and create a button for it */}
      {LEVELS.map((level) => {

        // Check if this button is the currently selected one
        const isActive = selectedLevel === level.id;

        return (
          <button
            key={level.id}
            onClick={() => onSelectLevel(level.id)}
            className={`
              px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 border-2
              ${isActive
                ? "bg-yellow-400 border-yellow-400 text-gray-900 scale-105 shadow-lg"
                : "bg-transparent border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
              }
            `}
          >
            {/* Level label e.g. "A1" */}
            <div className="text-lg">{level.label}</div>

            {/* Level description e.g. "Complete Beginner" */}
            <div className="text-xs font-normal opacity-80">{level.description}</div>

          </button>
        );
      })}

    </div>
  );
}
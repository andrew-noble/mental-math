import { useState } from "react";
import { clearStorage } from "../services/localStorage";

export default function Info() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    if (showConfirm) {
      clearStorage();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          About This App
        </h1>
        <p className="text-gray-700">
          Built by Andrew Noble. I'd love it if you left feedback via the
          anonymous form on my{" "}
          <a
            href="https://www.andrewnoble.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            website!
          </a>
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleClearData}
            className={`px-4 py-2 rounded-md transition-colors ${
              showConfirm
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            {showConfirm ? "Click again to confirm" : "Clear all saved data"}
          </button>
          {showConfirm && (
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

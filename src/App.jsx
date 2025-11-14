import { useState } from "react";
import Calendar from "./components/Calendar";
import YearSelector from "./components/YearSelector";
import "./App.css";

export default function App() {
  const [year, setYear] = useState(null);

  function prevYear() {
    setYear(y => (y ? y - 1 : new Date().getFullYear() - 1));
  }

  function nextYear() {
    setYear(y => (y ? y + 1 : new Date().getFullYear() + 1));
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <YearSelector onYearChange={setYear} />

      <div className="flex items-center gap-4 mt-2">
        <button
          disabled={!year}
          onClick={prevYear}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow transition"
        >
          ◀ Previous Year
        </button>

        <div className="text-gray-700 text-center text-lg font-semibold">
          {year ? `Selected year: ${year}` : "No year selected yet."}
        </div>

        <button
          disabled={!year}
          onClick={nextYear}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow transition"
        >
          Next Year ▶
        </button>
      </div>

      <Calendar year={year} />
    </div>
  );
}

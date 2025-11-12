import { useState } from "react";

export default function Calendar() {
  const years = Array.from({ length: 31 }, (_, i) => 2000 + i);
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
      <label className="block text-gray-700 font-semibold mb-2">
        Select a year:
        <select
          value={selectedYear || ""}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
        >
          <option value="" disabled>
            -- Choose year --
          </option>
          {years.map(year =>
            <option key={year} value={year}>
              {year}
            </option>
          )}
        </select>
      </label>

      <div className="text-gray-800 font-medium">
        Selected year:{" "}
        <span className="font-semibold">
          {selectedYear || "No year selected"}
        </span>
      </div>
    </div>
  );
}

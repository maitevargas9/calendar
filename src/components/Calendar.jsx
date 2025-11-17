import { useState } from "react";
import MonthView from "./MonthView";
import { has53Weeks } from "./calendarUtils";

export default function Calendar({ year }) {
  const [viewMode, setViewMode] = useState("year");
  const [monthIndex, setMonthIndex] = useState(0);

  if (!year) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-center text-gray-600">
        Please select a year to view the calendar.
      </div>
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const totalWeeks = has53Weeks(year) ? 53 : 52;

  function prevMonth() {
    setMonthIndex(m => (m === 0 ? 11 : m - 1));
  }

  function nextMonth() {
    setMonthIndex(m => (m === 11 ? 0 : m + 1));
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Calendar for {year} ({totalWeeks} weeks)
      </h2>

      <div className="flex justify-center">
        <button
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          onClick={() => setViewMode(viewMode === "year" ? "month" : "year")}
        >
          {viewMode === "year" ? "Switch to Month View" : "Switch to Year View"}
        </button>
      </div>

      {viewMode === "year" &&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((month, index) =>
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-gray-50 hover:shadow-md transition cursor-pointer"
              onClick={() => {
                setMonthIndex(index);
                setViewMode("month");
              }}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {month}
              </h3>
              <MonthView year={year} month={index} />
            </div>
          )}
        </div>}

      {viewMode === "month" &&
        <div className="max-w-xl mx-auto w-full">
          <div className="flex justify-between items-center mb-4 gap-8">
            <button
              onClick={prevMonth}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow"
            >
              ◀ Previous Month
            </button>

            <h3 className="text-xl font-semibold text-gray-800">
              {months[monthIndex]}
            </h3>

            <button
              onClick={nextMonth}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow"
            >
              Next Month ▶
            </button>
          </div>

          <div className="border rounded-lg shadow-sm p-4 bg-gray-50">
            <MonthView year={year} month={monthIndex} />
          </div>
        </div>}
    </div>
  );
}

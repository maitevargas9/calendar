import MonthView from "./MonthView";
import { has53Weeks } from "./calendarUtils";

export default function Calendar({ year }) {
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Calendar for {year} ({totalWeeks} weeks)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((month, index) =>
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-gray-50 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {month}
            </h3>
            <MonthView year={year} month={index} />
          </div>
        )}
      </div>
    </div>
  );
}

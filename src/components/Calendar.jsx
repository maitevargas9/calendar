function getISOWeekNumber(date) {
  const target = new Date(date);
  const dayNr = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff = target - firstThursday;
  return 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
}

function has53Weeks(year) {
  const dec31 = new Date(year, 11, 31);
  const weekNum = getISOWeekNumber(dec31);
  return weekNum === 53;
}

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

  const weeksInYear = has53Weeks(year) ? 53 : 52;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Calendar for {year} ({weeksInYear} weeks)
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

function MonthView({ year, month }) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [
    ...Array.from({ length: startDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeks = [];

  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 text-[10px] font-semibold text-gray-500 mb-1">
        <div className="text-center">KW</div>
        {weekdays.map(d =>
          <div key={d} className="text-center uppercase">
            {d}
          </div>
        )}
      </div>

      {weeks.map((week, weekIndex) => {
        const firstValidDay = week.find(d => d !== null);
        const weekNumber = firstValidDay
          ? getISOWeekNumber(new Date(year, month, firstValidDay))
          : "";

        return (
          <div
            key={weekIndex}
            className="grid grid-cols-8 gap-0.5 text-xs text-center text-gray-700 mb-0.5"
          >
            <div className="font-semibold text-gray-500 bg-gray-100 rounded p-1">
              {weekNumber}
            </div>

            {week.map((day, dayIndex) => {
              const isWeekend = dayIndex >= 5;
              return (
                <div
                  key={dayIndex}
                  className={`p-1 h-6 flex items-center justify-center border rounded 
                    ${day
                      ? "bg-white hover:bg-indigo-50 cursor-pointer"
                      : "bg-transparent border-none"}
                    ${isWeekend && day ? "bg-red-50" : ""}
                  `}
                >
                  {day || ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

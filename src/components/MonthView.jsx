import { getISOWeekNumber } from "./calendarUtils";

export default function MonthView({
  year,
  month,
  onDayClick,
  getEventsForDay
}) {
  const today = new Date();

  const isToday = day =>
    day &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

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
        let weekNumber = "";
        if (firstValidDay) {
          const currentDate = new Date(year, month, firstValidDay);
          weekNumber = getISOWeekNumber(currentDate);
          if (month === 11 && weekNumber === 1) {
            weekNumber = getISOWeekNumber(new Date(year + 1, 0, 1));
          }
        }

        return (
          <div
            key={weekIndex}
            className="grid grid-cols-8 gap-0.5 text-xs text-center text-gray-700 mb-0.5"
          >
            <div className="font-semibold text-gray-500 bg-gray-100 rounded p-1">
              {weekNumber || ""}
            </div>

            {week.map((day, dayIndex) => {
              const isWeekend = dayIndex >= 5;
              const dayEvents = day ? getEventsForDay(year, month, day) : [];

              return (
                <div
                  key={dayIndex}
                  onClick={() => onDayClick(day)}
                  className={`
                    p-1 h-6 flex items-center justify-center border rounded
                    ${day
                      ? `${isWeekend
                          ? "bg-red-50"
                          : "bg-white"} hover:bg-indigo-50 cursor-pointer`
                      : "bg-transparent border-none"}
                    ${isToday(day)
                      ? "bg-blue-200 border-blue-600 font-bold shadow-[0_0_6px_rgba(37,99,235,0.8)]"
                      : ""}
                  `}
                >
                  {day || ""}

                  {dayEvents.length > 0 &&
                    <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                      {dayEvents.map(ev =>
                        <div
                          key={ev.id}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-600"
                        />
                      )}
                    </div>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

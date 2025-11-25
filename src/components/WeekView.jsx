import { getISOWeekNumber } from "../utils/calendarUtils";

export default function WeekView({ date, events, categories, onDayClick }) {
  const current = new Date(date);
  const day = current.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + diff);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }

  const weekNumber = getISOWeekNumber(monday);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Week {weekNumber} ({days[0].toLocaleDateString()} –{" "}
        {days[6].toLocaleDateString()})
      </h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((d, i) => {
          const dayEvents = events.filter(
            ev =>
              ev.date instanceof Date &&
              ev.date.getFullYear() === d.getFullYear() &&
              ev.date.getMonth() === d.getMonth() &&
              ev.date.getDate() === d.getDate()
          );

          return (
            <div
              key={i}
              className="border rounded p-2 bg-gray-50 hover:bg-indigo-50 cursor-pointer"
              onClick={() =>
                onDayClick(d.getDate(), d.getMonth(), d.getFullYear())}
            >
              <div className="font-semibold text-sm mb-1">
                {d.toLocaleDateString(undefined, { weekday: "short" })}{" "}
                {d.getDate()}
              </div>

              <div className="flex flex-col gap-1">
                {dayEvents.map(ev => {
                  const cat = categories.find(c => c.id === ev.category);
                  return (
                    <div
                      key={ev.id}
                      className={`p-1 text-xs rounded text-white ${cat
                        ? cat.color
                        : "bg-indigo-600"}`}
                    >
                      {ev.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

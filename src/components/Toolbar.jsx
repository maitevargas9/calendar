export default function Toolbar({
  availableYears,
  year,
  monthIndex,
  viewMode,
  onYearChange,
  onMonthChange,
  onPrev,
  onNext
}) {
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

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-4 bg-white shadow rounded-lg">
      <button
        onClick={onPrev}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow"
      >
        ◀ Previous
      </button>

      <select
        value={year}
        onChange={e => onYearChange(Number(e.target.value))}
        className="px-3 py-2 border rounded-lg shadow-sm bg-gray-100"
      >
        {availableYears.map(y =>
          <option key={y} value={y}>
            {y}
          </option>
        )}
      </select>

      {viewMode === "month" &&
        <select
          value={monthIndex}
          onChange={e => onMonthChange(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg shadow-sm bg-gray-100"
        >
          {months.map((m, idx) =>
            <option key={m} value={idx}>
              {m}
            </option>
          )}
        </select>}

      <button
        onClick={onNext}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow"
      >
        Next ▶
      </button>
    </div>
  );
}

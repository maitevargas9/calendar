export default function Calendar({ year }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
      <h2 className="text-lg font-bold text-gray-800 text-center">Calendar</h2>
      <div className="text-gray-700 text-center mt-4">
        {year ? `You selected the year ${year}.` : "No year selected yet."}
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import MonthView from "./MonthView";
import EventModal from "./EventModal";
import { has53Weeks } from "./calendarUtils";

const STORAGE_KEY = "calendarEvents_v1";

function serializeEvents(events) {
  return events.map(e => ({
    ...e,
    date: e.date instanceof Date ? e.date.toISOString() : e.date
  }));
}

function deserializeEvents(serialized) {
  try {
    return serialized.map(e => ({
      ...e,
      date: e.date ? new Date(e.date) : null
    }));
  } catch (err) {
    console.error("Failed to deserialize events", err);
    return [];
  }
}

export default function Calendar({
  year,
  monthIndex,
  viewMode,
  setViewMode,
  setMonthIndex
}) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const loaded = deserializeEvents(parsed);
        setEvents(loaded);
      } catch (err) {
        console.error("Failed to load events from localStorage:", err);
      }
    }
  }, []);

  useEffect(
    () => {
      try {
        const toStore = serializeEvents(events);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (err) {
        console.error("Failed to save events to localStorage:", err);
      }
    },
    [events]
  );

  const openModalForDay = useCallback(
    (day, monthForClick = monthIndex, yearForClick = year) => {
      if (!day) {
        return;
      }
      setSelectedDate(new Date(yearForClick, monthForClick, day));
      setIsModalOpen(true);
    },
    [monthIndex, year]
  );

  const handleDayClick = day => {
    openModalForDay(day);
  };

  const handleSaveEvent = event => {
    if (!event || !event.date || !event.title) {
      return;
    }

    const newEvent = {
      id: `${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      title: event.title,
      description: event.description || "",
      date: event.date
    };

    setEvents(prev => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const getEventsForDay = useCallback(
    (y, m, d) => {
      return events.filter(
        e =>
          e.date instanceof Date &&
          e.date.getFullYear() === y &&
          e.date.getMonth() === m &&
          e.date.getDate() === d
      );
    },
    [events]
  );

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
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {viewMode === "year"
          ? `Calendar for ${year} (${totalWeeks} weeks)`
          : `${months[monthIndex]} ${year}`}
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
              <MonthView
                year={year}
                month={index}
                onDayClick={day => handleDayClick(day, index)}
                events={events}
                getEventsForDay={getEventsForDay}
              />
            </div>
          )}
        </div>}

      {viewMode === "month" &&
        <div className="max-w-xl mx-auto w-full">
          <div className="border rounded-lg shadow-sm p-4 bg-gray-50">
            <MonthView
              year={year}
              month={monthIndex}
              onDayClick={day => handleDayClick(day, monthIndex)}
              events={events}
              getEventsForDay={getEventsForDay}
            />
          </div>
        </div>}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        onSave={handleSaveEvent}
        events={
          selectedDate
            ? getEventsForDay(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
              )
            : []
        }
      />
    </div>
  );
}

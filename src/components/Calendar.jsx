import { useState, useEffect, useCallback } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import {
  has53Weeks,
  STORAGE_KEY,
  serializeEvents,
  deserializeEvents
} from "../utils/calendarUtils";
import { months } from "../data/months";
import { categories } from "../data/categories";

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
  const [weekDate, setWeekDate] = useState(new Date());

  const totalWeeks = has53Weeks(year) ? 53 : 52;

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

  const handleSaveEvent = event => {
    if (!event || !event.date || !event.title) {
      return;
    }

    const newEvent = {
      id: `${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      title: event.title,
      description: event.description || "",
      date: event.date,
      category: event.category || "work"
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

  const renderYearView = () =>
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
          <h3 className="text-lg font-semibold mb-2">
            {month}
          </h3>
          <MonthView
            year={year}
            month={index}
            onDayClick={day => openModalForDay(day, index)}
            events={events}
            getEventsForDay={getEventsForDay}
            categories={categories}
          />
        </div>
      )}
    </div>;

  const renderMonthView = () =>
    <div className="max-w-xl mx-auto w-full">
      <div className="border rounded-lg shadow-sm p-4 bg-gray-50">
        <MonthView
          year={year}
          month={monthIndex}
          onDayClick={day => openModalForDay(day, monthIndex)}
          events={events}
          getEventsForDay={getEventsForDay}
          categories={categories}
        />
      </div>
    </div>;

  const renderWeekView = () =>
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-3">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() =>
            setWeekDate(
              prev =>
                new Date(
                  prev.getFullYear(),
                  prev.getMonth(),
                  prev.getDate() - 7
                )
            )}
        >
          ◀ Previous Week
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setWeekDate(new Date())}
        >
          This Week
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() =>
            setWeekDate(
              prev =>
                new Date(
                  prev.getFullYear(),
                  prev.getMonth(),
                  prev.getDate() + 7
                )
            )}
        >
          Next Week ▶
        </button>
      </div>
      <WeekView
        date={weekDate}
        events={events}
        categories={categories}
        onDayClick={(day, month, year) => openModalForDay(day, month, year)}
      />
    </div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {viewMode === "year"
          ? `Calendar for ${year} (${totalWeeks} weeks)`
          : `${months[monthIndex]} ${year}`}
      </h2>
      <div className="flex gap-3 justify-center">
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded"
          onClick={() => setViewMode("week")}
        >
          Week View
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setViewMode("month")}
        >
          Month View
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setViewMode("year")}
        >
          Year View
        </button>
      </div>

      {viewMode === "year" && renderYearView()}
      {viewMode === "month" && renderMonthView()}
      {viewMode === "week" && renderWeekView()}

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
        categories={categories}
        onUpdateEvent={updatedEvent => {
          setEvents(prev =>
            prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
          );
        }}
        onDeleteEvent={id => {
          setEvents(prev => prev.filter(e => e.id !== id));
        }}
      />
    </div>
  );
}

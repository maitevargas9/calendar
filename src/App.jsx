import { useState } from "react";
import Calendar from "./components/Calendar";
import Toolbar from "./components/Toolbar";
import "./App.css";

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [viewMode, setViewMode] = useState("year");

  function prev() {
    if (viewMode === "year") {
      setYear(y => y - 1);
    } else {
      setMonthIndex(m => {
        if (m === 0) {
          setYear(y => y - 1);
          return 11;
        }
        return m - 1;
      });
    }
  }

  function next() {
    if (viewMode === "year") {
      setYear(y => y + 1);
    } else {
      setMonthIndex(m => {
        if (m === 11) {
          setYear(y => y + 1);
          return 0;
        }
        return m + 1;
      });
    }
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Toolbar
        availableYears={[year - 1, year, year + 1]}
        year={year}
        monthIndex={monthIndex}
        viewMode={viewMode}
        onYearChange={setYear}
        onMonthChange={setMonthIndex}
        onPrev={prev}
        onNext={next}
      />

      <Calendar
        year={year}
        monthIndex={monthIndex}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
}

import { useState } from "react";
import Calendar from "./components/Calendar";
import YearSelector from "./components/YearSelector";
import "./App.css";

export default function App() {
  const [year, setYear] = useState(null);

  return (
    <div>
      <YearSelector onYearChange={setYear} />
      <p>&nbsp;</p>
      <Calendar year={year} />
    </div>
  );
}

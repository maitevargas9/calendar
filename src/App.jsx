import calendar from "./assets/calendar.png";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <img src={calendar} className="logo" alt="Calendar logo" />
      <h1 className="title">Calendar</h1>
    </div>
  );
}

export default App;

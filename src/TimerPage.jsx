import { useState, useEffect } from "react";
import "./TimerPage.css";

export default function TimerPage() {
  const [seconds, setSeconds] = useState(25 * 60);  
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro"); 

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const startPomodoro = () => {
    setRunning(false);
    setMode("pomodoro");
    setSeconds(25 * 60);
  };

  const startBreak = () => {
    setRunning(false);
    setMode("break");
    setSeconds(5 * 60);
  };

  return (
    <div className="timer-page-container">

      <h1 className="timer-title">
        {mode === "pomodoro" ? "Pomodoro Timer" : "Break Timer"}
      </h1>

      <div className="mode-buttons">
        <button
          className={mode === "pomodoro" ? "active" : ""}
          onClick={startPomodoro}
        >
          Pomodoro
        </button>

        <button
          className={mode === "break" ? "active" : ""}
          onClick={startBreak}
        >
          Break 
        </button>
      </div>

      <div className="timer-display">{format(seconds)}</div>

      <div className="timer-buttons">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() =>
            setSeconds(mode === "pomodoro" ? 25 * 60 : 5 * 60)
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}
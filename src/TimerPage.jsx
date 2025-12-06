import { useState, useEffect, useCallback } from "react";
import "./TimerPage.css";
import { useSettings } from "./hooks/useSettings.jsx";
import { useStats } from "./hooks/useStats.jsx";

// --- Alarm Sound Placeholder ---
// A simple way to play a sound in a React component
const ALARM_SOUND = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_3d168e64c1.mp3?filename=analog-watch-alarm-894&source=https://pixabay.com");

export default function TimerPage() {
  const { settings } = useSettings();
  const { addSession } = useStats();
  
  // State for current mode (pomodoro/break), running status, and seconds left
  const [mode, setMode] = useState("pomodoro"); 
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(settings.pomodoroTime * 60);

  // --- Utility Functions ---

  // Function to format seconds into MM:SS
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Function to reset and set mode based on settings
  const startPomodoro = useCallback(() => {
    setRunning(false);
    setMode("pomodoro");
    // Use the time from settings, but convert to seconds
    setSeconds(settings.pomodoroTime * 60);
  }, [settings.pomodoroTime]);

  const startBreak = useCallback(() => {
    setRunning(false);
    setMode("break");
    // Use the time from settings, but convert to seconds
    setSeconds(settings.breakTime * 60);
  }, [settings.breakTime]);

  // --- Core Timer Logic ---

  useEffect(() => {
    let interval = null;

    if (running && seconds > 0) {
      // Countdown logic
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);

    } else if (seconds === 0 && running) {
      // Timer has finished
      clearInterval(interval);
      setRunning(false);

      // Play the alarm sound
      ALARM_SOUND.play();

      if (mode === "pomodoro") {
        // 1. Log the completed session
        addSession({
          type: 'pomodoro', 
          duration: settings.pomodoroTime, 
          date: new Date().toISOString() 
        });
        
        // 2. Automatically switch to break mode
        alert(`Pomodoro completed! Time for a ${settings.breakTime} minute break.`);
        startBreak();

      } else {
        // Break has finished
        alert(`Break finished! Time to start another ${settings.pomodoroTime} minute Pomodoro.`);
        startPomodoro();
      }
    }

    return () => clearInterval(interval);
    
  }, [running, seconds, mode, settings.pomodoroTime, settings.breakTime, addSession, startBreak, startPomodoro]);

  // --- Handle Settings Change (Reset timer if settings are changed) ---
  // This effect runs if the settings change while the timer is not running.
  useEffect(() => {
    if (!running) {
        if (mode === "pomodoro" && seconds !== settings.pomodoroTime * 60) {
            setSeconds(settings.pomodoroTime * 60);
        } else if (mode === "break" && seconds !== settings.breakTime * 60) {
            setSeconds(settings.breakTime * 60);
        }
    }
  }, [settings.pomodoroTime, settings.breakTime, mode, running, seconds]);


  // --- Render Component ---

  return (
    <div className="timer-page-container">
      <h1 className="timer-title">
        {mode === "pomodoro" ? "Pomodoro Timer" : "Break Timer"}
      </h1>
      <div className="mode-buttons">
        <button
          className={mode === "pomodoro" ? "active" : ""}
          onClick={startPomodoro}
          disabled={running} // Disable button if timer is running
        >
          Pomodoro ({settings.pomodoroTime} min)
        </button>
        <button
          className={mode === "break" ? "active" : ""}
          onClick={startBreak}
          disabled={running} // Disable button if timer is running
        >
          Break ({settings.breakTime} min)
        </button>
      </div>
      
      <div className="timer-display">{formatTime(seconds)}</div>
      
      <div className="timer-buttons">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : (seconds === 0 ? "Start Next" : "Start")}
        </button>
        <button
          onClick={mode === "pomodoro" ? startPomodoro : startBreak}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
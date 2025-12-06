import { useState, useEffect, useCallback, useRef } from "react"; // ⬅️ IMPORT useRef
import "./TimerPage.css";
import { useSettings } from "./hooks/useSettings.jsx";
import { useStats } from "./hooks/useStats.jsx";

// --- Alarm Sound Placeholder ---
const ALARM_SOUND = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_3d168e64c1.mp3?filename=analog-watch-alarm-894&source=https://pixabay.com");

export default function TimerPage() {
  const { settings } = useSettings();
  const { addSession } = useStats();
  
  // State for current mode (pomodoro/break) and seconds left
  const [mode, setMode] = useState("pomodoro"); 
  const [seconds, setSeconds] = useState(settings.pomodoroTime * 60);
  // ⬅️ NEW: Use a state variable only for UI/Button text
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  
  // ⬅️ CRITICAL FIX: Use a ref to reliably track the running status in the interval
  const runningRef = useRef(isTimerRunning); 

  // Function to update the ref whenever the state changes
  useEffect(() => {
    runningRef.current = isTimerRunning;
  }, [isTimerRunning]);


  // --- Utility Functions ---

  // Function to format seconds into MM:SS
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Function to reset and set mode based on settings
  const startPomodoro = useCallback(() => {
    setIsTimerRunning(false); // Update the state and the ref via useEffect
    setMode("pomodoro");
    setSeconds(settings.pomodoroTime * 60);
  }, [settings.pomodoroTime]);

  const startBreak = useCallback(() => {
    setIsTimerRunning(false); // Update the state and the ref via useEffect
    setMode("break");
    setSeconds(settings.breakTime * 60);
  }, [settings.breakTime]);


  // --- Core Timer Logic (Now uses the Ref) ---
  useEffect(() => {
    let interval = null;

    // ⬅️ Check Ref on mount/unmount to immediately set/clear interval
    if (isTimerRunning && seconds > 0) {
      // Countdown logic
      interval = setInterval(() => {
        // ⬅️ Check Ref inside interval for PAUSE/RESUME stability
        if (runningRef.current && seconds > 0) {
          setSeconds((s) => s - 1);
        }
      }, 1000);

    } else if (seconds === 0 && isTimerRunning) {
      // Timer has finished
      clearInterval(interval);
      setIsTimerRunning(false); // Update the state and the ref

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
    
  }, [isTimerRunning, seconds, mode, settings.pomodoroTime, settings.breakTime, addSession, startBreak, startPomodoro]);


  // --- SAFE SETTINGS & MODE CHANGE EFFECT ---
  // This hook updates the time if settings change OR mode is switched, ONLY when the timer is stopped.
  useEffect(() => {
    if (!isTimerRunning) {
      const newTime = mode === "pomodoro" 
        ? settings.pomodoroTime * 60 
        : settings.breakTime * 60;
        
      if (seconds !== newTime) {
        setSeconds(newTime);
      }
    }
  }, [mode, settings.pomodoroTime, settings.breakTime, isTimerRunning]); 


  // --- Render Component ---

  return (
    <div className="timer-page-container">
      <h1 className="timer-title">
        {mode === "pomodoro" ? "Pomodoro Timer" : "Break Timer"}
      </h1>
      <div className="mode-buttons">
        <button
          className={mode === "pomodoro" ? "active" : ""}
          onClick={() => { if (!isTimerRunning) setMode("pomodoro"); }} // Changed to setMode
          disabled={isTimerRunning} 
        >
          Pomodoro ({settings.pomodoroTime} min)
        </button>
        <button
          className={mode === "break" ? "active" : ""}
          onClick={() => { if (!isTimerRunning) setMode("break"); }} // Changed to setMode
          disabled={isTimerRunning} 
        >
          Break ({settings.breakTime} min)
        </button>
      </div>
      
      <div className="timer-display">{formatTime(seconds)}</div>
      
      <div className="timer-buttons">
        <button onClick={() => setIsTimerRunning(!isTimerRunning)}> 
          {isTimerRunning ? "Pause" : (seconds === 0 ? "Start Next" : "Start")}
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
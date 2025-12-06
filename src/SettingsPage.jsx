// src/SettingsPage.jsx

import { useSettings } from "./hooks/useSettings.jsx";
import "./SettingsPage.css"; // We'll assume a basic CSS file for layout

export default function SettingsPage() {
  const { settings, updateSetting, clearAllData } = useSettings();

  const handleTimeChange = (key, e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateSetting(key, value);
    }
  };

  return (
    <div className="settings-container">
      <h1>⚙️ Settings</h1>
      
      {/* Timer Customization */}
      <section className="setting-section">
        <h2>Timer Customization</h2>
        <div className="setting-item">
          <label htmlFor="pomodoroTime">Pomodoro Length (minutes):</label>
          <input
            id="pomodoroTime"
            type="number"
            min="1"
            value={settings.pomodoroTime}
            onChange={(e) => handleTimeChange('pomodoroTime', e)}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="breakTime">Break Length (minutes):</label>
          <input
            id="breakTime"
            type="number"
            min="1"
            value={settings.breakTime}
            onChange={(e) => handleTimeChange('breakTime', e)}
          />
        </div>
      </section>

      {/* Theme Setting - Note: Logic is here, but implementation needs CSS work */}
      <section className="setting-section">
        <h2>Theme</h2>
        <select 
          value={settings.theme} 
          onChange={(e) => updateSetting('theme', e.target.value)}
        >
          <option value="system">System Default</option>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </section>

      {/* Clear Data Feature */}
      <section className="setting-section">
        <h2>Danger Zone</h2>
        <button 
          onClick={() => {
            if(window.confirm("Are you sure you want to clear ALL your data (sessions and settings)? This cannot be undone.")) {
              clearAllData();
            }
          }}
          className="danger-button"
        >
          Clear All Local Data
        </button>
      </section>
    </div>
  );
}
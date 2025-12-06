// src/StatsPage.jsx

import { useStats } from "./hooks/useStats.jsx";
import "./StatsPage.css"; // Assume a basic CSS file for layout

export default function StatsPage() {
  const { sessions, calculateStats } = useStats();
  const stats = calculateStats();

  // Helper to format date for display
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className="stats-container">
      <h1>📊 Session Log & Stats</h1>
      
      {/* Simple Stats Display */}
      <section className="stats-summary">
        <div className="stat-card">
          <h2>Completed Today</h2>
          <p>{stats.todayCount}</p>
        </div>
        <div className="stat-card">
          <h2>Total Sessions</h2>
          <p>{stats.totalCount}</p>
        </div>
      </section>

      {/* Session Log */}
      <section className="session-log">
        <h2>Recent Sessions</h2>
        {sessions.length === 0 ? (
          <p>No completed sessions yet. Start a timer!</p>
        ) : (
          <ul className="log-list">
            {sessions.map((s, index) => (
              <li key={index}>
                <span className={`log-type ${s.type}`}>{s.type}</span> 
                {s.duration} minutes on {formatDate(s.date)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
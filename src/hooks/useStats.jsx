// src/hooks/useStats.jsx

import { useState, useEffect } from 'react';

export function useStats() {
  const [sessions, setSessions] = useState(() => {
    const localData = localStorage.getItem('studySprintSessions');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('studySprintSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Function to add a completed session
  const addSession = (session) => {
    setSessions(prev => [session, ...prev]);
  };

  // Function to calculate simple stats (e.g., daily count)
  const calculateStats = () => {
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => new Date(s.date).toDateString() === today);
    
    // Simple Streak Calculation (placeholder - a real streak requires more complex date comparison)
    let totalSessions = sessions.length;

    return {
      todayCount: todaySessions.length,
      totalCount: totalSessions
    };
  };

  return { sessions, addSession, calculateStats };
}
// src/hooks/useSettings.jsx

import { useState, useEffect } from 'react';

const defaultSettings = {
  pomodoroTime: 25, 
  breakTime: 5,    
  autoStart: false,
  theme: 'system' // Light, Dark, System
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const localData = localStorage.getItem('studySprintSettings');
    return localData ? JSON.parse(localData) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('studySprintSettings', JSON.stringify(settings));
  }, [settings]);

  // --- Theme Application Logic (CSS Class) ---
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body; // Use the body element for class application

    const isDarkMode = settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    
  }, [settings.theme]);
  // --- END Theme Logic ---

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllData = () => {
    localStorage.clear(); 
    setSettings(defaultSettings); 
    alert('All local data (sessions and settings) has been cleared!');
    window.location.reload(); 
  };

  return { settings, updateSetting, clearAllData, defaultSettings };
}
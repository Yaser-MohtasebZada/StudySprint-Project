import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TimerPage from "./TimerPage.jsx";
import TasksPage from "./TasksPage.jsx";
import StatsPage from "./StatsPage.jsx";      // Yaser's Scope
import SettingsPage from "./SettingsPage.jsx"; // Yaser's Scope
import LoginPage from "./LoginPage.jsx";      // New Request

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        {/* YASER'S SCOPE ROUTES */}
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* NEW LOGIN PAGE */}
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </>
  );
}
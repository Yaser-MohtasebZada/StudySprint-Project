import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TimerPage from "./TimerPage.jsx";
import TasksPage from "./TasksPage.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </>
  );
}
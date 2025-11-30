import { useState } from "react";
import "./TasksPage.css";

export default function TasksPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <button className="delete-btn" onClick={() => deleteTask(i)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
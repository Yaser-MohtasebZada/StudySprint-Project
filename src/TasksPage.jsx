// src/TasksPage.jsx

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TasksPage.css";

// Initial state for a task item
const initialTasks = [
    { id: 'task-1', content: 'Design Pomodoro Timer UI', completed: true },
    { id: 'task-2', content: 'Implement Drag and Drop', completed: false },
    { id: 'task-3', content: 'Prepare CPSC 349 Presentation', completed: false },
];

export default function TasksPage() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

  // Function to handle adding a new task
  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTask = {
        id: `task-${Date.now()}`, // Unique ID for D&D
        content: taskInput.trim(),
        completed: false
    };
    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to handle drag-and-drop reordering
  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') addTask(); }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-list-droppable">
          {(provided) => (
            <ul 
              className="task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="task-checkbox"
                      />
                      <span className="task-content">{task.content}</span>
                      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                        ✖
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
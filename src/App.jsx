import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './index.css';

const FILTERS = ['All', 'Active', 'Completed'];

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return alert('Task cannot be empty!');
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filtered = tasks.filter(task =>
    filter === 'Active' ? !task.completed :
    filter === 'Completed' ? task.completed : true
  );

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f}
          </button>
        ))}
      </div>

      <TodoList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;

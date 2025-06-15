import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onToggle, onDelete }) => (
  <ul className="todo-list">
    {tasks.map(task => (
      <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </ul>
);

export default TodoList;

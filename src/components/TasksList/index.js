import React from 'react';
import { MdDelete } from 'react-icons/md';
import Edit from '../Edit';
import './index.css'

const TasksList = ({ todo, updateTodo, onDelete }) => {
  return (
    <li className="todos-list">
      <div className="heading-section">
        <h1 className="todo-head">{todo.task}</h1>
        <p
          className="status"
          style={{
            color:
              todo.status === 'Pending'
                ? 'red'
                : todo.status === 'In Progress'
                ? 'orange'
                : 'green',
          }}
        >
          {todo.status}
        </p>
      </div>
      {todo.description && <p className="description">Detail: {todo.description}</p>}
      {todo.dueDate && <p className="description">By: {todo.dueDate}</p>}
      <div className="edit-section">
        <Edit todo={todo} updateTodo={updateTodo} />
        <MdDelete className="delete-icon" onClick={() => onDelete(todo.id)} />
      </div>
    </li>
  );
};

export default TasksList;

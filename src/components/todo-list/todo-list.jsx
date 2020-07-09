import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({
  todos, onDeleted, onToggleImportant, onToggleDone,
}) => {
  const elements = todos.map(
    ({ id, ...properties }) => (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...properties}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    ),
  );
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;

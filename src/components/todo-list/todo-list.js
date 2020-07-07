import React from 'react';
import { object, arrayOf, func } from 'prop-types';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({
  todos, onDeleted, onToggleImportant, onToggleDone,
}) => {
  const elements = todos.map(
    ({ id, ...properties }) => <li key={id} className="list-group-item">
        <TodoListItem
          {...properties}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>,
  );
  return <ul className="list-group todo-list">{elements}</ul>;
};
TodoList.propTypes = {
  todos: arrayOf(object),
  onDeleted: func,
  onToggleImportant: func,
  onToggleDone: func,
};
export default TodoList;

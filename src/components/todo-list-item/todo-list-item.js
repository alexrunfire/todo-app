import React from 'react';

import './todo-list-item.css';

const getClassNames = (important, done) => {
  const initialClass = ['todo-list-item'];
  if (important) {
    initialClass.push('important');
  }
  if (done) {
    initialClass.push('done');
  }
  return initialClass.join(' ');
};

const TodoListItem = ({
  label, done, important, onDeleted, onToggleImportant, onToggleDone,
}) => (
    <span className={getClassNames(important, done)}>
      <span
        className="todo-list-item-label"
        onClick={ onToggleDone }>
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={ onToggleImportant }>
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o" />
      </button>
    </span>
);

export default TodoListItem;

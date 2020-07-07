import React from 'react';
import { number } from 'prop-types';
import './app-header.css';

const AppHeader = ({ toDo, done }) => (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h2>{toDo} more to do, {done} done</h2>
    </div>
);
AppHeader.propTypes = {
  toDo: number,
  done: number,
};
export default AppHeader;

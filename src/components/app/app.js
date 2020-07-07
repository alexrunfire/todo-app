import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import FormField from '../form-field';

import './app.css';

export default class App extends Component {
  createTodoItem = (label) => ({
    label,
    important: false,
    done: false,
    id: uniqueId(),
  })

  state = {
    todoData: [
      this.createTodoItem('Build React App'),
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Drink Coffee'),
    ],
    search: '',
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const itemIndex = todoData.findIndex((elem) => elem.id === id);
      const newArrayBegin = todoData.slice(0, itemIndex);
      const newArrayEnd = todoData.slice(itemIndex + 1);
      const newArray = [...newArrayBegin, ...newArrayEnd];
      return {
        todoData: newArray,
      };
    });
  }

  addItem = (label) => {
    const newItem = this.createTodoItem(label);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  }

  toggleProperty = (todoData, id, property) => {
    const itemIndex = todoData.findIndex((elem) => elem.id === id);
    const oldItem = todoData[itemIndex];
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    const newArrayBegin = todoData.slice(0, itemIndex);
    const newArrayEnd = todoData.slice(itemIndex + 1);
    return [...newArrayBegin, newItem, ...newArrayEnd];
  }

  searchItems = (items, text) => items.filter(
    ({ label }) => label.toLowerCase().includes(text.toLowerCase()),
  );

  filterItems = (todoData, selector) => {
    if (selector === 'active') {
      return todoData.filter(({ done }) => !done);
    }
    if (selector === 'done') {
      return todoData.filter(({ done }) => done);
    }
    return todoData;
  }

  onSearch = (search) => {
    this.setState((state) => ({
      ...state,
      search,
    }));
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'important'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  onAll = () => {
    this.setState((state) => ({
      ...state,
      filter: 'all',
    }));
  }

  onActive = () => {
    this.setState((state) => ({
      ...state,
      filter: 'active',
    }));
  }

  onDone = () => {
    this.setState((state) => ({
      ...state,
      filter: 'done',
    }));
  }

  render() {
    const { todoData, search, filter } = this.state;
    const doneCount = todoData.filter(({ done }) => done).length;
    const toDoCount = todoData.length - doneCount;
    const filteredItems = this.filterItems(todoData, filter);
    const currentItems = this.searchItems(filteredItems, search);
    return (
  <div className="todo-app">
    <AppHeader toDo={toDoCount} done={doneCount}/>
    <div className="top-panel d-flex">
        <SearchPanel onSearch={this.onSearch}/>
        <ItemStatusFilter
          filter={filter}
          onAll={this.onAll}
          onActive={this.onActive}
          onDone={this.onDone}
        />
    </div>
    <TodoList
      todos={currentItems}
      onDeleted={this.deleteItem}
      onToggleImportant={this.onToggleImportant}
      onToggleDone={this.onToggleDone}
    />
    <FormField onAdded={this.addItem}/>
  </div>);
  }
}

import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import FormField from '../form-field';

import './app.css';

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoItem('Build React App'),
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Drink Coffee'),
    ],
    search: '',
    filter: 'all',
  };

  createTodoItem = (label) => ({
    label,
    important: false,
    done: false,
    id: uniqueId(),
  })

  setNewStateOnTopPanel = (key, value) => {
    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  }

  findItemIdx = (todoData, id) => todoData.findIndex((elem) => elem.id === id)

  findArrayParts = (todoData, itemIndex) => {
    const newArrayBegin = todoData.slice(0, itemIndex);
    const newArrayEnd = todoData.slice(itemIndex + 1);
    return { newArrayBegin, newArrayEnd };
  }

  setNewStateOnToggle = (id, property) => {
    const { todoData } = this.state;
    const itemIndex = this.findItemIdx(todoData, id);
    const oldItem = todoData[itemIndex];
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    const { newArrayBegin, newArrayEnd } = this.findArrayParts(todoData, itemIndex);
    const newArray = [...newArrayBegin, newItem, ...newArrayEnd];
    this.setState({
      todoData: newArray,
    });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const itemIndex = this.findItemIdx(todoData, id);
      const { newArrayBegin, newArrayEnd } = this.findArrayParts(todoData, itemIndex);
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

  onToggleImportant = (id) => this.setNewStateOnToggle(id, 'important')

  onToggleDone = (id) => this.setNewStateOnToggle(id, 'done')

  onSearch = (search) => this.setNewStateOnTopPanel(search, search)

  onAll = () => this.setNewStateOnTopPanel('filter', 'all')

  onActive = () => this.setNewStateOnTopPanel('filter', 'active')

  onDone = () => this.setNewStateOnTopPanel('filter', 'done')

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

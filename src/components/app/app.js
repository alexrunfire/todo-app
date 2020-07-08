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

  setNewState = (key, value) => this.setState({ [key]: value });

  findItemIdx = (todoData, id) => todoData.findIndex((elem) => elem.id === id)

  findArrayParts = (todoData, itemIndex) => {
    const newArrayBegin = todoData.slice(0, itemIndex);
    const newArrayEnd = todoData.slice(itemIndex + 1);
    return { newArrayBegin, newArrayEnd };
  }

  onToggle = (id, property) => {
    const { todoData } = this.state;
    const itemIndex = this.findItemIdx(todoData, id);
    const oldItem = todoData[itemIndex];
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    const { newArrayBegin, newArrayEnd } = this.findArrayParts(todoData, itemIndex);
    const newArray = [...newArrayBegin, newItem, ...newArrayEnd];
    this.setNewState('todoData', newArray);
  }

  deleteItem = (id) => {
    const { todoData } = this.state;
    const itemIndex = this.findItemIdx(todoData, id);
    const { newArrayBegin, newArrayEnd } = this.findArrayParts(todoData, itemIndex);
    const newArray = [...newArrayBegin, ...newArrayEnd];
    this.setNewState('todoData', newArray);
  }

  addItem = (label) => {
    const { todoData } = this.state;
    const newItem = this.createTodoItem(label);
    const newArray = [...todoData, newItem];
    this.setNewState('todoData', newArray);
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

  onToggleImportant = (id) => this.onToggle(id, 'important')

  onToggleDone = (id) => this.onToggle(id, 'done')

  onSearch = (search) => this.setNewState('search', search)

  onAll = () => this.setNewState('filter', 'all')

  onActive = () => this.setNewState('filter', 'active')

  onDone = () => this.setNewState('filter', 'done')

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

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
      this.createTodoItem('Make a million dollars'),
      this.createTodoItem('Buy a house'),
      this.createTodoItem('Land on Mars'),
    ],
    search: '',
    filter: 'all',
  };

  setNewState = (key, value) => this.setState({ [key]: value })

  findItemIdx = (items, id) => items.findIndex((elem) => elem.id === id)

  findItemsParts = (items, itemIndex) => {
    const newItemsBegin = items.slice(0, itemIndex);
    const newItemsEnd = items.slice(itemIndex + 1);
    return { newItemsBegin, newItemsEnd };
  }

  onToggle = (id, property) => {
    const { todoData } = this.state;
    const itemIndex = this.findItemIdx(todoData, id);
    const oldItem = todoData[itemIndex];
    const newItem = { ...oldItem, [property]: !oldItem[property] };
    const { newItemsBegin, newItemsEnd } = this.findItemsParts(todoData, itemIndex);
    const newItems = [...newItemsBegin, newItem, ...newItemsEnd];
    this.setNewState('todoData', newItems);
  }

  deleteItem = (id) => {
    const { todoData } = this.state;
    const itemIndex = this.findItemIdx(todoData, id);
    const { newItemsBegin, newItemsEnd } = this.findItemsParts(todoData, itemIndex);
    const newItems = [...newItemsBegin, ...newItemsEnd];
    this.setNewState('todoData', newItems);
  }

  addItem = (label) => {
    const { todoData } = this.state;
    const newItem = this.createTodoItem(label);
    const newItems = [...todoData, newItem];
    this.setNewState('todoData', newItems);
  }

  doneItems = (items) => items.filter(({ done }) => done)

  searchItems = (items, text) => items.filter(
    ({ label }) => label.toLowerCase().includes(text.toLowerCase()),
  );

  filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;

      case 'active':
        return items.filter(({ done }) => !done);

      case 'done':
        return this.doneItems(items);

      default:
        throw new Error(`Unknown filter type: ${filter}`);
    }
  }

  onToggleImportant = (id) => this.onToggle(id, 'important')

  onToggleDone = (id) => this.onToggle(id, 'done')

  onSearch = (search) => this.setNewState('search', search)

  onFilter = (filter) => this.setNewState('filter', filter)

  render() {
    const { todoData, search, filter } = this.state;
    const doneCount = this.doneItems(todoData).length;
    const toDoCount = todoData.length - doneCount;
    const filteredItems = this.filterItems(todoData, filter);
    const currentItems = this.searchItems(filteredItems, search);
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter
            filter={filter}
            onFilter={this.onFilter}
          />
        </div>
        <TodoList
          todos={currentItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <FormField onAdded={this.addItem} />
      </div>
    );
  }
}

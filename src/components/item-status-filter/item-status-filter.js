import React, { Component } from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = name === filter;
      const className = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type="button"
          className={`btn ${className}`}
          key={name}
          onClick={() => onFilter(name)}
        >
          {label}
        </button>
      );
    });
    return (
    <div className="btn-group">
      {buttons}
    </div>
    );
  }
}
export default ItemStatusFilter;

import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearch }) => (
  <input
    type="text"
    className="form-control search-input"
    placeholder="Type to search"
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchPanel;

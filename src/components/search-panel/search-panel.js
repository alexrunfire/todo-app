import React from 'react';
import { func } from 'prop-types';
import './search-panel.css';

const SearchPanel = ({ onSearch }) => (
  <input
    type="text"
    className="form-control search-input"
    placeholder="Type to search"
    onChange={(e) => onSearch(e.target.value)}
  />
);
SearchPanel.propTypes = {
  onSearch: func,
};
export default SearchPanel;

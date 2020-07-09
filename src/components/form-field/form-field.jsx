import React, { Component } from 'react';

import './form-field.css';

class FormField extends Component {
  state = {
    label: '',
    disabled: true,
  }

  onLabelChange = (label) => {
    const disabled = label.length === 0;
    this.setState({
      label,
      disabled,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.onLabelChange('');
  };

  isDisabled = () => this.state.label.length === 0;

  render() {
    return (
      <form
        className="form-field d-flex"
        onSubmit={this.onFormSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          onChange={(e) => this.onLabelChange(e.target.value)}
          value={this.state.label}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={this.state.disabled}
        >
          Add
        </button>
      </form>
    );
  }
}

export default FormField;

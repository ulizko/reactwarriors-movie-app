import React, { Component } from "react";

export class Select extends Component {
  render() {
    const { id, name, labelText, value, onChange, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          className="form-control"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;

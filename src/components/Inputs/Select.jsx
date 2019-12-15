import React, { Component } from "react";

export class Select extends Component {
  render() {
    const { id, name, labelText, value, onChange, options, placeholder } = this.props;
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
          { placeholder && <option value="">{placeholder}</option> }
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

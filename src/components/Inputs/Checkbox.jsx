import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    const { value, labelText, onChange, checked } = this.props;
    return (
      <div className="form-check">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {labelText}
        </label>
      </div>
    );
  }
}

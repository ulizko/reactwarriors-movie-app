import React, { Component } from "react";

import Select from "../Inputs/Select";

function getYears(from, to) {
  console.log("years");
  const result = [];
  const fill = (arr, start, end) => {
    if (start > end) {
      return arr;
    }
    arr.push({ value: start, label: start });
    return fill(arr, start + 1, end);
  };

  return fill(result, from, to);
}

export class ByYear extends Component {
  static defaultProps = {
    years: getYears(1950, 2025),
  };

  render() {
    const { year, onChangeYear, years } = this.props;
    return (
      <Select
        id="year"
        name="year"
        onChange={onChangeYear}
        value={year}
        labelText="Год выхода:"
        options={years}
      />
    );
  }
}

export default ByYear;

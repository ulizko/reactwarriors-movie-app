import React, { Component } from "react";

import Select from "../Inputs/Select";

function getYears(from, to) {
  const result = [];
  const fill = (arr, start, end) => {
    if (end < start) {
      return arr;
    }
    arr.push({ value: end, label: end });
    return fill(arr, start, end - 1);
  };

  return fill(result, from, to);
}

export class ByYear extends Component {
  static defaultProps = {
    years: [{ value: 0, label: "None" }, ...getYears(1950, 2025)],
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

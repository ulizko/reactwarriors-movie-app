import React, { Component } from "react";

import Select from "../Inputs/Select";

const getYears = (from, to) => {
  const length = to - from + 1
  const toYearObj = (year) => ({ value: year, label: year })
  return Array.from({ length }, (_, index) => toYearObj(to - index))
}

export class ByYear extends Component {
  static defaultProps = {
    years: getYears(1950, 2025)
  };

  render() {
    const { primary_release_year, onChangeYear, years } = this.props;
    return (
      <Select
        id="year"
        name="primary_release_year"
        onChange={onChangeYear}
        value={primary_release_year}
        placeholder='Выберите год'
        labelText="Год выхода:"
        options={years}
      />
    );
  }
}

export default ByYear;

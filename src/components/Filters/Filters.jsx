import React from "react";
import SortBy from "./SortBy";
import ByYear from "./ByYear";
export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year },
      onChangeFilters,
      resetFilters
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <ByYear year={year} onChangeYear={onChangeFilters} />
        <button type='button' className="btn btn-primary" onClick={resetFilters}>
        Reset filters
        </button>
      </form>
    );
  }
}

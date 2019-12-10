import React from "react";
import SortBy from "./SortBy";
import ByYear from "./ByYear";
import Genres from "./Genres";
export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year, genres },
      onChangeFilters,
      resetFilters,
      onChangeGenre,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <ByYear year={year} onChangeYear={onChangeFilters} />
        <Genres onChangeGenre={onChangeGenre} genres={genres} />
        <div className="btn-group mt-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      </form>
    );
  }
}

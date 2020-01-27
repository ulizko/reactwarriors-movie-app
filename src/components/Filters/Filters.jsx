import React from 'react';
import SortBy from './SortBy';
import ByYear from './ByYear';
import Genres from './Genres';
export default class Filters extends React.PureComponent {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      resetFilters,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <ByYear
          primary_release_year={primary_release_year}
          onChangeYear={onChangeFilters}
        />
        <Genres onChangeFilters={onChangeFilters} with_genres={with_genres} />
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

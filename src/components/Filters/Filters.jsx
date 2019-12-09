import React from "react";
import SortBy from "./SortBy";
import ByYear from "./ByYear";
import Pagination from "./Pagination";
export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year },
      onChangeFilters,
      onChangePage,
      page,
      total_pages,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <ByYear year={year} onChangeYear={onChangeFilters} />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          total_pages={total_pages}
        />
      </form>
    );
  }
}

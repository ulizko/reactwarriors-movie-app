import React from 'react';

import Filters from '../../Filters/Filters';
import MoviesList from '../../Movies/MoviesList';
import Pagination from '../../Filters/Pagination';

export default class MoviesPage extends React.Component {
  constructor() {
    super();

    this.initialFilters = {
      primary_release_year: '',
      sort_by: 'popularity.desc',
      with_genres: [],
    };
    this.state = {
      filters: { ...this.initialFilters },
      page: 1,
      total_pages: 1,
    };
  }

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          [name]: value,
        },
      };
    });
  };

  onChangePage = page => {
    this.setState({ page });
  };

  setTotalPages = total_pages => {
    this.setState({ total_pages });
  };

  resetFilters = () => {
    this.setState({ filters: this.initialFilters, page: 1 });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
            <Pagination
              page={page}
              onChangePage={this.onChangePage}
              total_pages={total_pages}
            />
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              setTotalPages={this.setTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}

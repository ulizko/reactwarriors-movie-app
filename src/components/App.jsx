import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Pagination from "./Filters/Pagination";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialFilters = {
      year: 2018,
      sort_by: "popularity.desc",
      genres: [],
    };
    this.state = {
      filters: { ...this.initialFilters },
      page: 1,
      total_pages: 1,
    };
  }

  onChangeFilters = event => {
    event.persist();
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          [event.target.name]: event.target.value,
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

  onChangeGenre = event => {
    const id = event.target.value;
    const { genres } = this.state.filters;
    let newGenres = [];
    if (genres.includes(id)) {
      newGenres = genres.filter(el => el !== id);
    } else {
      newGenres = [...genres, id];
    }
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          genres: newGenres,
        },
      };
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  resetFilters={this.resetFilters}
                  onChangeGenre={this.onChangeGenre}
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

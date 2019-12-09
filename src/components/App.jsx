import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        year: 2018,
        sort_by: "popularity.desc",
      },
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
                  onChangePage={this.onChangePage}
                  page={page}
                  total_pages={total_pages}
                />
              </div>
            </div>
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

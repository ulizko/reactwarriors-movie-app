import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filters.sort_by !== this.props.filters.sort_by ||
      prevProps.filters.year !== this.props.filters.year
    ) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  getMovies = (filters, page) => {
    const { sort_by, year } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.setTotalPages(data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
  };

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

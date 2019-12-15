import React, { Component } from "react";
import queryString from 'query-string'
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
    console.log('update')
    if (prevProps.filters !== this.props.filters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryParams = {
      api_key: API_KEY_3,
      language: 'ru-Ru',
      sort_by,
      page,
      primary_release_year
    }

    if(with_genres.length) {
      queryParams.with_genres = with_genres.join(',')
    }

    const queryStringParams = queryString.stringify(queryParams)
    const link = `${API_URL}/discover/movie?${queryStringParams}`;

    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.props.setTotalPages(data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
  };

  render() {
    console.log('render')
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

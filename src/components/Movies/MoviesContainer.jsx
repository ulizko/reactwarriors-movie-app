import React, { Component } from 'react';
import Loader from '../Loader';
import CallApi from '../../api/api';
import MovieList from './MoviesList';

export default class MoviesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    console.log('update');
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
      sort_by,
      page,
      primary_release_year,
    };

    if (with_genres.length) {
      queryParams.with_genres = with_genres.join(',');
    }

    CallApi.get('/discover/movie', queryParams).then(data => {
      this.props.setTotalPages(data.total_pages);
      this.setState({
        movies: data.results,
        loaded: true,
      });
    });
  };

  render() {
    console.log('render');
    const { movies, loaded } = this.state;
    return (
      <React.Fragment>
        {loaded ? <MovieList movies={movies} /> : <Loader />}
      </React.Fragment>
    );
  }
}

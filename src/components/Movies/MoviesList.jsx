import React from 'react';
import MovieItemContainer from './MovieItemContainer';
import MoviesHOC from './MoviesHOC';
import PropTypes from 'prop-types';

const MoviesList = ({ movies }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItemContainer item={movie} />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesHOC(MoviesList);

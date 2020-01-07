import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Inputs/Checkbox';

const Genres = ({ genres, onChangeGenre, with_genres }) => {
  return (
    <div className="form-group">
      <h6>По жанру:</h6>
      {genres.map(genre => (
        <Checkbox
          key={genre.id}
          value={genre.id}
          labelText={genre.name}
          name={genre.name}
          checked={with_genres.includes(String(genre.id))}
          onChange={onChangeGenre}
        />
      ))}
    </div>
  );
};

Genres.defaultProps = {
  genres: [],
  with_genres: [],
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array,
  onChangeGenre: PropTypes.func,
};
export default Genres;

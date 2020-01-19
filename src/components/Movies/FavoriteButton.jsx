import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default class FavoriteButton extends Component {
  render() {
    const { isFavorite, toggleFavorite } = this.props;
    return (
      <button className="btn btn-sm" onClick={toggleFavorite}>
        {isFavorite ? (
          <FavoriteIcon color="secondary" />
        ) : (
          <FavoriteBorderIcon color="secondary" />
        )}
      </button>
    );
  }
}

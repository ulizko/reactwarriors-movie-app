import React, { Component } from 'react';
import CallApi from '../../api/api';
import AppContextHOC from '../HOC/AppConextHOC';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleClick = () => {
    const { user, toggleModal } = this.props;
    if (user) {
      this.markAsFavorite();
    } else {
      toggleModal();
    }
  };

  markAsFavorite = () => {
    const { session_id, user, movie } = this.props;
    const isFavorite = this.isFavorite();
    this.setState({ loading: true });

    CallApi.post(`/account/${user.id}/favorite`, {
      params: { session_id },
      body: { media_type: 'movie', media_id: movie.id, favorite: !isFavorite },
    }).then(data => {
      if (isFavorite) {
        this.removeFromFavorites();
      } else {
        this.addToFavorites();
      }
      this.setState({ loading: false });
    });
  };

  removeFromFavorites = () => {
    const { movie, favorites, updateFavorites } = this.props;
    const newState = favorites.filter(favorite => favorite.id !== movie.id);
    updateFavorites(newState);
  };

  addToFavorites = () => {
    const { movie, favorites, updateFavorites } = this.props;
    const newState = [...favorites, movie];
    updateFavorites(newState);
  };

  isFavorite = () => {
    const { favorites, movie } = this.props;
    return favorites.some(favorite => favorite.id === movie.id);
  };

  render() {
    const isFavorite = this.isFavorite();
    return (
      <button
        className="btn btn-sm"
        onClick={this.handleClick}
        disabled={this.state.loading}
      >
        {isFavorite ? (
          <FavoriteIcon color="secondary" />
        ) : (
          <FavoriteBorderIcon color="secondary" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(FavoriteButton);

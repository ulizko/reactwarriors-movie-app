import React from 'react';
import MovieItem from './MovieItem';
import AppContextHOC from '../HOC/AppConextHOC';

class MovieItemContainer extends React.Component {
  toggleFavorite = () => {
    const { item, removeFromFavorite, addToFavorite } = this.props;
    const isFavorite = this.isFavorite(item);
    if (isFavorite) {
      removeFromFavorite(item);
    } else {
      addToFavorite(item);
    }
  };

  toggleBookmark = () => {
    const { item, removeFromBookmark, addToBookmark } = this.props;
    const isBookmark = this.isBookmark(item);
    if (isBookmark) {
      removeFromBookmark(item);
    } else {
      addToBookmark(item);
    }
  };

  containsMovie = item => movie => movie.id === item.id;

  isFavorite = item => this.props.favorites.some(this.containsMovie(item));

  isBookmark = item => this.props.bookmarks.some(this.containsMovie(item));

  render() {
    const { item } = this.props;
    return (
      <MovieItem
        item={item}
        isFavorite={this.isFavorite(item)}
        isBookmark={this.isBookmark(item)}
        toggleFavorite={this.toggleFavorite}
        toggleBookmark={this.toggleBookmark}
      />
    );
  }
}

export default AppContextHOC(MovieItemContainer);

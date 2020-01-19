import React from 'react';
import FavoriteButton from './FavoriteButton';
import BookmarkButton from './BookmarkButton';

export default class MovieItem extends React.Component {
  render() {
    const {
      item,
      isFavorite,
      isBookmark,
      toggleFavorite,
      toggleBookmark,
    } = this.props;
    const src = `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
      item.poster_path}`;
    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={src}
          alt={item.title}
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text" style={{ position: 'relative' }}>
            Рейтинг: {item.vote_average}
            <div
              className="icons"
              style={{
                position: 'absolute',
                bottom: -10,
                right: 0,
              }}
            >
              <FavoriteButton
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
              <BookmarkButton
                isBookmark={isBookmark}
                toggleBookmark={toggleBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

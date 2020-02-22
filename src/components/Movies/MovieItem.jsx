import React from 'react';
import FavoriteButton from './FavoriteButton';
import BookmarkButton from './BookmarkButton';
import { Link } from 'react-router-dom';
export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const src = `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
      item.poster_path}`;
    return (
      <div className="card movie-item">
        <img
          className="card-img-top card-img--height"
          src={src}
          alt={item.title}
        />
        <div className="card-body">
          <h6 className="card-title">
            <Link to={`/movie/${item.id}/detail`}>{item.title}</Link>
          </h6>
          <div className="card-text">
            Рейтинг: {item.vote_average}
            <div className="icons">
              <FavoriteButton movie={item} />
              <BookmarkButton movie={item} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

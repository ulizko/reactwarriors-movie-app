import React, { Component } from 'react';
import CallApi from '../../api/api';
import AppContextHOC from '../HOC/AppConextHOC';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

class BookmarkButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  isBookmark = () => {
    const { bookmarks, movie } = this.props;
    return bookmarks.some(bookmark => bookmark.id === movie.id);
  };

  handleClick = () => {
    const { user, toggleModal } = this.props;
    if (user) {
      this.markAsBookmark();
    } else {
      toggleModal();
    }
  };

  markAsBookmark = () => {
    const { session_id, user, movie } = this.props;
    const isBookmark = this.isBookmark();
    this.setState({ loading: true });

    CallApi.post(`/account/${user.id}/watchlist`, {
      params: { session_id },
      body: {
        media_type: 'movie',
        media_id: movie.id,
        watchlist: !isBookmark,
      },
    }).then(data => {
      if (isBookmark) {
        this.removeFromBookmarks();
      } else {
        this.addToBookmarks();
      }
      this.setState({ loading: false });
    });
  };

  removeFromBookmarks = () => {
    const { movie, bookmarks, updateBookmarks } = this.props;
    const newState = bookmarks.filter(bookmark => bookmark.id !== movie.id);
    updateBookmarks(newState);
  };

  addToBookmarks = () => {
    const { movie, bookmarks, updateBookmarks } = this.props;
    const newState = [...bookmarks, movie];
    updateBookmarks(newState);
  };

  render() {
    return (
      <button
        className="btn btn-sm"
        onClick={this.handleClick}
        disabled={this.state.loading}
      >
        {this.isBookmark() ? (
          <BookmarkIcon color="primary" />
        ) : (
          <BookmarkBorderIcon color="primary" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(BookmarkButton);

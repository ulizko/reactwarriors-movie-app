import React, { Component } from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

export default class BookmarkButton extends Component {
  render() {
    const { isBookmark, toggleBookmark } = this.props;
    return (
      <button className="btn btn-sm" onClick={toggleBookmark}>
        {isBookmark ? (
          <BookmarkIcon color="primary" />
        ) : (
          <BookmarkBorderIcon color="primary" />
        )}
      </button>
    );
  }
}

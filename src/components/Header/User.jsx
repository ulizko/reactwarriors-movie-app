import React, { Component } from 'react';

export default class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          width="40"
          className="rounded-circle"
          src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=64`}
          alt={user.username}
        />
      </div>
    );
  }
}

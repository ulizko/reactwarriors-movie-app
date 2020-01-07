import React, { Component } from 'react';
import { AppContext } from '../App';
class User extends Component {
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

const UserContainer = () => {
  return (
    <AppContext.Consumer>
      {context => {
        return <User user={context.user} />;
      }}
    </AppContext.Consumer>
  );
};

UserContainer.displayName = 'UserContainer';

export default UserContainer;

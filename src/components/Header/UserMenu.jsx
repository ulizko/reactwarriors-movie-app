import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { API_URL, API_KEY_3, fetchApi } from '../../api/api';

import AppContextHOC from '../HOC/AppConextHOC';

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => {
      return {
        dropdownOpen: !prevState.dropdownOpen,
      };
    });
  };

  handleLogOut = () => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.props.session_id,
      }),
    }).then(_data => {
      this.props.onLogOut();
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=64`}
            alt={user.username}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <div onClick={this.handleLogOut}>LogOut</div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default AppContextHOC(UserMenu);

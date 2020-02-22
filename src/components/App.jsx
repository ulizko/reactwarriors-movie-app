import React from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header/Header';
import LoginModal from './Header/Login/LoginModal';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';

import CallApi from '../api/api';

const SECONDS_PER_MONTH = 2592000;
const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      session_id: null,
      user: null,
      favorites: [],
      bookmarks: [],
      openLoginForm: false,
    };
  }

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      CallApi.get('/account', { params: { session_id } }).then(user => {
        this.updateSessionId(session_id);
        this.updateUser(user);
      });
    }
  }

  getFavorites = user => {
    const { session_id } = this.state;
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: { session_id },
    }).then(data => {
      this.setState({ favorites: data.results });
    });
  };

  getBookmarks = user => {
    const { session_id } = this.state;
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: { session_id },
    }).then(data => {
      this.setState({ bookmarks: data.results });
    });
  };

  updateUser = user => {
    this.setState({ user, openLoginForm: false }, () => {
      this.getFavorites(user);
      this.getBookmarks(user);
    });
  };

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: SECONDS_PER_MONTH,
    });
    this.setState({ session_id });
  };

  onLogOut = () => {
    this.setState(
      {
        user: null,
        session_id: null,
        favorites: [],
        bookmarks: [],
      },
      () => {
        cookies.remove('session_id');
      }
    );
  };

  updateFavorites = favorites => this.setState({ favorites });

  updateBookmarks = bookmarks => this.setState({ bookmarks });

  toggleModal = () => {
    this.setState(prevState => ({ openLoginForm: !prevState.openLoginForm }));
  };

  render() {
    const { user, favorites, bookmarks, openLoginForm } = this.state;
    return (
      <Router>
        <AppContext.Provider
          value={{
            user,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            session_id: this.state.session_id,
            favorites: favorites,
            bookmarks: bookmarks,
            toggleModal: this.toggleModal,
            updateBookmarks: this.updateBookmarks,
            updateFavorites: this.updateFavorites,
          }}
        >
          <Header user={user} toggleModal={this.toggleModal} />
          <LoginModal isOpen={openLoginForm} toggleModal={this.toggleModal} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </AppContext.Provider>
      </Router>
    );
  }
}

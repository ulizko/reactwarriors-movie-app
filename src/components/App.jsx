import React from 'react';
import Cookies from 'universal-cookie';

import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import Pagination from './Filters/Pagination';
import Header from './Header/Header';
import LoginModal from './Header/Login/LoginModal';

import CallApi from '../api/api';

const SECONDS_PER_MONTH = 2592000;
const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialFilters = {
      primary_release_year: '',
      sort_by: 'popularity.desc',
      with_genres: [],
    };
    this.state = {
      session_id: null,
      user: null,
      filters: { ...this.initialFilters },
      page: 1,
      total_pages: 1,
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

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          [name]: value,
        },
      };
    });
  };

  onChangePage = page => {
    this.setState({ page });
  };

  setTotalPages = total_pages => {
    this.setState({ total_pages });
  };

  resetFilters = () => {
    this.setState({ filters: this.initialFilters, page: 1 });
  };

  updateFavorites = favorites => this.setState({ favorites });

  updateBookmarks = bookmarks => this.setState({ bookmarks });

  toggleModal = () => {
    this.setState(prevState => ({ openLoginForm: !prevState.openLoginForm }));
  };

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      favorites,
      bookmarks,
      openLoginForm,
    } = this.state;
    return (
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
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    resetFilters={this.resetFilters}
                  />
                </div>
              </div>
              <Pagination
                page={page}
                onChangePage={this.onChangePage}
                total_pages={total_pages}
              />
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                page={page}
                onChangePage={this.onChangePage}
                setTotalPages={this.setTotalPages}
              />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

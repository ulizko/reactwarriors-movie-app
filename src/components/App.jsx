import React from 'react';
import Cookies from 'universal-cookie';

import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import Pagination from './Filters/Pagination';
import Header from './Header/Header';

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
    this.setState({ user }, () => {
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

  markAsFavorite = (item, isFavorite) => {
    const { session_id, user } = this.state;
    return CallApi.post(`/account/${user.id}/favorite`, {
      params: { session_id },
      body: { media_type: 'movie', media_id: item.id, favorite: isFavorite },
    });
  };

  removeFromFavorite = item => {
    if (this.state.user) {
      this.markAsFavorite(item, false).then(data => {
        const newState = this.state.favorites.filter(
          favorite => favorite.id !== item.id
        );
        this.setState({ favorites: newState });
      });
    } else {
      this.requireAutorization();
    }
  };

  addToFavorite = movie => {
    if (this.state.user) {
      this.markAsFavorite(movie, true).then(data => {
        this.setState(prevState => {
          return {
            favorites: [...prevState.favorites, movie],
          };
        });
      });
    } else {
      this.requireAutorization();
    }
  };

  markAsBookmark = (item, isBookmark) => {
    const { session_id, user } = this.state;
    return CallApi.post(`/account/${user.id}/watchlist`, {
      params: { session_id },
      body: { media_type: 'movie', media_id: item.id, watchlist: isBookmark },
    });
  };

  removeFromBookmark = item => {
    if (this.state.user) {
      this.markAsBookmark(item, false).then(data => {
        const newState = this.state.bookmarks.filter(
          bookmark => bookmark.id !== item.id
        );
        this.setState({ bookmarks: newState });
      });
    } else {
      this.requireAutorization();
    }
  };

  addToBookmark = movie => {
    if (this.state.user) {
      this.markAsBookmark(movie, true).then(data => {
        this.setState(prevState => {
          return {
            bookmarks: [...prevState.bookmarks, movie],
          };
        });
      });
    } else {
      this.requireAutorization();
    }
  };

  requireAutorization = () => {
    this.setState({ openLoginForm: true });
  };

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
          removeFromFavorite: this.removeFromFavorite,
          addToFavorite: this.addToFavorite,
          removeFromBookmark: this.removeFromBookmark,
          addToBookmark: this.addToBookmark,
        }}
      >
        <Header
          user={user}
          openLoginForm={openLoginForm}
          toggleModal={this.toggleModal}
        />
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

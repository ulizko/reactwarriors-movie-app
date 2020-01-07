import React from 'react';
import Cookies from 'universal-cookie';

import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import Pagination from './Filters/Pagination';
import Header from './Header/Header';

import { API_URL, API_KEY_3, fetchApi } from '../api/api';

const SECONDS_PER_MONTH = 2592000;
const cookies = new Cookies();

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
    };
  }

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateSessionId = session_id => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: SECONDS_PER_MONTH,
    });
    this.setState({ session_id });
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

  render() {
    const { filters, page, total_pages, user } = this.state;
    return (
      <React.Fragment>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
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
      </React.Fragment>
    );
  }
}

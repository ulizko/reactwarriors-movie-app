import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { API_URL, API_KEY_3 } from '../../api/api';

export default Component => {
  return class GenresContainer extends PureComponent {
    constructor() {
      super();
      this.state = { genres: [], loaded: false };
    }

    static defaultProps = {
      with_genres: [],
    };

    static propTypes = {
      with_genres: PropTypes.array,
    };

    componentDidMount() {
      const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
      fetch(link)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ genres: data.genres, loaded: true });
        });
    }

    onChangeGenre = event => {
      const id = event.target.value;
      const { with_genres } = this.props;
      let newGenres = [];
      if (with_genres.includes(id)) {
        newGenres = with_genres.filter(el => el !== id);
      } else {
        newGenres = [...with_genres, id];
      }
      const target = { name: 'with_genres', value: newGenres };
      this.props.onChangeFilters({ target });
    };

    render() {
      console.log('genres render');
      const { genres, loaded } = this.state;
      return (
        <div>
          {loaded ? (
            <Component
              genres={genres}
              onChangeGenre={this.onChangeGenre}
              with_genres={this.props.with_genres}
            />
          ) : (
            <Loader />
          )}
        </div>
      );
    }
  };
};

import React, { Component } from "react";
import Checkbox from "../Inputs/Checkbox";
import { API_URL, API_KEY_3 } from "../../api/api";

export class Genres extends Component {
  constructor() {
    super();
    this.state = { genres: [] };
  }

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ genres: data.genres });
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
    const target = { name: 'with_genres', value: newGenres }
    this.props.onChangeFilters({ target })
  };

  genresToCheckboxes = genres => {
    return genres.map(genre => (
      <Checkbox
        key={genre.id}
        value={genre.id}
        labelText={genre.name}
        name={genre.name}
        checked={this.props.with_genres.includes(String(genre.id))}
        onChange={this.onChangeGenre}
      />
    ));
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h6>По жанру:</h6>
        {this.genresToCheckboxes(genres)}
      </div>
    );
  }
}

export default Genres;

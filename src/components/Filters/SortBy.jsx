import React, { Component } from "react";
import PropTypes from "prop-types";

export class SortBy extends Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    sort_by: PropTypes.string.isRequired,
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc",
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc",
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc",
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc",
      },
    ],
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SortBy;

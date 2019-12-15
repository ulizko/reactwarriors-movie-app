import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Select from "../Inputs/Select";

export class SortBy extends PureComponent {
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
      <Select
        id="sort_by"
        name="sort_by"
        options={options}
        value={sort_by}
        onChange={onChangeFilters}
        labelText="Сортировать по:"
      />
    );
  }
}

export default SortBy;

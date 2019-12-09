import React, { Component, Fragment } from "react";

export class Pagination extends Component {
  render() {
    const { page, onChangePage, total_pages } = this.props;
    return (
      <Fragment>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page - 1)}
            disabled={page === 1}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        <div className="text-center">
          {page} стр. из {total_pages}
        </div>
      </Fragment>
    );
  }
}

export default Pagination;

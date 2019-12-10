import React, { Component, Fragment } from "react";

export class Pagination extends Component {
  render() {
    const { page, onChangePage, total_pages } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body mx-auto">
        <h6 class="card-title">Страница {page} из {total_pages}</h6>

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

        </div>
      </div>
    );
  }
}

export default Pagination;

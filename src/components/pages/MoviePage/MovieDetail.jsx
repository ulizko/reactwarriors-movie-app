import React, { Component } from 'react';

export default class MovieDetail extends Component {
  render() {
    const { detail } = this.props;
    return (
      <div className="container">
        {Object.keys(detail).length > 0 && (
          <table>
            <tbody>
              <tr>
                <td className="detail-name">Original Title:</td>
                <td className="detail-value">{detail.original_title}</td>
              </tr>
              <tr>
                <td className="detail-name">Runtime:</td>
                <td className="detail-value">{detail.runtime} min</td>
              </tr>
              <tr>
                <td className="detail-name">Production companies:</td>
                <td className="detail-value">
                  {detail.production_companies
                    .filter(company => company.logo_path)
                    .map(company => {
                      return (
                        <div key={company.id} className="companies">
                          <img
                            className="company-logo"
                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                            alt={company.name}
                            title={company.name}
                            width="30px"
                          />
                          <span className="company-name">{company.name}</span>
                        </div>
                      );
                    })}
                </td>
              </tr>
              <tr>
                <td className="detail-name">Budget:</td>
                <td className="detail-value">
                  {detail.budget ? `$${detail.budget}` : '-'}
                </td>
              </tr>
              <tr>
                <td className="detail-name">Revenue:</td>
                <td className="detail-value">
                  {detail.revenue ? `$${detail.revenue}` : '-'}
                </td>
              </tr>
              <tr>
                <td className="detail-name">Genres:</td>
                <td className="detail-value">
                  {detail.genres.map(genre => {
                    return (
                      <span key={genre.id} className="badge badge-secondary">
                        {genre.name}
                      </span>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

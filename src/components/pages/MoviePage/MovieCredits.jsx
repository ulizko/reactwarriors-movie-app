import React, { Component } from 'react';
import CallApi from '../../../api/api';

export default class MovieCredits extends Component {
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}/credits`).then(data => {
      this.props.setTabContent({ name: 'credits', content: data.cast });
    });
  }
  render() {
    const { credits } = this.props;
    return (
      <div className="row">
        {credits.map(actor => {
          return (
            <div key={actor.cast_id} className="col-2 mb-3">
              <div className="card">
                <div className="card-header">{actor.character}</div>
                {actor.profile_path && (
                  <img
                    className="card-img-top card-img--height"
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  />
                )}

                <div className="card-body">
                  <h6 className="card-title">{actor.name}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

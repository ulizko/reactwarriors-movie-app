import React, { Component } from 'react';
import CallApi from '../../../api/api';

const sources = ({ site, key }) => {
  if (site === 'YouTube') {
    return `https://youtube.com/embed/${key}?&modestbranding=1&fs=1&autohide=1`;
  } else if (site === 'Vimeo') {
    return `https://vimeo.com/${key}`;
  }
  return '';
};

export default class MovieVideos extends Component {
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}/videos`).then(data => {
      this.props.setTabContent({ name: 'videos', content: data.results });
    });
  }
  render() {
    const { videos } = this.props;
    if (videos.length === 0) {
      return <div>No videos</div>;
    }
    return (
      <div className="row">
        {videos.map(video => {
          return (
            <div className="col-4" key={video.id}>
              <h6>{video.name}</h6>
              <iframe src={sources(video)} width="300" height="200"></iframe>
            </div>
          );
        })}
      </div>
    );
  }
}

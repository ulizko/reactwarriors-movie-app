import React, { Component } from 'react';
import CallApi from '../../../api/api';
import FavoriteButton from '../../Movies/FavoriteButton';
import BookmarkButton from '../../Movies/BookmarkButton';
import { TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import MovieDetail from './MovieDetail';
import MovieCredits from './MovieCredits';
import MovieVideos from './MovieVideos';
import Loader from '../../Loader';
import { Switch, Route, NavLink } from 'react-router-dom';
export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      detail: {},
      credits: [],
      videos: [],
      loading: true,
    };
  }
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
      this.setState({ detail: data, loading: false });
    });
  }

  setTabContent = ({ name, content }) => {
    this.setState({ [name]: content });
  };

  releaseYear = release => {
    const date = new Date(release);
    return date.getFullYear();
  };

  render() {
    const { detail, videos, credits, loading } = this.state;
    return (
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="movie-page">
            <img
              className="card-img-top card-img--height"
              src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
              alt={detail.title}
            />
            <div className="card-body">
              <h1 className="movie-title">
                {detail.title} ({this.releaseYear(detail.release_date)})
              </h1>
              <div className="icons">
                <FavoriteButton movie={detail} />
                <BookmarkButton movie={detail} />
              </div>
              <div className="movie-text">
                <h5>Обзор</h5>
                <p>{detail.overview}</p>
                Рейтинг: {detail.vote_average}
              </div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    to={`${this.props.match.url}/detail`}
                    activeClassName="active"
                    className="nav-link"
                  >
                    Detail
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to={`${this.props.match.url}/credits`}
                    activeClassName="active"
                    className="nav-link"
                  >
                    Credits
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to={`${this.props.match.url}/videos`}
                    activeClassName="active"
                    className="nav-link"
                  >
                    Videos
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        )}

        <TabContent>
          <TabPane>
            <Switch>
              <Route
                exact
                path={`${this.props.match.path}/detail`}
                render={props => (
                  <MovieDetail
                    {...props}
                    detail={detail}
                    setTabContent={this.setTabContent}
                  />
                )}
              ></Route>
              <Route
                exact
                path={`${this.props.match.path}/credits`}
                render={props => (
                  <MovieCredits
                    {...props}
                    credits={credits}
                    setTabContent={this.setTabContent}
                  />
                )}
              ></Route>
              <Route
                exact
                path={`${this.props.match.path}/videos`}
                render={props => (
                  <MovieVideos
                    {...props}
                    videos={videos}
                    setTabContent={this.setTabContent}
                  />
                )}
              />
            </Switch>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

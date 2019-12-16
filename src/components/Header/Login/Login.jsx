import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";
export default class Login extends Component {
  sendPromises = () => {
    const fetchApi = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(data => {
            reject(data);
          });
      });
    };

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: process.env.REACT_APP_TMDB_LOGIN,
              password: process.env.REACT_APP_TMDB_PASSWORD,
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => console.log(data))
      .catch(error => {
        console.log("error", error);
      });
  };
  render() {
    return (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="button"
        onClick={this.sendPromises}
      >
        Login
      </button>
    );
  }
}

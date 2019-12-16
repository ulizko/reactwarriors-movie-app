import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";
export default class Login extends Component {
  sendPromises = () => {
    const link = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;
    fetch(link)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetch(
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
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            fetch(
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
            )
              .then(response => response.json())
              .then(data => {
                console.log(data);
              });
          });
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

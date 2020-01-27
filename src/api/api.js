import queryString from 'query-string';

export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '30e475ab85fa777052d0c22cae18d760';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGU0NzVhYjg1ZmE3NzcwNTJkMGMyMmNhZTE4ZDc2MCIsInN1YiI6IjU3MDhmY2FkOTI1MTQxNmE0YTAwMDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vHnFzj5X8BktkGhiCus1v15_2ESvDRTXKkbta52kELA';

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;

    const queryParams = {
      api_key: API_KEY_3,
      language: 'ru-Ru',
      ...params,
    };

    const queryStringParams = queryString.stringify(queryParams);

    return fetchApi(`${API_URL}${url}?${queryStringParams}`, {
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryParams = {
      api_key: API_KEY_3,
      language: 'ru-Ru',
      ...params,
    };

    const queryStringParams = queryString.stringify(queryParams);

    return fetchApi(`${API_URL}${url}?${queryStringParams}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryParams = {
      api_key: API_KEY_3,
      language: 'ru-Ru',
      ...params,
    };

    const queryStringParams = queryString.stringify(queryParams);

    return fetchApi(`${API_URL}${url}?${queryStringParams}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
export const fetchApi = (url, options = {}) => {
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
        data.json().then(error => {
          reject(error);
        });
      });
  });
};

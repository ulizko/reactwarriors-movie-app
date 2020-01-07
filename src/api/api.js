export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '30e475ab85fa777052d0c22cae18d760';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGU0NzVhYjg1ZmE3NzcwNTJkMGMyMmNhZTE4ZDc2MCIsInN1YiI6IjU3MDhmY2FkOTI1MTQxNmE0YTAwMDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vHnFzj5X8BktkGhiCus1v15_2ESvDRTXKkbta52kELA';

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

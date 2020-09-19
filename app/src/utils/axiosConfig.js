import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = process.env.REACT_APP_API_CONNECTION;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = Cookies.get('thirteen-profile');

export const setAxiosAuth = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setBrowserCookie = (token) => {
  document.cookie = `thirteen-profile=${token}`;
};

if (token) {
  setAxiosAuth(token);
}

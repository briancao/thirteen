import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAxiosAuth, setBrowserCookie } from '../../utils/axiosConfig';
import { wsConnect, wsDisconnect } from './../../redux/socket/actions';

function Socket({ children, wsConnect, wsDisconnect }) {
  useEffect(() => {
    let token = Cookies.get('thirteen-profile');

    async function verify() {
      await axios
        .post('/api/user/validate', { token })
        .then((res) => {})
        .catch((e) => {
          if (e?.response?.status !== 200) {
          }
        });
    }

    async function fetchGuest() {
      await axios
        .post('/api/user/guest')
        .then((res) => {
          const token = res.headers['auth-token'];

          setAxiosAuth(token);
          setBrowserCookie(token);
        })
        .catch((e) => {
          if (e?.response?.status === 400) {
          }
        });
    }

    if (!token) {
      fetchGuest();
    }

    wsConnect(process.env.REACT_APP_SOCKET_CONNECTION);

    return () => {
      wsDisconnect();
    };
  }, []);

  return null;
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators({ wsConnect, wsDisconnect }, dispatch),
)(Socket);

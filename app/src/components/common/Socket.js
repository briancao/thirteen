import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useVerify from '../../hooks/useVerify';
import { wsConnect, wsDisconnect } from '../../redux/socket/actions';
import { setAxiosAuth, setBrowserCookie } from '../../utils/axiosConfig';

export async function fetchGuest() {
  const res = await axios.post('/api/user/guest');

  return res;
}

export default function Socket() {
  const dispatch = useDispatch();
  const [user, validated] = useVerify();

  useEffect(() => {
    if (validated)
      if (!user.id) {
        fetchGuest().then((res) => {
          const token = res.headers['auth-token'];

          setAxiosAuth(token);
          setBrowserCookie(token);

          dispatch(wsConnect(process.env.REACT_APP_SOCKET_CONNECTION));
        });
      } else {
        dispatch(wsConnect(process.env.REACT_APP_SOCKET_CONNECTION));
      }
  }, [user, validated, dispatch]);

  useEffect(() => {
    return function cleanup() {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return null;
}

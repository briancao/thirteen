import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/user/action';

export async function verifyUser(token) {
  const res = await axios.post('/api/user/verify', { token });

  return res;
}

export default function useVerify() {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user);
  const [user, setUser] = useState(storeUser);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (user.id) {
      return;
    }

    let token = Cookies.get('thirteen-profile');

    if (token) {
      verifyUser(token).then(async (res) => {
        if (!res.data.user) {
          window.location.href = '/';
        }

        await dispatch(updateUser(res.data.user));

        setUser(res.data.user);
        setValidated(true);
      });
    } else {
      setValidated(true);
    }
  }, [user, dispatch]);

  return [user, validated];
}

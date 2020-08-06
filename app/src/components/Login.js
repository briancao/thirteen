import React, { useEffect, useState } from 'react';

function Login() {
  async function login() {
    try {
      const res = await fetch(`${process.env.END_POINT}/api/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'brianbcao@gmail.com',
          password: '123456',
        }),
      });
      const { token } = await res.json();
      console.log(token);

      document.cookie = `accessToken=${token}`;
      window.sessionStorage.accessToken = token;
    } catch (e) {
      console.log('ERROR!!!!!!!!!!');
      console.log(new Error('error is me' + e));
    }
  }

  return (
    <div>
      <div>
        <button id="login" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Socket;

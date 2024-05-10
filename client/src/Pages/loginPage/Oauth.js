import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'state';
import jwt_Decode from 'jwt-decode';

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = useSelector((state) => state.host);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const data = await res.json();
        sendData(data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const sendData = async (values) => {
    const response = await fetch(`${apiUrl}/auth/oauth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const loggedIn = await response.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };
  return <button onClick={() => googleLogin()}>Google </button>;
};

export default Oauth;

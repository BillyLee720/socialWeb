import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import jwt_Decode from "jwt-decode";
import { Button, Box } from "@mui/material";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import FlexBetween from "components/FlexBetween";
import { FacebookProvider, LoginButton } from "react-facebook";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = useSelector((state) => state.host);

  // const twitterClient = new TwitterApi({
  //   clientId: "SHplV01seTlRZF81a2JUN2R3Z2g6MTpjaQ",
  //   clientSecret: "ukzEQ8vlfkQhEHsbsrzD9DoDAVdUhRcailpXguAoiC4Sh83F6G",
  //   callback: "http://localhost:3001/oauth/twitterx",
  // });

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            method: "GET",
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      navigate("/home");
    }
  };
  function handleSuccess(response) {
    console.log(response);
  }

  function handleError(error) {
    console.log(error);
  }

  // const facebookLogin = async () => {
  //   try {
  //     const res = await login({
  //       scope: "email",
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <FlexBetween>
      <Button
        variant="outlined"
        startIcon={<FaGoogle />}
        onClick={() => googleLogin()}
      >
        Connect with Google{" "}
      </Button>
      <FacebookProvider appId="2098633277240753">
        <Button variant="outlined" startIcon={<FaFacebook />}>
          <LoginButton
            scope="email"
            onSuccess={handleSuccess}
            onError={handleError}
          >
            Connect with FaceBook
          </LoginButton>
        </Button>
      </FacebookProvider>
    </FlexBetween>
  );
};

export default Oauth;

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "Pages/homePage/home";
import LoginPage from "Pages/loginPage/login";
import ProfilePage from "Pages/profilePage/profile";
import InfoPage from "Pages/editPage/UserInfo";
import EditName from "Pages/editPage/Name";
import Navbar from "Pages/navbar/navbar";
import ChangePassword from "Pages/editPage/Password";
import EditLocation from "Pages/editPage/Location";
import EditOccupation from "Pages/editPage/Occupation";
import SearchPage from "Pages/searchPage/search";
import PrivacyPolicy from "Pages/privacy/PrivacyPolicy";
import TermsOfService from "Pages/privacy/TermsOfService";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { setHost } from "state";
import { useEffect } from "react";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const host = useSelector((state) => state.host);
  const dispatch = useDispatch();

  const web = process.env.NODE_ENV;

  const ServerUrl =
    web === "development" ? "http://localhost:3001" : process.env.REACT_APP_URL;

  useEffect(() => {
    console.log(process.env.NODE_ENV);

    dispatch(setHost({ host: ServerUrl }));
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/userInfo"
              element={isAuth ? <InfoPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/name"
              element={isAuth ? <EditName /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/occupation"
              element={isAuth ? <EditOccupation /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/location"
              element={isAuth ? <EditLocation /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/password"
              element={isAuth ? <ChangePassword /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

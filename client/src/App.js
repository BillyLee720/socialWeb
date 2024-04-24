import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'Pages/homePage/home';
import LoginPage from 'Pages/loginPage/login';
import ProfilePage from 'Pages/profilePage/profile';
import InfoPage from 'Pages/editPage/UserInfo';
import EditName from 'Pages/editPage/Name';
import Navbar from 'Pages/navbar/navbar';
import EditLocation from 'Pages/editPage/Location';
import EditOccupation from 'Pages/editPage/Occupation';
import { useMemo } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
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
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

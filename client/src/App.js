import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'Pages/homePage/home';
import LoginPage from 'Pages/loginPage/login';
import ProfilePage from 'Pages/profilePage/profile';
import Navbar from 'Pages/navbar/navbar';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

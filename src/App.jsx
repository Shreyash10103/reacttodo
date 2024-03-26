import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Header from './component/header.jsx'
import Profile from './component/Profile.jsx'
import Login from './component/Login.jsx'
import Register from './component/Register.jsx'
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main.jsx";


function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);

    })

  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

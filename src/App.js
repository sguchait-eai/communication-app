import Login from "./pages/login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Report from "./pages/Report";

import './App.css';
import {Route, Routes  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./redux/authSlice";

import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if ("login" in localStorage) {
      const login = JSON.parse(localStorage.getItem("login"));
      axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`;
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/*"
      element={
         (
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/reports" element={<Report />} />
            </Routes>
          </Layout>
        ) 
      }
    />
  </Routes>
  );
}

export default App;

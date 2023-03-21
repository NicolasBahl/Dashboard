import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Widgets from "./pages/Widgets";
// const clientId =
//   "224270010728-ntedomapt4ptlbaa689m1qlpq27qrtcd.apps.googleusercontent.com";
const App = () => {
  return (
    <GoogleOAuthProvider clientId={"224270010728-751vai74aa8v4220mv1jt0lj9rn56hgo.apps.googleusercontent.com"}>
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/" element={<Layout />}>
            
        </Route>
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

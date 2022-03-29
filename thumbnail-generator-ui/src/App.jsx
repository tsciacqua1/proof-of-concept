import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./layout";
import "./scss/global.scss";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Form />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;

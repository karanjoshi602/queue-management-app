import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QueueDetail from "./pages/QueueDetail";
import Dashboard from "./components/Dashboard"; 

function App() {
  const [manager, setManager] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("managerToken");
    if (token) {
      setManager(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("managerToken");
    setManager(null);
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={!!manager} />
      <Routes>
        <Route
          path="/"
          element={
            manager ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/home"
          element={manager ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            manager ? <Navigate to="/home" replace /> : <Login setManager={setManager} />
          }
        />
        <Route
          path="/register"
          element={
            manager ? <Navigate to="/home" replace /> : <Register />
          }
        />
        <Route
          path="/queue/:id"
          element={manager ? <QueueDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={manager ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

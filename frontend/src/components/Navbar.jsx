import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, isLoggedIn }) => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
      {isLoggedIn && (
        <button onClick={onLogout} style={logoutButtonStyle}>
          Logout
        </button>
      )}
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: "15px",
  fontWeight: "bold",
};

const logoutButtonStyle = {
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Navbar;

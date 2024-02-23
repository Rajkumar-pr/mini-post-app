import React from "react";
import { Link, NavLink } from "react-router-dom";

function Opening() {
  return (
    <div
      style={{
        backgroundImage: "url(https://www.10wallpaper.com/wallpaper/1600x1200/1307/background_spots_patterns-Glare_abstract_HD_wallpaper_1600x1200.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <div>
        <ul>
          <li>
            <NavLink to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </NavLink>
          </li>
        </ul>
        <h1 style={{ paddingBottom: "20px", fontSize: "3em" }}>Welcome to Mini Post App</h1>
        <p style={{ paddingBottom: "40px", fontSize: "1.5em" }}>
          This is your place for quick posts!
        </p>
        <Link to="/login">
          <button
            style={{
              backgroundColor: "transparent",
              border: "2px solid white",
              color: "white",
              padding: "10px 20px",
              fontSize: "1.2em",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Opening;

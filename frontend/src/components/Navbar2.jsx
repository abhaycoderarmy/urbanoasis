import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../../public/data/logo2.png";
import { AuthContext } from "../context/Authcontext";
import "../css/Navbar2.css"; // Import the CSS file here

const Navbar2 = ({ color = "black" }) => {
  const textColor = color === "white" ? "text-white" : "text-black";
  const { userLoggedIn, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Hotel Logo" className="logo-image" />
        <span className={`navbar-title ${textColor}`}>URBAN OASIS</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className={`link ${textColor}`}>
          Home
        </Link>
        <Link to="/AboutUs" className={`link ${textColor}`}>
          About Us
        </Link>
        <Link to="/Facilities" className={`link ${textColor}`}>
          Facilities
        </Link>
        <Link to="/RoomsPage" className={`link ${textColor}`}>
          Rooms
        </Link>
      </div>

      <div className="navbar-auth">
        <span className={`auth-text ${textColor}`}>
          {userLoggedIn ? (
            <div className="flex gap-3">
              <FaUser className={`icon ${textColor} cursor-pointer` }  onClick={()=>navigate("/dashboard")}/>
              <button onClick={userLogout} className="auth-button">
                <Link to="/" className={textColor}>
                 Logout
                </Link>
              </button>
            </div>
          ) : (
            <button className="auth-button">
              <Link to="/AuthPage" className={textColor}>
                Login/SignUp
              </Link>
            </button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar2;

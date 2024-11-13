import React, { useContext } from "react";

import vid from "../assets/Auth/vid.mp4";
import go from "../assets/Auth/google.jpg";
import fb from "../assets/Auth/fb.jpg";
import insta from "../assets/Auth/insta.jpg";
import tw from "../assets/Auth/twitter.jpg";
import Navbar2 from "./Navbar2";
import { AuthContext } from "../context/Authcontext";
import "../css/Authentication.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function Authentication() {
  const {
    isLogin,
    isAdminLogin,
    toggleForm,
    toggleLoginType,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleRegisterFormSubmit,
    adminLogger,
    userLogger,
  } = useContext(AuthContext);

  const Navigate = useNavigate();

  return (
    <div>
      <Navbar2 />
      <div className="min-h-screen flex bg-gray-50">
        {/* Left Side: Authentication Options */}
        <div className="auth-container">
          <div className="form-container">
            {isLogin ? (
              <>
                <h2 className="form-title">Login</h2>
                <div className="flex justify-center mb-4">
                  <button
                    className={`form-button ${
                      !isAdminLogin ? "" : "bg-gray-300"
                    }`}
                    onClick={() => toggleLoginType(false)}
                  >
                    User Login
                  </button>
                  <button
                    className={`form-button ${
                      isAdminLogin ? "" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      toggleLoginType(true);
                    }}
                  >
                    Admin Login
                  </button>
                </div>

                <form>
                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input-field"
                      placeholder={`Enter your ${
                        isAdminLogin ? "admin" : "user"
                      } email`}
                      onChange={handleLoginFormChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="input-field"
                      placeholder="Enter your password"
                      onChange={handleLoginFormChange}
                    />
                  </div>
                  <button
                    className="form-button w-full"
                    onClick={
                      isAdminLogin
                        ? () => {
                          alert("Admin Login Successful");
                            Navigate("/admin");
                          }
                        : userLogger
                    }
                  >
                    {isAdminLogin ? "Admin Login" : "User Login"}
                  </button>
                </form>

                <p className="mt-4 text-gray-600">
                  Don't have an account?
                  <button className="toggle-button" onClick={toggleForm}>
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="form-title">Sign Up</h2>
                <form>
                  <div className="mb-4">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="input-field"
                      placeholder="Enter your first name"
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="input-field"
                      placeholder="Enter your last name"
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input-field"
                      placeholder="Enter your email"
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      name="phoneNumber"
                      className="input-field"
                      placeholder="Enter your phone number"
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="input-field"
                      placeholder="Enter your password"
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <button
                    className="form-button w-full bg-green-500 hover:bg-green-600"
                    onClick={handleRegisterFormSubmit}
                  >
                    Sign Up
                  </button>
                </form>

                <p className="mt-4 text-gray-600">
                  Already have an account?
                  <button className="toggle-button" onClick={toggleForm}>
                    Login
                  </button>
                </p>
              </>
            )}
          </div>

          {/* Authentication Links */}
          <div className="auth-links">
            <a href="#" className="auth-link">
              <img src={go} alt="Google icon" className="auth-icon" />
            </a>
            <a href="#" className="auth-link">
              <img src={fb} alt="Facebook icon" className="auth-icon" />
            </a>
            <a href="#" className="auth-link">
              <img src={insta} alt="Instagram icon" className="auth-icon" />
            </a>
            <a href="#" className="auth-link">
              <img src={tw} alt="Twitter icon" className="auth-icon" />
            </a>
          </div>

          <div></div>
        </div>

        {/* Right Side: Video */}
        <div className="video-container">
          <video className="video-player" autoPlay loop muted src={vid} />
        </div>
      </div>
    </div>
  );
}

export default Authentication;

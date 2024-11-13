import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import {  AuthProvider } from "../context/Authcontext";

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/AboutUs"); // Adjust this path according to your routing setup
  };

  return (
    <div>
        <Navbar2 />
        <div className="relative h-screen">
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            src="/data/hotel-video.mp4" // Correct relative path to video in public folder
            autoPlay
            loop
            muted
          />

          {/* Main Content */}
          <div className="text-center text-white relative top-1/2 transform -translate-y-1/2 px-4">
            <h1 className="text-6xl font-bold mb-4">Welcome to URBAN OASIS</h1>
            <p className="text-2xl mb-8">
              Experience luxury and comfort at the best prices.
            </p>
            <button
              onClick={handleButtonClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              GET IN
            </button>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default HomePage;

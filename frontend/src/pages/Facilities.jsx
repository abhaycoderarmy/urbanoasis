
import React from "react";
import "../css/Fcilities.css";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
const Facilities = () => {
  const images = [
    { src: "../../public/data/yashi/bar 1.jpg", text: "Bar" },
    { src: "../../public/data/yashi/gym 1.jpg", text: "Gym" },
    { src: "../../public/data/yashi/parking 1.jpg", text: "Parking" },
    { src: "../../public/data/yashi/spa 1.jpg", text: "Spa" },
    { src: "../../public/data/yashi/swimming.jpg", text: "Swimming" },
    { src: "../../public/data/yashi/facilities.jpg", text: "Conference Room" },
  ];
  

  return (
    <div>
      <Navbar2 color="white" />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Facilities</h1>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img className="facility-img" src={image.src} alt={image.text} />
            <p>{image.text}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Facilities;


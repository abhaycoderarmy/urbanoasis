import React, { useState, useEffect } from 'react';

const About4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "../../public/data/img1.jpg",
    "../../public/data/img2.png",
    "../../public/data/img4.jpg",
    "../../public/data/img5.jpg",
    "../../public/data/img6.jpg",
    "../../public/data/yashi/main.jpg",
    "../../public/data/yashi/bar 1.jpg"
  ];

  const totalImages = images.length;
  const imagesPerSlide = 3; // Show 3 images at a time

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalImages / imagesPerSlide));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(totalImages / imagesPerSlide)) % Math.ceil(totalImages / imagesPerSlide));
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Gallery</h2>
      
      <div className="relative w-full overflow-hidden">
        {/* Images Container */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)`,
            width: `${(totalImages / imagesPerSlide) * 100}%`
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-1/3 px-2">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default About4;

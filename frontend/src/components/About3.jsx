import React from 'react'

const About3 = () => {
  return (
    <div>
       <div className="relative h-screen">
        <img
          src="../../public/data/dining1.jpeg" // Replace with actual dining image
          alt="Dining"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-4xl font-bold mb-4">Dining</h2>
            <p className="text-lg">
              Enjoy a culinary journey with our exquisite dining options. From gourmet dishes to casual meals, our dining experiences are crafted to delight every palate.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About3

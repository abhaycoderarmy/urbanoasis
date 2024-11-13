import React from 'react'

const About2 = () => {
  return (
    <div>
        <div className="flex flex-col md:flex-row py-12 px-4">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="/data/img1.jpg" // Replace with actual image
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 flex items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About URBAN OASIS</h2>
            <p className="text-lg text-gray-600">
              We are a luxury hotel offering world-class services and facilities to make your stay memorable.
              From our elegant rooms to our exceptional dining options, everything is designed to provide the ultimate comfort.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default About2

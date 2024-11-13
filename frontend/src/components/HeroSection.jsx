import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 p-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
        Today's Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Bookings Today</h3>
          <p className="text-2xl font-bold text-blue-500">75</p>
          <p className="text-gray-500">Bookings out of 100</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-500">Rs.50,000</p>
          <p className="text-gray-500">Out of Rs.100,000 target</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Stock Availability</h3>
          <p className="text-2xl font-bold text-yellow-500">85%</p>
          <p className="text-gray-500">In Stock</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

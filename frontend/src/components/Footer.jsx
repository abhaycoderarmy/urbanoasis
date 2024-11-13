import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="container mx-auto flex flex-row justify-between items-start">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-">Urban Oasis</h2>
          <p className="text-sm mb-3">will give you the comfort you deserve</p>
          <p className="text-sm mb-1">Address : Road 12, Peace Avenue, Rajiv Chowk, New Delhi</p>
          <p className="text-sm mb-1">Phone number : +911234567890</p>
          <p className="text-sm">Email: urbanoasis@gmail.com</p>
        </div>
        
        <div className="flex flex-col w-1/3 items-center">
          <p className="hover:text-gray-300 mb-3 text-base">ABOUT US</p>
          <p className="hover:text-gray-300 mb-3 text-base">CONTACT US</p>
          <p className="hover:text-gray-300 mb-3 text-base">ROOMS & RATES</p>
          <p className="hover:text-gray-300 text-base">FACILITIES</p>
        </div>
        
        <div className="flex flex-col w-1/3 items-end">
          <p className="hover:text-gray-300 mb-3 text-base">FACEBOOK</p>
          <p className="hover:text-gray-300 mb-3 text-base">INSTAGRAM</p>
          <p className="hover:text-gray-300 mb-3 text-base">TWITTER</p>
          <p className="hover:text-gray-300 text-base">SNAP CHAT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

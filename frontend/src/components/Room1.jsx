import React from "react";
import room1 from "../assets/arora/room 1.png";

const Room1 = () => {
    console.log("hello3");
    
  return (
    <div
      className=" w-full h-[80vh] bg-cover bg-center m-auto"
      style={{ backgroundImage: `url(${room1})` }}
    >
      <div className="absolute h-[80vh] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold">OUR ROOMS AND PRICES</h1>
        </div>
      </div>
    </div>
  );
};

export default Room1;
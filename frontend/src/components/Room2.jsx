import React from 'react';


import RoomCard3 from '../components/RoomCard3'; // Importing the RoomCard component

import roomsData from "../data/Roomsdata"; // Importing rooms data

const Room2 = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Rooms</h1>
        
        {/* Flexbox Layout */}
        <div className="flex flex-wrap justify-center -mx-4">
          {roomsData.map((room) => (
            <div key={room.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 max-w-md">
              <RoomCard3 room={room} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room2;
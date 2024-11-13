import React from 'react';

const RoomCard3 = ({ room }) => {
    console.log(room);
    
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      {/* Reduce the width of the image */}
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-48 object-cover" // Reduce image height here
      />
      
      {/* Card content */}
      <div className="p-4 flex-1 flex flex-col justify-between text-center">
        <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <p className="text-lg font-semibold">{room.price} / night</p>
      </div>
    </div>

  );
};

export default RoomCard3;
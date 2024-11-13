import React, { useState } from 'react';

const AddRoomForm = ({ onAddRoom }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomTypeId, setRoomTypeId] = useState('');
  const [roomType, setRoomType] = useState('family');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new room object
    const newRoom = {
      roomNumber,
      roomTypeId,
      roomType,
    };

    // Pass the new room to the parent component
    onAddRoom(newRoom);

    // Clear form fields
    setRoomNumber('');
    setRoomTypeId('');
    setRoomType('family');

    alert('Room added');
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
            Room Number
          </label>
          <input 
            type="text" 
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Enter room number"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomTypeId">
            Room Type ID
          </label>
          <input 
            type="text" 
            id="roomTypeId"
            value={roomTypeId}
            onChange={(e) => setRoomTypeId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Enter room type ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomType">
            Room Type
          </label>
          <select
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="family">Family</option>
            <option value="deluxe">Deluxe</option>
            <option value="executive">Executive</option>
            <option value="standard">Standard</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRoomForm;

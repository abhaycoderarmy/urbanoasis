


import React, { useState } from "react";
import axios from "axios";
import CustomCalendar from "./CustomCalander.jsx"; // Import the custom calendar
import { format } from "date-fns"; // Import date-fns for formatting dates
import '../css/AdminPage.css'; // Import custom CSS for additional styling

const AdminPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [roomData, setRoomData] = useState(null);

  const fetchRoomData = async () => {
    if (!selectedDate) return;

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Format the date for the API
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/revenue/${formattedDate}`
      );
      console.log(response.data);
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 to-purple-300 text-black mt-[-24px]">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-gray-800 text-white shadow-md p-4 rounded-b-lg">
        <div className="flex items-center">
          <img
            src="/woman.png" // Placeholder for profile icon
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 mr-2"
          />
          <span className="font-semibold">Manager</span>
        </div>
        <h1 className="text-2xl font-bold text-center flex-1">
          Manager's Dashboard
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto border border-gray-300">
          <h2 className="text-2xl font-bold text-center text-black mb-6">Room Revenue Tracker</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Select Date:
            </label ><CustomCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            <button
              onClick={fetchRoomData}
              className="mt-4 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200 transform hover:scale-105"
            >
              Get Data
            </button>
          </div>
          {roomData && (
            <div className="mt-6 bg-white border border-gray-300 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-black">
                {format(selectedDate, 'yyyy/MM/dd')}
              </h3>
              <p className="text-black">
                Total Bookings:{" "}
                <span className="font-bold">{roomData.totalBookings}</span>
              </p>
              <p className="text-black">
                Total Revenue:{" "}
                <span className="font-bold">{roomData.totalRevenue}</span>
              </p>
              <p className="text-black">
                Occupied Rooms:{" "}
                <span className="font-bold">{roomData.occupiedRooms}</span>
              </p>
              <p className="text-black">
                Available Rooms:{" "}
                <span className="font-bold">{roomData.availableRooms}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
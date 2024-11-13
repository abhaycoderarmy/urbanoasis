import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/UserInfo.jsx";
import GuestsInfo from "../components/GuestsInfo.jsx";
import BookingsInfo from "../components/BookingsInfo.jsx";
import Navbar2 from "../components/Navbar2.jsx";

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user dashboard data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("done here");
        
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/dashboard",
          {
            withCredentials: true,
          }
        );

        const { userInfo, guests, allBookings } = response.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        setGuests(guests);
        setBookings(allBookings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-semibold text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar2 />
      <div className="mx-auto my-8 max-w-7xl px-6">
        <UserInfo userInfo={userInfo} />
        <GuestsInfo guests={guests} />
        <BookingsInfo bookings={bookings} />
      </div>
    </div>
  );
}

export default UserDashboard;

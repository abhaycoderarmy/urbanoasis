import React from 'react';

function BookingsInfo({ bookings }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings Information</h2>
      <div>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found for this user.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="border-b py-4">
              <p><strong className="text-gray-600">Booking ID:</strong> {booking.booking_id}</p>
              <p><strong className="text-gray-600">Room Number:</strong> {booking.room_number}</p>
              <p><strong className="text-gray-600">Room Type:</strong> {booking.room_type}</p>
              <p><strong className="text-gray-600">Status:</strong> {booking.booking_status}</p>
              <p><strong className="text-gray-600">Check-in Date:</strong> {booking.check_in_date}</p>
              <p><strong className="text-gray-600">Check-out Date:</strong> {booking.check_out_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingsInfo;

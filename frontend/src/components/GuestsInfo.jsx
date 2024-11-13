import React from 'react';

function GuestsInfo({ guests }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guests Information</h2>
      <div>
        {guests.length === 0 ? (
          <p className="text-center text-gray-500">No guests found for this user.</p>
        ) : (
          guests.map((guest, index) => (
            <div key={index} className="border-b py-4">
              <p><strong className="text-gray-600">Guest Name:</strong> {guest.first_name} {guest.last_name}</p>
              <p><strong className="text-gray-600">Email:</strong> {guest.email}</p>
              <p><strong className="text-gray-600">Phone Number:</strong> {guest.phone_number}</p>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}

export default GuestsInfo;

import React from 'react';

function UserInfo({ userInfo }) {
    console.log(userInfo);
    
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
      <div className="space-y-4">
        <p><strong className="text-gray-600">User ID:</strong> {userInfo.userId}</p>
        <p><strong className="text-gray-600">Full Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
        <p><strong className="text-gray-600">Email:</strong> {userInfo.email}</p>
        <p><strong className="text-gray-600">Phone Number:</strong> {userInfo.phoneNumber}</p>
      </div>
    </div>
  );
}

export default UserInfo;

// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import AddRoomForm from '../components/AddRoomForm';
// import DeleteRoomForm from '../components/DeleteRoomForm';
// import Dashboard from '../components/Dashboard';  // Import the Dashboard component

// const Admin = () => {
//   const [activePage, setActivePage] = useState('dashboard');  // Default to 'dashboard'
//   const [rooms, setRooms] = useState([]);

//   const handleSidebarClick = (page) => {
//     setActivePage(page);  // Set active page based on sidebar click
//   };

//   const handleAddRoom = (room) => {
//     setRooms((prevRooms) => [...prevRooms, room]);  // Add new room to the room list
//   };

//   const handleDeleteRoom = (roomNumber) => {
//     setRooms((prevRooms) => prevRooms.filter(room => room.roomNumber !== roomNumber));  // Filter out deleted room
//   };

//   return (
//     <div className="flex mt-[-23px]   ">
//       <Sidebar onSidebarClick={handleSidebarClick} />
//       <div className="w-4/5 p-5">
//         {activePage === 'addRoom' && <AddRoomForm onAddRoom={handleAddRoom} />}
//         {activePage === 'deleteRoom' && <DeleteRoomForm onDeleteRoom={handleDeleteRoom} />}
//         {activePage === 'showRooms' && (
//           <div>
//             <h2 className="text-2xl font-bold mb-5">List of Rooms</h2>
//             {rooms.length > 0 ? (
//               <ul>
//                 {rooms.map((room, index) => (
//                   <li key={index} className="p-4 border rounded mb-3 shadow">
//                     <strong>Room Number:</strong> {room.roomNumber} <br />
//                     <strong>Room Type ID:</strong> {room.roomTypeId} <br />
//                     <strong>Room Type:</strong> {room.roomType}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No rooms available.</p>
//             )}
//           </div>
//         )}
//         {activePage === 'dashboard' && <Dashboard />}  {/* Show the dashboard component */}
//       </div>
//     </div>
//   );
// };

// export default Admin;

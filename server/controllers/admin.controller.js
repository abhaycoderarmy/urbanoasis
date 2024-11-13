// const { withTransaction } = require('../config/db');

// async function getDailyRevenue(req, res) {
//   const { date } = req.params; 
//   console.log(date);
  
//   try {
//     const result = await withTransaction(async (connection) => {
//       // Query to get total revenue, number of bookings, occupied rooms, and available rooms for the specified date
//       const [results] = await connection.query(`
//         SELECT 
//             COUNT(b.booking_id) AS total_bookings,
//             SUM(b.total_amount) AS total_revenue,
//             (SELECT COUNT(*) FROM Rooms WHERE status = 'occupied') AS occupied_rooms,
//             (SELECT COUNT(*) FROM Rooms WHERE status = 'available') AS available_rooms
//         FROM 
//             Bookings b
//         WHERE 
//             DATE(b.check_in_date) = ? 
//             AND b.payment_status = 'paid'
//       `, [date]);

//       return results;
//     });

//     console.log('Query results:', result); // Log query results

//     if (result.length === 0) {
//       return res.status(200).json({ totalBookings: 0, totalRevenue: 0, occupiedRooms: 0, availableRooms: 0 });
//     }

//     res.status(200).json({
//       totalBookings: result[0].total_bookings || 0,
//       totalRevenue: result[0].total_revenue || 0,
//       occupiedRooms: result[0].occupied_rooms || 0,
//       availableRooms: result[0].available_rooms || 0,
//     });
//   } catch (error) {
//     console.error('Error fetching revenue data:', error); // Log the error
//     res.status(500).json({ message: 'Server error', error });
//   }
// }

// module.exports = getDailyRevenue;

const { withTransaction } = require('../config/db');

async function getDailyRevenue(req, res) {
    const { date } = req.params; 
    console.log("Selected Date:", date);
    
    try {
        const result = await withTransaction(async (connection) => {
            // Query to calculate total bookings, total revenue
            const [bookingData] = await connection.query(`
                SELECT 
                    COUNT(b.booking_id) AS total_bookings,
                    SUM(b.total_amount) AS total_revenue
                FROM 
                    Bookings b
                WHERE 
                    DATE(b.check_in_date) = ? 
                    AND b.payment_status = 'paid'
            `, [date]);

            // Query to get occupied rooms
            const [occupiedRoomsData] = await connection.query(`
                SELECT COUNT(DISTINCT room_id) AS occupied_rooms
                FROM Bookings
                WHERE ? BETWEEN check_in_date AND check_out_date
            `, [date]);

            // Query to get available rooms
            const [availableRoomsData] = await connection.query(`
                SELECT COUNT(*) AS available_rooms
                FROM Rooms r
                WHERE r.room_id NOT IN (
                    SELECT room_id
                    FROM Bookings
                    WHERE ? BETWEEN check_in_date AND check_out_date
                )
            `, [date]);

            // Combine results
            return {
                totalBookings: bookingData[0]?.total_bookings || 0,
                totalRevenue: bookingData[0]?.total_revenue || 0,
                occupiedRooms: occupiedRoomsData[0]?.occupied_rooms || 0,
                availableRooms: availableRoomsData[0]?.available_rooms || 0
            };
        });

        console.log('Query Results:', result);

        // Send response
        res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching revenue data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = getDailyRevenue;
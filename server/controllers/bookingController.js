// controllers/bookingController.js
const BookingModel = require('../models/bookingModel');
const { db, withTransaction } = require('../config/db');
const NotificationService = require('../services/notificationService');

const BookingController = {
    // Fetch room types from the database
    async fetchRoomTypes(req, res) {
        try {
            const roomTypes = await BookingModel.getRoomTypes();
            res.json(roomTypes);
        } catch (error) {
            console.error("Error in fetchRoomTypes:", error);
            res.status(500).json({ message: "Error fetching room types", error: error.message });
        }
    },

    // Create a new booking with guest and booking data
    async createBooking(req, res) {
        try {
            const { guestData, bookingData } = req.body;

            if (!guestData || !bookingData) {
                return res.status(400).json({ message: "Invalid data: guestData and bookingData are required." });
            }

            const result = await BookingModel.createBooking(guestData, bookingData);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in createBooking:", error.message);
            res.status(500).json({ message: "Error creating booking", error: error.message });
        }
    },

    // Get booking details by booking ID, along with guest name and room price
    
    async getBookingDetails(req, res)  {
        const { bookingId } = req.params;
        try {
            const [bookings] = await db.query(`
                SELECT 
                    b.booking_id, b.check_in_date, b.check_out_date, 
                    b.total_amount, b.payment_status,
                    g.first_name, g.last_name, g.email, g.phone_number,
                    r.room_number, rt.type_name as room_type
                FROM Bookings b
                JOIN Guests g ON b.guest_id = g.guest_id
                JOIN Rooms r ON b.room_id = r.room_id
                JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id
                WHERE b.booking_id = ?
            `, [bookingId]);
    
            if (bookings.length === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
    
            const booking = bookings[0];
            res.json({
                bookingId: booking.booking_id,
                firstName: booking.first_name,
                lastName: booking.last_name,
                email: booking.email,
                phoneNumber: booking.phone_number,
                roomNumber: booking.room_number,
                roomType: booking.room_type,
                checkInDate: booking.check_in_date,
                checkOutDate: booking.check_out_date,
                totalAmount: booking.total_amount,
                paymentStatus: booking.payment_status
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching booking details", error: error.message });
        }
    },

    // Update payment status and record payment details
    async updatePaymentStatus(req, res) {
        const { bookingId } = req.params;
        const { paymentStatus, paymentId, amount, paymentMethod } = req.body;
    
        try {
            const result = await withTransaction(async (db) => {
                // Existing payment processing code...
                const [existingPayment] = await db.query(
                    'SELECT payment_id FROM Payments WHERE payment_id = ?',
                    [paymentId]
                );
    
                if (existingPayment.length > 0) {
                    throw new Error('Payment already processed');
                }
    
                // Insert into Payments table
                const [paymentResult] = await db.query(
                    `INSERT INTO Payments (
                        booking_id, 
                        payment_id, 
                        payment_date, 
                        amount, 
                        payment_method, 
                        payment_status
                    ) VALUES (?, ?, NOW(), ?, ?, ?)`,
                    [bookingId, paymentId, amount, paymentMethod, paymentStatus]
                );
    
                // Update Bookings table
                const [bookingResult] = await db.query(
                    `UPDATE Bookings SET payment_status = ? WHERE booking_id = ?`,
                    [paymentStatus, bookingId]
                );
    
                if (bookingResult.affectedRows === 0) {
                    throw new Error('Booking not found');
                }
    
                // Fetch complete booking details for notifications
                const [bookingDetails] = await db.query(`
                    SELECT 
                        b.booking_id, b.check_in_date, b.check_out_date,
                        g.first_name, g.last_name, g.email, g.phone_number,
                        r.room_number, rt.type_name as room_type
                    FROM Bookings b
                    JOIN Guests g ON b.guest_id = g.guest_id
                    JOIN Rooms r ON b.room_id = r.room_id
                    JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id
                    WHERE b.booking_id = ?
                `, [bookingId]);
    
                const booking = bookingDetails[0];
                const payment = {
                    paymentId,
                    amount,
                    paymentMethod,
                    paymentStatus
                };
                console.log(booking);
                console.log(payment);
    
                // Send notifications asynchronously
                NotificationService.sendAllNotifications(booking, payment)
                    .then(success => {
                        if (!success) {
                            console.warn('Some notifications failed to send for booking:', bookingId);
                        }
                    })
                    .catch(error => {
                        console.error('Error sending notifications:', error);
                    });
    
                return {
                    message: "Payment updated successfully",
                    bookingId: bookingId,
                    paymentId: paymentId,
                    transactionId: paymentResult.insertId
                };
            });
    
            res.status(200).json(result);
        } catch (error) {
            console.error("Error in updatePaymentStatus:", error.message);
            res.status(500).json({ 
                message: "Error updating payment status", 
                error: error.message 
            });
        }
    },
    // New endpoint for payment details
    async getPaymentDetails(req, res) {
        const { bookingId } = req.params;
        try {
            // Verify booking exists first
            const [bookings] = await db.query(
                'SELECT booking_id FROM Bookings WHERE booking_id = ?',
                [bookingId]
            );

            if (bookings.length === 0) {
                return res.status(404).json({ 
                    message: "Booking not found" 
                });
            }

            // Get payment details
            const [payments] = await db.query(
                `SELECT 
                    payment_record_id,
                    booking_id,
                    payment_id,
                    payment_date,
                    amount,
                    payment_method,
                    payment_status
                FROM Payments 
                WHERE booking_id = ? 
                ORDER BY payment_date DESC 
                LIMIT 1`,
                [bookingId]
            );

            if (payments.length === 0) {
                return res.status(404).json({ 
                    message: "Payment not found for this booking" 
                });
            }

            // Return formatted payment details
            res.json({
                payment_id: payments[0].payment_id,
                payment_date: payments[0].payment_date,
                payment_method: payments[0].payment_method,
                amount: payments[0].amount,
                payment_status: payments[0].payment_status
            });
        } catch (error) {
            console.error("Error in getPaymentDetails:", error);
            res.status(500).json({ 
                message: "Error fetching payment details", 
                error: error.message 
            });
        }
    }
};

module.exports = BookingController;

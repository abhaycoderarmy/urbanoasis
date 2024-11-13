const express = require('express');
const BookingController = require('../controllers/bookingController');
const { verifyPayment } = require('../controllers/paymentVerificationController');
const router = express.Router();

// Route to fetch room types
router.get('/room-types', BookingController.fetchRoomTypes);

// Route to create a new booking
router.post('/', BookingController.createBooking);

// Route to get booking details by booking ID
router.get('/:bookingId', BookingController.getBookingDetails);

// Route to update payment status by booking ID
router.put('/:bookingId/payment', BookingController.updatePaymentStatus);

router.get('/payments/:bookingId', BookingController.getPaymentDetails);

router.get('/verify-payment/:paymentId', verifyPayment);

module.exports = router;

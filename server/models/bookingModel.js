const { db } = require("../config/db");

const BookingModel = {
  async getRoomTypes() {
    try {
      const [roomTypes] = await db.query("SELECT * FROM RoomTypes");
      return roomTypes;
    } catch (error) {
      throw new Error("Error fetching room types: " + error.message);
    }
  },

  async createBooking(guestData, bookingData) {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        idType,
        idNumber,
        dob,
      } = guestData;
      const { checkInDate, checkOutDate, roomId } = bookingData;
      console.log(guestData, bookingData);

      const formattedDateOfBirth = new Date(dob);
      const formattedCheckInDate = new Date(checkInDate);
      const formattedCheckOutDate = new Date(checkOutDate);
      console.log(formattedCheckInDate, formattedCheckOutDate, formattedDateOfBirth);
      
      const roomTypeInt = parseInt(roomId, 10);

      // Get room price from Rooms table
      const [roomDetails] = await db.query(
        "SELECT room_id, price_per_night FROM Rooms WHERE room_type_id = ? AND status = 'available' LIMIT 1",
        [roomTypeInt]
      );

      if (!roomDetails || roomDetails.length === 0) {
        throw new Error("No available rooms of this type found");
      }

      const pricePerNight = roomDetails[0].price_per_night;
      const selectedRoomId = roomDetails[0].room_id;
      
      // Calculate number of nights
      const numberOfNights = Math.ceil(
        (formattedCheckOutDate - formattedCheckInDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate total amount
      const totalAmount = numberOfNights * pricePerNight;

      // Check if guest already exists
      const [existingGuest] = await db.query(
        "SELECT guest_id FROM Guests WHERE email = ?",
        [email]
      );

      let guestId;
      if (existingGuest.length > 0) {
        guestId = existingGuest[0].guest_id;
      } else {
        const [guestResult] = await db.query(
          "INSERT INTO Guests (first_name, last_name, email, phone_number, address, ID_TYPE, ID_number, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            idType,
            idNumber,
            formattedDateOfBirth,
          ]
        );
        guestId = guestResult.insertId;
      }

      // Begin transaction
      await db.query('START TRANSACTION');

      try {
        // Update room status to occupied
        await db.query(
          "UPDATE Rooms SET status = 'occupied' WHERE room_id = ?",
          [selectedRoomId]
        );

        // Insert booking data with correct total amount and actual room_id
        const [bookingResult] = await db.query(
          "INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, booking_status, total_amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            guestId,
            selectedRoomId,
            formattedCheckInDate,
            formattedCheckOutDate,
            "confirmed",
            totalAmount,
            "unpaid",
          ]
        );

        // Commit transaction
        await db.query('COMMIT');

        // Get booking details for response
        const [bookingDetails] = await db.query(
          `SELECT b.*, r.room_number, r.price_per_night, r.description
           FROM Bookings b
           JOIN Rooms r ON b.room_id = r.room_id
           WHERE b.booking_id = ?`,
          [bookingResult.insertId]
        );

        return {
          message: "Booking created successfully",
          bookingId: bookingResult.insertId,
          bookingDetails: bookingDetails[0]
        };

      } catch (error) {
        // Rollback transaction in case of error
        await db.query('ROLLBACK');
        throw error;
      }

    } catch (error) {
      throw new Error("Error creating booking: " + error.message);
    }
  },
};

module.exports = BookingModel;
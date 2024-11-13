// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Fetch Room Types
export const fetchRoomTypes = async () => {
    try {
        const response = await api.get('/bookings/room-types');
        console.log(response.data); // Check if data is correctly structured
        return response.data; // Make sure response.data is an array of room types
    } catch (error) {
        console.error("Error fetching room types:", error);
        throw error;
    }
};

// Create Booking
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};
// Fetch Booking Details by ID
export const fetchBookingDetails = async (bookingId) => {
    try {
        const response = await api.get(`/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw error;
    }
};

// const express = require('express');
// const registerUser = require('../controllers/user.controller.js');
// const loginUser = require('../controllers/user.controller.js');
// const logoutUser = require('../controllers/user.controller.js');
// const getUserDashboard = require('../controllers/user.controller.js');
// // import { ApiResponse } from '../utils/ApiResponse.js'

// // import { registerUser, loginUser ,logoutUser, getUserDashboard} from '../controllers/user.controller.js';


// const isAuthenticated = require('../middlewares/isAuthenticated.middleware.js');
// // import { createBooking } from '../controllers/booking.controller.js';
// // import { getBookingDetails } from '../controllers/confirmation.controller.js';
// // import { makePayment } from '../controllers/payment.controller.js';
// const Userrouter = express.Router();


// // Route to register a new user
// Userrouter.post('/register', registerUser);
// Userrouter.post('/login', loginUser);
// Userrouter.get('/logout', isAuthenticated, logoutUser);
// Userrouter.get('/isAuthenticated', isAuthenticated);
// // Userrouter.post('/booking', isAuthenticated,createBooking);
// // Userrouter.get('/booking/:bookingId', isAuthenticated,getBookingDetails);
// // Userrouter.post('/payment', isAuthenticated,makePayment);
// Userrouter.get('/dashboard', isAuthenticated,getUserDashboard);

// module.exports = Userrouter;


const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDashboard } = require('../controllers/user.controller.js');
const isAuthenticated = require('../middlewares/isAuthenticated.middleware.js');

const Userrouter = express.Router();

// Route to register a new user
Userrouter.post('/register', registerUser);
Userrouter.post('/login', loginUser);
Userrouter.get('/logout', isAuthenticated, logoutUser);
Userrouter.get('/isAuthenticated', isAuthenticated);
Userrouter.get('/dashboard', isAuthenticated, getUserDashboard);

module.exports = Userrouter;

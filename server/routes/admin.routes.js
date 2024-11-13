// routes/admin.routes.js

const express = require('express');
const getDailyRevenue = require('../controllers/admin.controller.js');
console.log("i am here");

const Adminrouter = express.Router();

// Route to get daily revenue and bookings
Adminrouter.get('/revenue/:date', getDailyRevenue);
module.exports = Adminrouter;
const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
const cookieParser = require('cookie-parser');
const AdminRouter = require('./routes/admin.routes.js');
const UserRouter = require('./routes/user.routes.js');
const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser())

// Booking routes
app.use('/api/bookings', bookingRoutes);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/admin", AdminRouter); // Add 
// app.use(paymentRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


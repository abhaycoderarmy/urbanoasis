const bcryptjs = require('bcryptjs');
const db = require('../config/db');
const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        if (!(firstName && lastName && email && phoneNumber && password)) {
            throw new ApiError(400, "All the fields are required ")

        }
        const hashedPassword = await bcryptjs.hash(password, 10);


        const query = 'INSERT INTO Users (userId,firstName,lastName,email,phoneNumber,password) VALUES (?,?,?,?,?,?);'


        const userId = `US${Date.now()}`;
        const connection = await db();
        const [result] = await connection.execute(query, [userId, firstName, lastName, email, phoneNumber, hashedPassword]);



        return res.status(201).json(
            new ApiResponse(201, { result }, "Successfully user registered")

        )
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body


        if (!(email && password)) {
            throw new ApiError(402, "All the fields are required ")

        }

        const emailFindQuery = 'SELECT * FROM Users WHERE email = (?)'
        const connection = await db();

        const [result] = await connection.execute(emailFindQuery, [email]);
        // console.log(result);
        
        if (!result[0]) {
            throw new ApiError(402, "User does not exists")
        }

        const storedPassword = result[0].password
        const isValid = await bcryptjs.compare(password, storedPassword)

        if (isValid) {

            const tokenData = {
                email: email
            }

            const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            })

            return res.status(200).json(new ApiResponse(200, { result }, "User Logged In Succefully"))

        }
        else {
            throw new ApiResponse(400, { result }, "Invalid Credentials")
        }


    } catch (error) {
        return res.status(400).json({
            statuscode: error.statuscode,
            message: error.message
        })

    }
}


const logoutUser = async (req, res) => {
    try {

        
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out succesfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message: "Error occured while logging out the user",
            success: false

        })

    }
}

const getUserDashboard = async (req, res) => {
    try {
        const email = req.email;
        console.log("email", email);

       

        // Connect to the database
        const connection = await db();
        const userRows = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);

        const user = userRows[0][0];


        console.log(user);


        // Find guests information by email
        const emailFindQuery = 'SELECT * FROM Guests WHERE email = ?';
        const [guests] = await connection.execute(emailFindQuery, [email]);

        // Here i will store all the bookings done by the user
        const allBookings = [];
        if (guests.length === 0) {
            return res.status(200).json({
                message: "No guests found for this user.",
                userInfo:user,
                guests,
                allBookings,
            }
            );
        }

        // Find all bookings associated with the guest ID
        const bookingsQuery = `
            SELECT 
                b.booking_id,
                b.check_in_date,
                b.check_out_date,
                b.booking_status,
                r.room_number,
                rt.type_name AS room_type
            FROM 
                Bookings b
            JOIN 
                Rooms r ON b.room_id = r.room_id
            JOIN 
                RoomTypes rt ON r.room_type_id = rt.room_type_id
            WHERE 
                b.guest_id = ?;
        `;

        // storing all the bookings done by the user

        for (const guest of guests) {
            const [bookingsRows] = await connection.execute(bookingsQuery, [guest.guest_id]);
            allBookings.push(bookingsRows[0]);
        }
        // Close the database connection
        await connection.end();
       

        // Structure the response
        res.json({
            userInfo: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            guests,
            allBookings
        });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { registerUser, loginUser, logoutUser, getUserDashboard };
const jwt = require('jsonwebtoken');

// check if user is authenticated or not
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
      

        if (!token) {

            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            })
        }

        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decodedToken) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }


        req.email = decodedToken.email;


        
        // if sirf authentication check krne h so ye wali condition run hogii 
        if (req.path === "/isAuthenticated") {
            return res.status(200).json({ success: true, message: "SignUp or Login before booking" });
        }
        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while authentication try again",
            success: false
        })
    }
}

module.exports = isAuthenticated;
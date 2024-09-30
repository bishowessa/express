const jwt = require('jsonwebtoken');
const errorHandler = require('../utilities/errorHandler');
const responseMsgs = require('../utilities/responseMsgs');


const userMiddleware =  (req, res, next) => {

    try{
        let token = req.cookies?.jwt

        if(!token){
            return res.status(401).json({
                status : responseMsgs.FAIL,
                data : message = "You are not logged in"
            })
        }

        const decoded = jwt.verify(token, 'process.env.JWTKEY')
        req.user = decoded
        next()

    }catch(err){
        res.status(401).json({
            status : responseMsgs.FAIL,
            data : err
        })
    }

}

module.exports = userMiddleware


// const jwt = require('jsonwebtoken');
// const errorHandler = require('../utilities/errorHandler');
// const responseMsgs = require('../utilities/responseMsgs');
// const dotenv = require('dotenv').config();

// const userMiddleware = (req, res, next) => {
//     try {
//         let token = req.cookies?.jwt;

//         if (!token) {
//             return res.status(401).json({
//                 status: responseMsgs.FAIL,
//                 data: { message: "You are not logged in" }
//             });
//         }

//         // Log the secret key for debugging purposes
//         console.log("JWT Secret Key:", process.env.JWTKEY);

//         jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
//             if (err) {
//                 console.error("JWT verification error:", err.message);
//                 throw res.status(401).json({
//                     status: responseMsgs.FAIL,
//                     data: { message: err.message }
//                 });
//             }
//             console.log("JWT verified successfully:", decoded);
//             next();
//         });
//     } catch (err) {
//         console.error("Middleware error:", err.message);
//         res.status(401).json({
//             status: responseMsgs.FAIL,
//             data: { message: errorHandler(err) }
//         });
//     }
// };

// module.exports = userMiddleware;
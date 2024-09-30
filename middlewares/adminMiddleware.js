const responseMsgs = require('../utilities/responseMsgs'); // Ensure this import is correct

const adminMiddleware = (req, res, next) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(401).json({
                status: responseMsgs.FAIL,
                data: "Access denied"
            });
        }
        next();
    } catch (err) {
        res.status(401).json({
            status: responseMsgs.FAIL,
            data: err.message || "An error occurred"
        });
    }
};

module.exports = adminMiddleware;
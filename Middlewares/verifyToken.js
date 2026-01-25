/*const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // أهم سطر
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};*/

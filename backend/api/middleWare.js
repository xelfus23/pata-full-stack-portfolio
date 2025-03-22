import { User } from "../models/userModel";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        // Fetch the user from the database to confirm existence
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid token: User not found" });
        }

        req.user = user; // Attach user to request
        next(); // Proceed
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
    });
};

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    };
};

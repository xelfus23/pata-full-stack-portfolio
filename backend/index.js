import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/userModel.js";
import { Message } from "./models/messageModel.js";
import { Chat } from "./models/chatModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Instruction } from "./models/instructionsModel.js";
import { body, validationResult } from "express-validator"; // For input validation
import rateLimit from "express-rate-limit"; // For rate limiting

dotenv.config();
const app = express();
app.use(express.json());

// --------------------------------------------------------------------------
// CORS Configuration - Be specific about allowed origins in production
// --------------------------------------------------------------------------

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

// app.use(cors());

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                // Allow requests with no origin (like mobile apps)
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const PORT = process.env.PORT || 4040;
const MONGODB = process.env.MONGODB_URL;
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

if (!MONGODB) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

// --------------------------------------------------------------------------
// Rate Limiting - Protect against abuse
// --------------------------------------------------------------------------

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message:
        "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter); // Apply to all routes.  You can apply to specific routes if needed.

// --------------------------------------------------------------------------
// JWT Functions
// --------------------------------------------------------------------------

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        // Include role in token
        expiresIn: "1h",
    });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "No token provided or invalid token format." });
    }

    const token = authHeader.substring(7);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role; // Add user role to the request
        next();
    });
};

// --------------------------------------------------------------------------
// Admin Role Check Middleware
// --------------------------------------------------------------------------

const isAdmin = (req, res, next) => {
    if (req.userRole === "admin") {
        next();
    } else {
        return res
            .status(403)
            .json({ message: "Unauthorized: Admin access required." });
    }
};

// --------------------------------------------------------------------------
// Gemini Instructions API
// --------------------------------------------------------------------------

app.get("/api/get-gemini-instructions", async (req, res) => {
    try {
        const activeInstructions = await Instruction.findOne({
            active: true,
        }).sort({ version: -1 });

        if (!activeInstructions) {
            return res
                .status(404)
                .json({ message: "No active Gemini instructions found" });
        }

        res.status(200).json({
            instructionString: activeInstructions.instructionString,
            version: activeInstructions.version,
        });
    } catch (error) {
        console.error("Error fetching instructions:", error);
        res.status(500).json({
            message: "Failed to fetch Gemini instructions",
        });
    }
});

app.post(
    "/api/create-gemini-instructions",
    verifyToken, // Authentication required
    isAdmin, // Admin role required
    [
        // Input validation using express-validator
        body("instructionString")
            .notEmpty()
            .withMessage("Instruction string is required"),
        body("version")
            .isInt({ min: 1 })
            .withMessage("Version must be a positive integer"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { instructionString, version } = req.body;

            await Instruction.updateMany({ active: true }, { active: false });

            const newInstruction = new Instruction({
                instructionString: instructionString,
                version: version,
                active: true,
            });

            const savedInstruction = await newInstruction.save();

            res.status(201).json({
                message: "Instructions created and activated.",
                instruction: savedInstruction,
            });
        } catch (err) {
            console.error("Error creating/updating instruction:", err);
            res.status(500).json({
                message: "Failed to create/update instructions",
            });
        }
    }
);

// --------------------------------------------------------------------------
// User Authentication API
// --------------------------------------------------------------------------

app.post(
    "/signup",
    [
        body("username")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, password } = req.body;

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res
                    .status(409)
                    .json({ message: "Username already taken." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                password: hashedPassword,
                role: "student", // Default role
            });

            const user = await User.create(newUser);

            const token = generateToken(user);

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                }, // Include role
                token,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Server error during registration: " + err.message,
            });
        }
    }
);

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Missing username or password." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, username: user.username, role: user.role }, // Include role
            token,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error during login: " + err.message });
    }
});

// User Update (Edit Profile) - Requires Authentication
app.put("/users/:id", verifyToken, async (req, res) => {
    try {
        if (req.userId !== req.params.id) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update this profile" });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error during user update: " + err.message,
        });
    }
});

// Get all users (Admin only)
app.get("/users", verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "username _id role"); // Include role
        return res.status(200).json({ message: users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server Error" + err.message });
    }
});

// --------------------------------------------------------------------------
// Message Handling API
// --------------------------------------------------------------------------

app.post(
    "/messages",
    verifyToken, // Authentication required
    [
        // Input validation
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("message").notEmpty().withMessage("Message is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userId = req.userId; // The ID of the authenticated user

            const newMessage = {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                company: req.body.company,
                userId: userId, // Store the user ID with the message
            };

            const message = await Message.create(newMessage);
            return res.status(201).send(message);
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: "Server Error" + err.message });
        }
    }
);

app.delete("/messages/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Message.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res
            .status(200)
            .json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// --------------------------------------------------------------------------
// Chat Session API
// --------------------------------------------------------------------------

app.post("/sessions", verifyToken, async (req, res) => {
    try {
        const userId = req.userId || null; // Use req.userId from token
        const newSession = new Chat({
            userId,
            title: req.body.title || "New Conversation",
            messages: [],
        });

        const session = await newSession.save();
        return res.status(201).json({
            message: "Session created successfully",
            session,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Error creating session: " + err.message });
    }
});

app.post("/chats", verifyToken, async (req, res) => {
    try {
        // 1. Fetch the Gemini instructions directly
        let modelInstructions;
        try {
            const activeInstructions = await Instruction.findOne({
                active: true,
            }).sort({ version: -1 });

            if (!activeInstructions) {
                return res.status(400).send({
                    message:
                        "No active Gemini instructions found. Please set up instructions first.",
                });
            }

            modelInstructions = activeInstructions.instructionString;
        } catch (error) {
            console.error("Error fetching instructions:", error);
            return res.status(500).send({
                message:
                    "Failed to fetch Gemini instructions from the database.",
            });
        }

        console.log("Model Instructions:", modelInstructions);

        if (!modelInstructions) {
            return res.status(400).send({
                message: "An error occurred. Please try again later.",
            });
        }

        // 2.  Now that you have the instructions, create the Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: modelInstructions,
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        if (!req.body.message) {
            return res.status(400).send({ message: "Invalid Submission" });
        }

        // Get or create session
        let chatSession;
        if (req.body.sessionId) {
            // Find existing session
            chatSession = await Chat.findById(req.body.sessionId);
            if (!chatSession) {
                return res
                    .status(404)
                    .json({ message: "Chat session not found" });
            }
        } else {
            // Create new session if no sessionId provided
            chatSession = new Chat({
                userId: req.userId || null,
                title: "New Conversation",
            });
            await chatSession.save();
        }

        // Add user message to session
        const userMessage = {
            role: req.body.role || "user",
            message: req.body.message,
            timestamp: new Date(),
        };

        chatSession.messages.push(userMessage);
        await chatSession.save();

        // Get Gemini response
        const geminiChatSession = model.startChat({
            generationConfig,
            history: chatSession.messages.map((m) => ({
                role: m.role === "model" ? "model" : "user",
                parts: [{ text: m.message }],
            })),
        });

        const result = await geminiChatSession.sendMessage(req.body.message);
        const modelResponse = result.response.text();

        // Add model message to session
        const modelMessage = {
            role: "model",
            message: modelResponse,
            timestamp: new Date(),
        };

        chatSession.messages.push(modelMessage);
        await chatSession.save();

        // Return the updated session with both messages
        return res.status(200).json({
            sessionId: chatSession._id,
            messages: [userMessage, modelMessage],
            fullSession: chatSession,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
});

// Get all sessions for a user
app.get("/sessions", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const filter = userId ? { userId } : {};

        const sessions = await Chat.find(filter)
            .sort({ updatedAt: -1 }) // Sort by most recent
            .select("-messages"); // Exclude message content for performance

        return res.status(200).json(sessions);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Error retrieving sessions: " + err.message });
    }
});

// Get all messages for a session
app.get("/sessions/:sessionId", verifyToken, async (req, res) => {
    try {
        const session = await Chat.findById(req.params.sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        return res.status(200).json(session);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Error retrieving session: " + err.message });
    }
});

// --------------------------------------------------------------------------
// Database Connection and Server Start
// --------------------------------------------------------------------------

mongoose
    .connect(MONGODB, {
        dbName: "my-database",
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import { User } from "./models/userModel.js";
import { Message } from "./models/messageModel.js";
import { Chat } from "./models/chatModel.js";
import { modelInstructions } from "./modelInstructions.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/*{
    origin: ["https://patrick-web.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
}*/

const PORT = process.env.PORT || 5454; // Provide a default port
const MONGODB = process.env.MONGODB_URL;
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

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

if (!MONGODB) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
    });
};

// ** 1. User Registration (Signup) **
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Missing username or password." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken." }); // 409 Conflict
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const user = await User.create(newUser);

        const token = generateToken(user);

        return res.status(201).json({
            message: "User registered successfully",
            user: { _id: user._id, username: user.username },
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error during registration: " + err.message,
        });
    }
});

// ** 2. User Login **
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
            return res.status(401).json({ message: "Invalid credentials." }); // 401 Unauthorized
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, username: user.username },
            token,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error during login: " + err.message });
    }
});

// ** 3. User Update (Edit Profile) - Requires Authentication **
// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]; // Or however you send the token

    if (!token) {
        return res.status(403).json({ message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.userId = decoded.id; // Add user ID to the request
        next(); // Proceed to the next middleware/route handler
    });
};

app.put("/users/:id", verifyToken, async (req, res) => {
    //:id - is the user ID
    try {
        if (req.userId !== req.params.id) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update this profile" });
        }

        // Hash the new password if it's being updated
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return the updated document
                runValidators: true, // Ensure schema validation is run
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

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).send({ message: users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Server Error" + err.message,
        });
    }
});

app.post("/messages", async (req, res) => {
    try {
        if (!req.body.name || !req.body.message || !req.body.email) {
            res.status(400).send({
                message: "Invalid Submission",
            });
        }

        const newMessage = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            company: req.body.company,
        };

        const message = await Message.create(newMessage);
        return res.status(201).send(message);
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Server Error" + err.message,
        });
    }
});

app.delete("/messages/:id", async (req, res) => {
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

app.post("/sessions", async (req, res) => {
    try {
        const userId = req.body.userId || null; // Optional - can be null for anonymous users

        const newSession = new Chat({
            userId,
            title: req.body.title || "New Conversation",
            messages: [], // Start with empty messages
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

// Update your existing endpoint to add messages to a session
app.post("/chats", async (req, res) => {
    try {
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
                userId: req.body.userId || null,
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

// Get all messages for a session
app.get("/sessions/:sessionId", async (req, res) => {
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

// Get all sessions for a user
app.get("/sessions", async (req, res) => {
    try {
        const userId = req.query.userId;
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

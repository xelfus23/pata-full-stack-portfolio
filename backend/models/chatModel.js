// models/chatModel.js
import mongoose from "mongoose";

// Message schema (for individual messages in a session)
const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ["user", "model", "system"], // Restrict to valid roles
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Chat Session Schema
const chatSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false, // Optional to allow anonymous sessions
        },
        title: {
            type: String,
            default: "New Conversation",
        },
        messages: [messageSchema], // Array of message objects
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

export const Chat = mongoose.model("Chat", chatSessionSchema);

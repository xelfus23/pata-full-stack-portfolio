// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true, // Removes whitespace from both ends of a string
            lowercase: true, // Converts the string to lowercase
            minlength: 3, // Minimum length of 3 characters
            maxlength: 50, // Maximum length of 50 characters
            match: [/^[a-zA-Z0-9_]+$/],
        },
        password: {
            type: String,
            required: true,
            minlength: 8, // Good practice to enforce a minimum password length
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export const User = mongoose.model("User", userSchema);

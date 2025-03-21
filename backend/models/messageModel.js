import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);

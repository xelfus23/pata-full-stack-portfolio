import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema(
    {
        instructionString: {
            type: String,
            required: true,
        },
        version: {
            type: Number,
            default: 1,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Instruction = mongoose.model(
    "Instruction",
    instructionSchema,
    "gemini_instructions"
);

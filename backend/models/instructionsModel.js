import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
    instructionString: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Instruction = mongoose.model(
    "Instruction",
    instructionSchema,
    "gemini_instructions"
);

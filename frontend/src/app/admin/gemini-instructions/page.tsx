"use client";

import PrimaryButton from "@/components/ui/button/primaryButton";
import SecondaryButton from "@/components/ui/button/secondaryButton";
import { URL } from "@/constant/url";
import axios from "axios";
import { useEffect, useState } from "react";

const InstructionsPage: React.FC = () => {
    const [instructions, setInstructions] = useState<string | null>(null); // State to store instructions
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [createInstructionsInput, setCreateInstructionsInput] = useState("");
    const [editInstructionsInput, setEditInstructionsInput] = useState("");
    const [version, setVersion] = useState("");
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = async () => {
        const newInstructions = {
            instructionString: createInstructionsInput,
            version: version,
        };

        try {
            const res = await axios.post(
                `${URL}/api/create-gemini-instructions`,
                newInstructions
            );

            console.log("RESPONSE", res.data);
        } catch (err) {
            console.error("Error creating instructions:", err);
        }
    };

    useEffect(() => {
        const fetchInstructions = async () => {
            setLoading(true); // Start loading

            try {
                const response = await axios.get(
                    `${URL}/api/get-gemini-instructions`
                );

                // Check if the request was successful (status code 200-299)
                if (response.status >= 200 && response.status < 300) {
                    setInstructions(response.data.instructionString); // Assuming your API returns { instructionString: "..." }
                } else {
                    console.log("error", response.status);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                // It's good practice to type the error
                console.error("Error fetching instructions:", err);
                console.log(err.message || "An unexpected error occurred."); // Use err.message if available
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchInstructions();
    }, []);

    if (loading) {
        return <div>Loading instructions...</div>; // Or a more sophisticated loading indicator
    }

    return (
        <div className="w-full p-4">
            <div className="flex flex-col space-y-5">
                <h2 className="text-xl font-semibold mb-2">Instructions:</h2>

                <div>
                    <PrimaryButton
                        label="Create"
                        onClick={() => console.log("")}
                        type="button"
                    />
                </div>
                <textarea
                    className="border-1 border-secondary/20 p-4 rounded-md font-mono"
                    value={createInstructionsInput}
                    onChange={(e) => setCreateInstructionsInput(e.target.value)}
                    rows={10}
                />
                <div className="space-x-4">
                    <SecondaryButton
                        label={editMode ? "Cancel" : "Edit Instructions"}
                        onClick={() =>
                            editMode ? setEditMode(false) : setEditMode(true)
                        }
                        type="button"
                    />
                    {editMode && (
                        <PrimaryButton
                            label="Save"
                            onClick={handleSubmit}
                            type="button"
                        />
                    )}
                </div>
                <p>Current Version: {version}</p>
                <div>
                    <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                    />
                </div>

                {instructions ? (
                    <textarea
                        className="border-1 p-4 rounded-md"
                        value={editInstructionsInput}
                        onChange={(e) =>
                            setEditInstructionsInput(e.target.value)
                        }
                        rows={10}
                        disabled={!editMode}
                    /> // Use whitespace-pre-line to preserve line breaks from the API
                ) : (
                    <p>No instructions available.</p>
                )}
            </div>
        </div>
    );
};

export default InstructionsPage;

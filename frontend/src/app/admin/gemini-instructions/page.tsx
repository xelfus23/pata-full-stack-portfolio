/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/ui/button/primaryButton";
import SecondaryButton from "@/components/ui/button/secondaryButton";
import { URL } from "@/constant/url";
import axios from "axios";
import { useEffect, useState } from "react";

const InstructionsPage: React.FC = () => {
    // const [instructions, setInstructions] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    // const [createInstructionsInput, setCreateInstructionsInput] = useState("");
    const [editInstructionsInput, setEditInstructionsInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentVersion, setCurrentVersion] = useState(1);
    // const [isCreating, setIsCreating] = useState(false); // New state

    const fetchInstructions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${URL}/api/get-gemini-instructions`
            );
            if (response.status >= 200 && response.status < 300) {
                // setInstructions(response.data.instructionString);

                console.log(response.data);
                setEditInstructionsInput(response.data.instructionString || ""); // Initialize edit field
                setCurrentVersion(response.data.version);
            } else {
                console.error("Error fetching instructions:", response.status);
                console.log("Failed to load instructions.");
            }
        } catch (err: any) {
            console.error("Error fetching instructions:", err);
            alert(
                err.message ||
                    "An unexpected error occurred while loading instructions."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructions();
    }, []);

    // const handleCreate = async () => {
    //     try {
    //         await axios.post(`${URL}/api/create-gemini-instructions`, {
    //             instructionString: createInstructionsInput,
    //         });
    //         console.log("Instructions created successfully");
    //         setCreateInstructionsInput(""); // Clear input
    //         fetchInstructions(); // Refresh instructions
    //         setIsCreating(false); // Hide create form
    //     } catch (err: any) {
    //         console.error("Error creating instructions:", err);
    //         alert(
    //             err.message ||
    //                 "An unexpected error occurred while creating instructions."
    //         );
    //     }
    // };

    const handleUpdate = async () => {
        try {
            const newVersion = currentVersion + 0.1;

            console.log("Current Version:", currentVersion);
            console.log(newVersion);
            await axios.post(`${URL}/api/create-gemini-instructions`, {
                // Use the same endpoint for simplicity
                instructionString: editInstructionsInput,
                version: newVersion,
            });
            console.log("Instructions updated successfully");
            setEditMode(false); // Exit edit mode
            fetchInstructions(); // Refresh instructions
        } catch (err: any) {
            console.error("Error updating instructions:", err);
            alert(
                err.message ||
                    "An unexpected error occurred while updating instructions."
            );
        }
    };

    const handleToggleEditMode = () => {
        setEditMode(!editMode);
    };

    // const handleToggleCreateMode = () => {
    //     setIsCreating(!isCreating);
    // };

    if (loading) {
        return <div>Loading instructions...</div>;
    }

    return (
        <div className="w-full p-4">
            <h2 className="text-xl font-semibold mb-4">
                Instructions Management
            </h2>

            {/* Display Instructions */}
            {/* <div>
                <h3 className="text-lg font-semibold mb-2">
                    Current Instructions:
                </h3>
                {instructions ? (
                    <textarea
                        className="border p-2 rounded w-full text-sm"
                        value={instructions}
                        rows={8}
                        readOnly
                    />
                ) : (
                    <p>No instructions available.</p>
                )}
            </div> */}

            {/* Edit Instructions Section */}
            <div>
                <textarea
                    className={`border p-2 rounded-md w-full resize-none border-${
                        editMode ? "primary" : "secondary/20"
                    } bg-${
                        !editMode ? "secondary" : "primary"
                    }/10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-text`}
                    value={editInstructionsInput}
                    onChange={(e) => setEditInstructionsInput(e.target.value)}
                    rows={34}
                    disabled={!editMode}
                />
                <div className="mt-2 flex space-x-4">
                    <SecondaryButton
                        label={editMode ? "Cancel Edit" : "Edit Instructions"}
                        onClick={handleToggleEditMode}
                        type="button"
                        color={editMode ? "red-400" : "primary"}
                    />
                    {editMode && (
                        <PrimaryButton
                            label="Save Changes"
                            onClick={handleUpdate}
                            type="button"
                        />
                    )}
                </div>
            </div>

            {/* Create New Instructions Section */}
            {/* <div>
                <h3 className="text-lg font-semibold mb-2">
                    {isCreating
                        ? "Create New Instructions:"
                        : "Add New Instructions"}
                </h3>
                {!isCreating ? (
                    <PrimaryButton
                        label="Add New"
                        onClick={handleToggleCreateMode}
                        type="button"
                    />
                ) : (
                    <>
                        <textarea
                            className="border p-2 rounded w-full"
                            value={createInstructionsInput}
                            onChange={(e) =>
                                setCreateInstructionsInput(e.target.value)
                            }
                            rows={8}
                            placeholder="Enter new instructions here..."
                        />
                        <div className="mt-2">
                            <SecondaryButton
                                label="Cancel"
                                onClick={handleToggleCreateMode}
                                type="button"
                            />
                            <PrimaryButton
                                label="Create"
                                onClick={handleCreate}
                                type="button"
                            />
                        </div>
                    </>
                )}
            </div> */}
        </div>
    );
};

export default InstructionsPage;

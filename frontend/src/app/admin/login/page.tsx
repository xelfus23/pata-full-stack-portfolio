// LoginPage.tsx
"use client";

import PrimaryButton from "@/components/ui/button/primaryButton";
import Input from "@/components/ui/inputs/input";
import { FormEvent, useState } from "react";
import React from "react";
import { motion } from "motion/react";
import CircleLoading from "@/components/circleLoading";
import { useAuth } from "../components/auth";

type ErrorTypes = {
    password: string | null;
    username: string | null;
};

const LoginPage: React.FC = () => {
    const [formValue, setFormValue] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState<ErrorTypes>({
        username: null,
        password: null,
    });

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const inputs = [
        {
            id: "username",
            label: "Username",
            type: "text",
            value: formValue.username,
            placeholder: "Enter username",
            error: error.username,
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            value: formValue.password,
            placeholder: "Enter password",
            error: error.password,
        },
    ];

    const handleInputChange = (id: string, value: string) => {
        setFormValue((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLogin = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const newErrors: ErrorTypes = {
            username: null,
            password: null,
        };

        let hasErrors = false;

        if (!formValue.username) {
            newErrors.username = "Please enter your full name";
            hasErrors = true;
        }

        if (!formValue.password) {
            newErrors.password = "Please enter your company name";
            hasErrors = true;
        }

        setError(newErrors);

        if (hasErrors) {
            console.log("Form has errors");
            setLoading(false);
            return;
        }

        try {
            const result = await login(formValue.username, formValue.password);

            if (result.success) {
                console.log("Login successful", result.data?.message);
                // Optionally display a success message to the user
            } else {
                setErrorMessage(String(result.data?.message));
            }
        } catch (err) {
            setErrorMessage("An unexpected error occurred");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <form
                onSubmit={handleLogin}
                className="p-5 space-y-4 w-1/4 items-center justify-center flex flex-col border rounded-md border-secondary/20"
            >
                <h2 className="text-2xl">Admin Login</h2>
                <div className="space-y-5 w-full">
                    {inputs.map((input, index) => (
                        <div key={index}>
                            <label className="text-sm text-text">
                                {input.label}{" "}
                                {input.error && (
                                    <motion.span
                                        animate={{}}
                                        className="text-red-400"
                                    >
                                        *{input.error}*
                                    </motion.span>
                                )}
                            </label>
                            <Input
                                type={input.type}
                                id={input.id}
                                placeholder={input.placeholder}
                                value={input.value}
                                onChange={handleInputChange}
                                required={true}
                                error={input.error}
                            />
                        </div>
                    ))}
                    {errorMessage && (
                        <p className="text-red-400 text-center">
                            {errorMessage}
                        </p>
                    )}
                    {loading ? (
                        <div className="h-6 flex items-center justify-center w-full">
                            <CircleLoading size="small" speed="fast" />
                        </div>
                    ) : (
                        <PrimaryButton
                            type="submit"
                            label="Login"
                            onClick={() => console.log("Clicked")}
                            full
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

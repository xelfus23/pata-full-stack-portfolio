"use client";
import PrimaryButton from "@/components/ui/button/primaryButton";
import Input from "@/components/ui/inputs/input";
import { FormEvent, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { HandleLogin } from "@/api/handleLogin";

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
            return;
        }

        await HandleLogin(formValue.username, formValue.password);
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
                    <PrimaryButton
                        type="submit"
                        label="Login"
                        onClick={() => console.log("Clicked")}
                        full
                    />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

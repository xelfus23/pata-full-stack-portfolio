"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react"; // Import useState
import GridBackground from "@/components/ui/gridBackground";
import { useWritingAnimation } from "@/hooks/useWritingAnimation";
import { move } from "@/animations/animations";
import PrimaryButton from "@/components/ui/button/primaryButton";
import Input from "@/components/ui/inputs/input";
import { SendMessage } from "@/api/handleMessage";

//form types
type FormTypes = {
    name: string;
    company: string;
    email: string;
    message: string;
};

//error types
type ErrorTypes = {
    name: string | null;
    company: string | null;
    email: string | null;
    message: string | null;
};

//contact page
const Contact = () => {
    //form state
    const [formValue, setFormValue] = useState<FormTypes>({
        name: "",
        company: "",
        email: "",
        message: "",
    });

    //error state
    const [error, setError] = useState<ErrorTypes>({
        name: "",
        company: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    //form submission
    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        setSuccess(false);

        try {
            e.preventDefault();

            const newErrors: ErrorTypes = {
                name: null,
                company: null,
                email: null,
                message: null,
            };

            let hasErrors = false;

            if (!formValue.name) {
                newErrors.name = "Please enter your full name";
                hasErrors = true;
            }

            if (!formValue.company) {
                newErrors.company = "Please enter your company name";
                hasErrors = true;
            }

            if (!formValue.email) {
                newErrors.email = "Please enter a valid email address";
                hasErrors = true;
            }

            if (!formValue.message) {
                newErrors.message = "Please enter a message";
                hasErrors = true;
            }

            setError(newErrors);
            if (hasErrors) {
                console.log("Form has errors");
                return;
            }

            const res = await SendMessage(
                formValue.name,
                formValue.email,
                formValue.company,
                formValue.message
            );

            if (!res?.success) {
                console.log("error sending message.");
                return;
            }

            console.log("Submitted Successfully", formValue);
            setSuccess(true);
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (id: string, value: string) => {
        setFormValue((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    //Inputs
    const items = [
        {
            label: "Full Name",
            id: "name",
            value: formValue.name,
            required: true,
            type: "text",
            placeholder: "Your first name",
            error: error.name,
        },
        {
            label: "Company",
            id: "company",
            value: formValue.company,
            required: true,
            type: "text",
            placeholder: "Your company name",
            error: error.company,
        },
        {
            label: "Email",
            id: "email",
            value: formValue.email,
            type: "email",
            placeholder: "Your email address",
            error: error.email,
        },
    ];

    return (
        <div className="py-16 px-6 md:px-24 lg:px-32 grid lg:grid-cols-2 gap-20">
            <div className="flex justify-center flex-col space-y-6">
                <h1 className="text-4xl font-bold text-text">
                    {useWritingAnimation("Let's Connect!", 1, 0.05, false)}
                </h1>
                <p className="text-lg text-text/80">
                    {useWritingAnimation(
                        `I'm currently seeking On-the-Job Training
                    opportunities. Feel free to reach out if you have any
                    questions, projects you'd like to collaborate on, or
                    just want to connect!`,
                        1,
                        0.01,
                        false
                    )}
                </p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        delay: 0.2,
                        duration: 1,
                    }}
                    className="h-[1] bg-text/20"
                />
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text">
                        {useWritingAnimation(
                            "Get in Touch Directly",
                            1,
                            0.05,
                            false
                        )}
                    </h2>
                    <ul className="space-y-2">
                        <li className="text-text/80 flex space-x-2 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    width="20"
                                    height="16"
                                    x="2"
                                    y="4"
                                    rx="2"
                                />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <a
                                href={`mailto:${"patrick.medenilla23@gmail.com"}`}
                                className="text-primary hover:underline"
                            >
                                patrick.medenilla23@gmail.com
                            </a>
                        </li>
                        <li className="text-text/80 mb-2 flex space-x-2 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a
                                href={`tel:${"+63 9163318032"}`}
                                className="text-primary hover:underline"
                            >
                                +63 916 331 8032
                            </a>
                        </li>
                        <li className="text-text/80 mb-2 flex space-x-2 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>{" "}
                            <p>Valenzuela City, Philippines</p>
                        </li>
                    </ul>
                </div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        delay: 0.4,
                        duration: 1,
                    }}
                    className="h-[1] bg-text/20"
                />
                {/* Social Links */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text">
                        {useWritingAnimation("Connect With Me", 2, 0.05, false)}
                    </h2>
                    <div className="flex space-x-4">
                        <a
                            href="github.com/xelfus23"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            GitHub
                        </a>
                        {/* Add LinkedIn, Twitter, or other relevant profiles here */}
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <form onSubmit={handleSubmit} className="space-y-4 2xl:px-20">
                    {items.map((item, index) => (
                        <div key={item.id}>
                            <motion.label
                                variants={move}
                                initial={"initial"}
                                animate="animate"
                                custom={{ from: "right", delay: index * 0.3 }} // Pass the object
                                className="block text-sm font-medium text-text/70"
                            >
                                {item.label}{" "}
                                {item.error && (
                                    <motion.span
                                        animate={{}}
                                        className="text-red-400"
                                    >
                                        *{item.error}*
                                    </motion.span>
                                )}
                            </motion.label>
                            <motion.div
                                variants={move}
                                initial={"initial"}
                                animate="animate"
                                custom={{ from: "right", delay: index * 0.6 }} // Pass the object
                            >
                                <Input
                                    id={item.id}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    value={item.value}
                                    onChange={handleInputChange} // Pass the function directly
                                    required={false}
                                    error={item.error}
                                />
                            </motion.div>
                        </div>
                    ))}
                    <div>
                        <motion.label
                            variants={move}
                            initial={"initial"}
                            animate="animate"
                            custom={{ from: "right", delay: 0.9 }} // Pass the object
                            htmlFor="message"
                            className="block text-sm font-medium text-text/70"
                        >
                            Message{" "}
                            {error.message && (
                                <motion.span
                                    animate={{}}
                                    className="text-red-400"
                                >
                                    *{error.message}*
                                </motion.span>
                            )}
                        </motion.label>
                        <motion.textarea
                            variants={move}
                            initial={"initial"}
                            animate="animate"
                            custom={{ from: "right", delay: 1.2 }} // Pass the object
                            id="message"
                            rows={10}
                            className={`w-full p-3 ${
                                error.message
                                    ? "bg-red-400/5 border border-red-400/20 focus:ring-red-400/50"
                                    : "bg-secondary/5 border border-secondary/20 focus:ring-primary/50"
                            } rounded-md focus:outline-none focus:ring-2  focus:border-transparent text-text resize-none`}
                            placeholder="Tell me about your project or opportunity!"
                            value={formValue.message}
                            onChange={(e) =>
                                handleInputChange("message", e.target.value)
                            }
                        ></motion.textarea>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <motion.div
                            variants={move}
                            initial={"initial"}
                            animate="animate"
                            custom={{ from: "right", delay: 1.5 }} // Pass the object
                        >
                            <motion.div>
                                <PrimaryButton
                                    label={
                                        loading
                                            ? "Sending please wait..."
                                            : "Send message"
                                    }
                                    onClick={() => handleSubmit}
                                    type="submit"
                                    // error={
                                    //     error.company ||
                                    //     error.email ||
                                    //     error.message ||
                                    //     error.name
                                    //         ? true
                                    //         : false
                                    // }
                                    disabled={loading}
                                    full
                                />
                            </motion.div>
                        </motion.div>

                        <p className="text-green-300 text-center text-sm">
                            {success &&
                                "Thanks for your message, I'll get back to you soon!"}
                        </p>
                    </div>
                </form>
            </div>

            <div className="absolute h-fit w-full top-0 -z-10">
                <GridBackground />
            </div>
        </div>
    );
};

export default Contact;

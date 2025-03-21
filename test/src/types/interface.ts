import React from "react";

// src/types/project.ts
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string; // Optional, as not all projects might be open-source
    liveUrl?: string; // Optional, as not all projects might be deployed
    highlights: string[];
    imageUrl: string;
}

export interface ButtonProps {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    type: "submit" | "button";
    error?: boolean;
    success?: boolean;
    children?: React.ReactNode;
    full?: boolean;
}

export interface InputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (id: string, value: string) => void;
    required: boolean;
    error: string | null;
    className?: string;
}

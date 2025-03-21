// src/app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginPage from "./login/page";

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add a loading

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
            router.replace("/admin/dashboard"); // Redirect to login page if not
        } else {
            router.replace("/admin/login"); // Redirect to login page if not authenticated
        }
        setIsLoading(false); // Set loading to false after checking authentication
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a more styled loading indicator
    }

    if (!isAuthenticated) {
        return <LoginPage />; // Or a redirect component if you prefer
    }

    const links = [
        {
            href: "/admin",
            label: "Dashboard",
        },
        {
            href: "/admin/settings",
            label: "Settings",
        },
        {
            href: "/admin/login",
            label: "Logout",
        },
    ];

    return (
        <div className="bg-background">
            {/* Admin sidebar navigation */}
            <div className="border border-secondary/30 bg-secondary/5 text-white w-64 fixed h-screen p-4">
                <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
                <nav>
                    <ul className="space-y-2 flex flex-col">
                        {links.map((link) => (
                            <Link
                                href={link.href}
                                key={link.label}
                                className={`w-full py-3 px-6 ${
                                    link.label === "Logout" ? "bg-red-400" : ""
                                } hover:bg-secondary/10`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="ml-64 p-6 w-full">{children}</div>
        </div>
    );
}

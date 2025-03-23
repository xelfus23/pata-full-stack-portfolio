"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "./auth";
import LoginPage from "../login/page";

export default function CheckAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, logout, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.replace("/admin");
            } else {
                router.replace("/admin/login");
            }
        }
    }, [isAuthenticated, isLoading, router]);

    const links = [
        {
            label: "Dashboard",
            onclick: () => router.push("/admin"),
        },
        {
            label: "Settings",
            onclick: () => router.push("/admin/settings"),
        },
        {
            label: "Logout",
            onclick: logout,
        },
    ];

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return (
        <section className="grid grid-cols-6 h-screen w-screen">
            <div className="border border-secondary/30 bg-secondary/5 text-white h-screen p-4">
                <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
                <nav>
                    <ul className="space-y-2 flex flex-col">
                        {links.map((link) => (
                            <button
                                key={link.label}
                                onClick={link.onclick}
                                className={`w-full py-3 px-6 ${
                                    link.label === "Logout" ? "bg-red-400" : ""
                                } hover:bg-secondary/10`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="col-span-5">{children}</div>
        </section>
    );
}

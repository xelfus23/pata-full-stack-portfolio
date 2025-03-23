import React from "react";
import CheckAuthState from "./components/checkAuth";
import { AuthProvider } from "./components/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CheckAuthState>{children}</CheckAuthState>
        </AuthProvider>
    );
}

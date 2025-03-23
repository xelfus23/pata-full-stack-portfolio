"use client";
import {
    useState,
    useEffect,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import { useRouter } from "next/navigation";
import { HandleLogin } from "@/api/handleAuth";

// Define the shape of your user data
interface User {
    _id: string;
    username: string;
}

// Define the structure of your API login response.  ADAPT THIS!
interface LoginResponse {
    success: boolean;
    data?: {
        // Change this to data
        message: string;
        token: string;
        user: User;
    };
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => void;
    isLoading: boolean;
    setUser: Dispatch<SetStateAction<User | null>>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {
        return { success: false };
    },
    logout: () => {},
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error parsing stored user:", error);
                    localStorage.removeItem("user"); // Clear invalid data
                }
            }
            setIsLoading(false);
        }
    }, []);

    const login = async (
        username: string,
        password: string
    ): Promise<LoginResponse> => {
        try {
            const result = await HandleLogin(username, password);
            console.log("HandleLogin result:", result);

            if (result.success && result.data?.user) {
                // Check if the login was successful and if there's user data
                const { user } = result.data;
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                setIsAuthenticated(true);
                router.replace("/admin");
                return { success: true, data: result.data }; //Return full data, not just success
            } else {
                setIsAuthenticated(false);
                setUser(null);
                return { success: false }; // Always return a result, even on failure.
            }
        } catch (error) {
            console.error("Login failed: ", error);
            setIsAuthenticated(false);
            setUser(null);
            return { success: false }; // Even here, return a result.
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/admin/login");
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading,
        setUser,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

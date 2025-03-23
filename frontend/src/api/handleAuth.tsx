import { URL } from "@/constant/url";
import axios from "axios";

type user = {
    _id: string;
    username: string;
    // Add other fields that your user model has (e.g., email, password, etc.)
};

type data = {
    message: string;
    token: string;
    user: user;
};

interface LoginResponse {
    // Define a type for the expected API response
    success: boolean;
    data?: data;
    // Add other fields that your API returns (e.g., user ID, token)
}

export const HandleLogin = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const data = {
            username: username,
            password: password,
        };

        const response = await axios.post<data>(`${URL}/login`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Login failed: ", error);
        let errorMessage = "An unexpected error occurred.";
        if (axios.isAxiosError(error)) {
            errorMessage =
                error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
            console.log(errorMessage);
        }
        return { success: false };
    }
};

interface SignupResponse {
    success: boolean;
    message: string;
    // Add other relevant fields returned by your signup API
}

interface SignupRequest {
    username: string;
    password: string;
}

export const HandleSignup = async (
    username: string,
    password: string
): Promise<SignupResponse> => {
    try {
        const data: SignupRequest = {
            //removed type assertion and declared type for request
            username: username,
            password: password,
        };

        const response = await axios.post<SignupResponse>(
            `${URL}/signup`,
            data
        );

        console.log(response.data);
        return { success: true, message: response.data.message }; // Access message from response
    } catch (error) {
        console.error("Signup failed: ", error);

        let errorMessage = "An unexpected error occurred during signup.";

        if (axios.isAxiosError(error)) {
            errorMessage =
                error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
        }

        // Consider handling the alert in the component for better UI control
        // alert("Signup failed. Please try again.");
        return { success: false, message: errorMessage };
    }
};

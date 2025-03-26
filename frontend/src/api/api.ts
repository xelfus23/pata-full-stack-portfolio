// api.ts
import axios from "axios";
import { getCookie } from "cookies-next"; // Or use your preferred cookie library
import { URL } from "@/constant/url";

const api = axios.create({
    baseURL: URL, // Your backend URL
    withCredentials: true, // Important for cookies to be sent in cross-origin requests
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie("authToken");
        console.log("Token from cookie:", token); // DEBUGGING: Make sure the token exists and is what you expect

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

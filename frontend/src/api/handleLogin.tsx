import { URL } from "@/constant/url";
import axios from "axios";

type userType = {
    username: string;
    password: string;
};

export const HandleLogin = async (username: string, password: string) => {
    try {
        const data = {
            username: username,
            password: password,
        } as userType;
        axios
            .get<userType>(`${URL}/user`, {
                params: data,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        return { success: true };
    } catch (e) {
        console.error("Error sending message: ", e);
        alert("Error sending message. Please try again.");
    }
};

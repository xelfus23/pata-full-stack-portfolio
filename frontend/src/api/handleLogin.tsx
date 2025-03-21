import axios from "axios";

type userType = {
    username: string;
    password: string;
};

export const HandleLogin = async (username: string, password: string) => {
    axios.defaults.withCredentials = true;
    try {
        const data = {
            username: username,
            password: password,
        } as userType;
        axios
            .get<userType>("https://patrick-web.vercel.app/user", {
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

import axios from "axios";

export const SendMessage = async (
    name: string,
    email: string,
    company: string,
    message: string
) => {
    try {
        const data = {
            name,
            email,
            company,
            message,
        };
        axios
            .post("https://patrick-web.vercel.app/messages", data)
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

export const geminiFunctions = [
    {
        name: "get_github_link",
        description: "Always returns Patrick John's Github profile URL.",
        parameters: {
            type: "object",
            properties: {}, //  <-- Add this empty properties object
        },
    },
    {
        name: "get_linkedin_link",
        description: "Always returns Patrick John's Linkedin profile URL.",
        parameters: {
            type: "object",
            properties: {}, //  <-- Add this empty properties object
        },
    },
    {
        name: "get_portfolio_link",
        description: "Always returns Patrick John's porfolio site URL.",
        parameters: {
            type: "object",
            properties: {}, //  <-- Add this empty properties object
        },
    },
];

export const functionImplementations = {
    get_github_link: () => {
        return "https://github.com/xelfus23"; // Replace with your actual Github URL
    },
    get_linkedin_link: () => {
        return "https://www.linkedin.com/in/patrick-john-medenilla-693158289/"; // Replace with your actual LinkedIn URL
    },
    get_portfolio_link: () => {
        return "https://patrick-john.vercel.app/";
    },
};

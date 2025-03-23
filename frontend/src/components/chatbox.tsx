import { primary, secondary } from "@/constant/colors";
import { AnimatePresence, motion } from "framer-motion";
import Input from "./ui/inputs/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { move } from "@/animations/animations";
import axios from "axios";
import DotLoading from "./ui/loading/dotLoading";
import { URL } from "@/constant/url";

type MessageType = {
    role: string;
    message: string;
    id: string;
};

function formatGeminiResponse(response: string) {
    // Step 1: Replace escaped newlines with actual newlines
    let formatted = response.replace(/\\n\\n/g, "\n\n");

    // Step 2: Replace single escaped newlines (not part of double newlines)
    formatted = formatted.replace(/(?<!\\n)\\n(?!\\n)/g, "\n");

    // Step 3: Convert "*   " bullet points into HTML list items
    formatted = formatted.replace(
        /\*\s{3}(.*?)(?=\n\*\s{3}|\n\n|$)/g,
        "<li>$1</li>"
    );

    // Step 4: Wrap consecutive list items in <ul> tags
    formatted = formatted.replace(/(<li>.*?<\/li>\n?)+/g, "<ul>$&</ul>");

    // Step 5: Format bold text (** or __ in markdown)
    formatted = formatted.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

    // Step 6: Format italic text (* or _ in markdown)
    formatted = formatted.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    // Step 7: Format code blocks with backticks
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Step 8: Format headings (# Heading)
    formatted = formatted.replace(/^#\s+(.*?)$/gm, "<h1>$1</h1>");
    formatted = formatted.replace(/^##\s+(.*?)$/gm, "<h2>$1</h2>");
    formatted = formatted.replace(/^###\s+(.*?)$/gm, "<h3>$1</h3>");

    // Step 9: Format links [text](url)
    formatted = formatted.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Step 10: Format horizontal rules
    formatted = formatted.replace(/^(-{3,}|\*{3,})$/gm, "<hr />");

    // Step 11: Handle paragraphs - wrap text blocks separated by double newlines
    formatted = formatted.replace(
        /(?<!\n<\/[^>]+>)\n\n(?!\s*<[^>]+>)/g,
        "</p><p>"
    );

    // If there are paragraphs, wrap the whole text in p tags if it doesn't start with a special element
    if (
        formatted.includes("</p><p>") &&
        !formatted.match(/^\s*<(h[1-6]|ul|ol|blockquote|code)/)
    ) {
        formatted = `<p>${formatted}</p>`;
    }

    // Step 12: Clean up any remaining escaped characters
    formatted = formatted.replace(/\\([nrt])/g, (match, char) => {
        if (char === "n") return "\n";
        if (char === "r") return "\r";
        if (char === "t") return "\t";
        return match;
    });

    return formatted;
}

interface types {
    setLenisState: (v: boolean) => void;
}

const ChatBox: React.FC<types> = ({ setLenisState }) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const messageRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([
        {
            role: "bot",
            message: `Hi there! I'm Patrick's chatbot assistant. I can answer questions about Patrick. What would you like to know? For example, you could ask, "Can you tell me more about Patrick?"`,
            id: "1",
        },
    ]);
    axios.defaults.withCredentials = false;

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages, visible]);

    useEffect(() => {
        const loadSession = async () => {
            // Try to get session from localStorage
            const savedSessionId = localStorage.getItem("chatSessionId");

            if (savedSessionId) {
                try {
                    // Load existing session
                    const response = await axios.get(
                        `${URL}/sessions/${savedSessionId}`
                    );
                    setSessionId(savedSessionId);

                    // Map the messages to your component format
                    const loadedMessages = response.data.messages.map(
                        (msg: {
                            role: string;
                            message: string;
                            _id: string;
                        }) => ({
                            role: msg.role === "model" ? "bot" : msg.role,
                            message: formatGeminiResponse(msg.message),
                            id: msg._id,
                        })
                    );

                    setMessages(loadedMessages);
                } catch (error) {
                    console.error("Failed to load session:", error);
                    // Create new session if loading fails
                    createNewSession();
                }
            } else {
                // No saved session, create a new one
                createNewSession();
            }
        };

        const createNewSession = async () => {
            try {
                const response = await axios.post(`${URL}/sessions`);
                const newSessionId = response.data.session._id;
                setSessionId(newSessionId);
                localStorage.setItem("chatSessionId", newSessionId);
            } catch (error) {
                console.error("Failed to create session:", error);
            }
        };

        loadSession();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        try {
            const newInput = input;
            setInput("");
            e.preventDefault();
            if (newInput.trim() === "") {
                setError("Please enter a message");

                setTimeout(() => {
                    setError(null);
                }, 3000);
                return;
            }

            const newMessage = {
                role: "user",
                message: newInput,
            } as MessageType;

            setMessages((prev) => [...prev, newMessage]);

            await axios
                .post(`${URL}/chats`, {
                    sessionId: sessionId,
                    role: "user",
                    message: newInput,
                })
                .then((res) => {
                    const botResponse = res.data.messages[1];
                    const newAIMessage = {
                        role: "bot",
                        message: formatGeminiResponse(botResponse.message),
                        id: botResponse._id || String(Date.now()),
                    } as MessageType;

                    setMessages((prev) => [...prev, newAIMessage]);
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openChatbox = () => {
        setVisible(true);
    };

    const closeChatBox = () => {
        setLenisState(true);
        setVisible(false);
    };

    const setValue = (id: string, value: string) => {
        setInput(value);
    };

    return (
        <div className="fixed items-center md:block flex justify-center w-screen h-screen pointer-events-none z-40 ">
            <AnimatePresence mode="wait">
                {visible && (
                    <div className="z-50">
                        <motion.div
                            variants={move}
                            initial={"initial"}
                            animate={"animate"}
                            exit={{
                                opacity: 0,
                                x: 20,
                            }}
                            transition={{
                                duration: 0.2,
                                delay: 0,
                            }}
                            custom={{ from: "right", delay: 1 }}
                            className="absolute sm:hidden md:block md:bottom-10 md:w-auto bottom-20 md:right-15 pointer-events-auto w-fit flex"
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="chatbox-form border p-4 h-full border-secondary/20 bg-secondary/10 backdrop-blur-md w-auto rounded-2xl space-y-4 md:min-w-120 max-w-120"
                            >
                                <h1 className="text-xl">Chat Assistant</h1>
                                <motion.div
                                    ref={messageRef}
                                    className="chat-messages-container overflow-y-scroll p-2 rounded-xl h-150 space-y-4 scrollbar-thin"
                                    onHoverStart={() => setLenisState(false)}
                                    onHoverEnd={() => setLenisState(true)}
                                >
                                    {messages.map((message, index) => (
                                        <ChatBubble
                                            id={message.id}
                                            key={index}
                                            message={message.message}
                                            role={message.role}
                                        />
                                    ))}
                                    {loading && (
                                        <div
                                            className={`w-full flex justify-start`}
                                        >
                                            <div className="border border-primary/20 bg-secondary/10 rounded-xl max-w-[80%] p-4 items-center flex justify-center">
                                                <DotLoading />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                                <div className="flex items-center space-x-4 justify-between w-full">
                                    <div className="w-full">
                                        <Input
                                            type="text"
                                            placeholder="Type your message..."
                                            required={false}
                                            id="message"
                                            onChange={setValue}
                                            error={error}
                                            value={input}
                                            spellCheck={false}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="hover:cursor-pointer col-span-1"
                                    >
                                        <motion.svg
                                            whileHover={{
                                                opacity: 1,
                                            }}
                                            initial={{ opacity: 0.5 }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="35"
                                            height="35"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                                            <path d="M6 12h16" />
                                        </motion.svg>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.svg
                whileHover={{
                    scale: 1.2,
                    opacity: 1,
                    stroke: primary,
                    fill: secondary,
                }}
                onClick={visible ? closeChatBox : openChatbox}
                whileTap={{
                    scale: 1.2,
                    opacity: 0.8,
                    stroke: secondary,
                    fill: primary,
                }}
                initial={{
                    opacity: 0.8,
                    stroke: secondary,
                    fill: primary,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hover:cursor-pointer absolute right-5 md:right-3 bottom-100 md:bottom-95 pointer-events-auto z-50 scale-150 md:scale-100"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" />
                <path d="M12 10h.01" />
                <path d="M16 10h.01" />
            </motion.svg>
        </div>
    );
};

const ChatBubble = ({ message, role }: MessageType) => {
    const style =
        role === "user"
            ? `border border-secondary/20 bg-primary/10 rounded-xl max-w-[80%] p-2`
            : `border border-primary/20 bg-secondary/10 rounded-xl max-w-[80%] p-2`;

    return (
        <div
            className={`w-full flex ${
                role === "user" ? "justify-end" : "justify-start"
            }`}
        >
            <div className={style}>
                {/* Use dangerouslySetInnerHTML to render formatted HTML content */}
                <div
                    dangerouslySetInnerHTML={{ __html: message }}
                    className="formatted-content"
                />
            </div>
        </div>
    );
};

export default ChatBox;

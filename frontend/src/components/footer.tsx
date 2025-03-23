"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface footerProps {
    zIndex: number;
}

const Footer: React.FC<footerProps> = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/xelfus23",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/patrick-john-medenilla-03a64734b/",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            ),
        },
        {
            namae: "Facebook",
            url: "https://www.facebook.com/Patrick.John.Medenilla/",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
        },
        {
            name: "Email",
            url: "mailto:patrick.medenilla23@gmail.com",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
        },
    ];

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About me", path: "/about" },
        { name: "My Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
        // { name: "UI Kit", path: "/library" },
    ];

    return (
        <footer className="bg-background border-t border-secondary/20 pt-12 pb-6 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-primary mb-4 flex space-x-2"
                        >
                            <div className="relative w-8 h-8 aspect-square">
                                <Image
                                    src={"/icons/icon.png"}
                                    alt="icon"
                                    sizes="auto"
                                    fill
                                />
                            </div>
                            <p>Patrick</p>
                        </Link>
                        <p className="text-text/80 mb-4">
                            A passionate front-end developer focused on creating
                            clean, user-friendly experiences.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text hover:text-primary transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-text/80 hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            Get In Touch
                        </h3>
                        <p className="text-text/80 mb-2">
                            Open for opportunities. Let&apos;s work together!
                        </p>
                        <a
                            href="mailto:patrick.medenilla23@gmail.com"
                            className="text-primary hover:text-primary/80 transition-colors duration-300"
                        >
                            patrick.medenilla23@gmail.com
                        </a>
                    </div>
                </div>

                <div className="border-t border-secondary/20 pt-6 text-center text-text/60">
                    <p>© {currentYear} Patrick. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

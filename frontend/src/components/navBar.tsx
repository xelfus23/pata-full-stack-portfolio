"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
// import Image from "next/image";
import { useWritingAnimation } from "@/hooks/useWritingAnimation";
import useScroll from "@/hooks/useScroll";
// import { move } from "@/animations/animations";

interface NavItem {
    name: string;
    path: string;
}

interface NavRefs {
    container: HTMLDivElement | null;
    [key: string]: HTMLAnchorElement | HTMLDivElement | null;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const [activeItemWidth, setActiveItemWidth] = useState<number>(0);
    const [activeItemLeft, setActiveItemLeft] = useState<number>(0);
    const navRefs = useRef<NavRefs>({ container: null });

    const navItems = useMemo<NavItem[]>(
        () => [
            { name: "Home", path: "/" },
            { name: "About Me", path: "/about" },
            { name: "My Projects", path: "/projects" },
            { name: "Contact", path: "/contact" },
            // { name: "Docs", path: "/library" },
        ],
        []
    );

    const scroll = useScroll();

    // Update underline position when pathname changes
    useEffect(() => {
        const activeItem = navItems.find((item) => item.path === pathname);
        if (
            activeItem &&
            navRefs.current[activeItem.name] &&
            navRefs.current.container
        ) {
            const activeElement = navRefs.current[
                activeItem.name
            ] as HTMLAnchorElement;
            const containerElement = navRefs.current
                .container as HTMLDivElement;

            const rect = activeElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();

            setActiveItemWidth(rect.width);
            setActiveItemLeft(rect.x - containerRect.x);
        }
    }, [navItems, pathname]);

    // Ref callback functions
    const setContainerRef = (el: HTMLDivElement | null) => {
        navRefs.current.container = el;
    };

    const setNavItemRef = (name: string) => (el: HTMLAnchorElement | null) => {
        navRefs.current[name] = el;
    };

    return (
        <nav
            style={{
                transform: `-translateY(${scroll * 0.5}px)`,
            }}
            className="w-full z-30 absolute"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center space-x-2"
                        >
                            {/* <motion.div
                                variants={move}
                                initial="initial"
                                animate="animate"
                                custom={{ from: "left", delay: 0 }}
                                className="relative h-8 w-8"
                            >
                                <Image
                                    src={"/icons/icon.png"}
                                    fill
                                    alt="icon"
                                    sizes="auto"
                                />
                            </motion.div> */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl font-bold text-primary"
                            >
                                {useWritingAnimation("PATRICK", 1, 0.05, false)}
                            </motion.span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div
                        className="hidden md:flex items-center space-x-4 relative"
                        ref={setContainerRef}
                    >
                        {/* Animated underline */}
                        <motion.div
                            className="absolute bottom-0 h-0.5 bg-primary rounded-full"
                            initial={false}
                            animate={{
                                width: activeItemWidth,
                                left: activeItemLeft,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />

                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <Link
                                    href={item.path}
                                    className={`px-3 py-2 ${
                                        pathname === item.path
                                            ? "text-primary"
                                            : "text-text"
                                    } hover:text-primary transition-colors duration-300 text-sm`}
                                    ref={setNavItemRef(item.name)}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text hover:text-primary focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                className={`${isOpen ? "block" : "hidden"} md:hidden`}
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-secondary">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`block px-3 py-2 ${
                                pathname === item.path
                                    ? "text-primary border-l-2 border-primary pl-2"
                                    : "text-text"
                            } hover:text-primary transition-colors duration-300`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </nav>
    );
};

export default Navbar;

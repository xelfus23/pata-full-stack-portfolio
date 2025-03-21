import React from "react";
import Image from "next/image";
import Link from "next/link";
// import CodeWithColors from "@/utils/filterCode";

export default function SimpleNav() {
    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
        { name: "Library", path: "/library" },
    ];

    // const code = `
    // <nav className="bg-background flex justify-between p-4 space-x-100 items-center">
    //     <div>
    //         <Image
    //             src={"/icons/icon.png"}
    //             height={40}
    //             width={40}
    //             alt="icon"
    //         />
    //     </div>
    //     <div className="flex space-x-4">
    //         {links.map((link) => (
    //             <Link
    //                 key={link.name}
    //                 href={link.path}
    //                 className='text-text'
    //             >
    //                 {link.name}
    //             </Link>
    //         ))}
    //     </div>
    // </nav>`;

    return (
        <div className="w-full">
            <div className="container mx-auto space-y-4 flex flex-col">
                <p>
                    These are an example of <b>Navigation bar</b>.
                </p>
                <nav className="border-1 border-secondary/20 flex justify-between p-4 space-x-100 items-center">
                    <div>
                        <Image
                            src={"/icons/icon.png"}
                            height={40}
                            width={40}
                            alt="icon"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-text`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <nav className="border-1 border-secondary/20 flex justify-between p-4 space-x-100 items-center hue-rotate-90">
                    <div>
                        <Image
                            src={"/icons/icon.png"}
                            height={40}
                            width={40}
                            alt="icon"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-text`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <nav className="border-1 border-secondary/20 flex justify-between p-4 space-x-100 items-center hue-rotate-60">
                    <div>
                        <Image
                            src={"/icons/icon.png"}
                            height={40}
                            width={40}
                            alt="icon"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-text`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <nav className="border-1 border-secondary/20 flex justify-between p-4 space-x-100 items-center hue-rotate-180">
                    <div>
                        <Image
                            src={"/icons/icon.png"}
                            height={40}
                            width={40}
                            alt="icon"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-text`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* <CodeWithColors code={code} /> */}
            </div>
        </div>
    );
}

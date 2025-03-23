"use client";

import Link from "next/link";

const AdminPage: React.FC = () => {
    const items = [
        {
            label: "Gemini Instructions",
            slug: "gemini-instructions",
        },
        {
            label: "Check Messages",
            slug: "check-messages",
        },
    ];

    return (
        <div className="grid grid-cols-5 gap-5 p-5">
            {items.map((item) => (
                <Link
                    href={`/admin/${item.slug}`} // Modified href
                    key={item.slug}
                    className="p-20 bg-secondary/20 hover:bg-secondary/30 hover:cursor-pointer rounded-md"
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
};

export default AdminPage;

// app/library/[category]/[component]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { componentsData } from "@/lib/library-data";

// Define proper types
type ComponentItem = {
    label: string;
    slug: string;
    code: React.ReactElement;
};

type CategoryType = {
    label: string;
    slug: string;
    items: ComponentItem[];
};

export default function ComponentPage() {
    const params = useParams();
    const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params.category) {
            const foundCategory = componentsData.find(
                (cat) => cat.slug === params.category
            );

            if (foundCategory) {
                setCurrentCategory(foundCategory);
            }

            setIsLoading(false);
        }
    }, [params]);

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!currentCategory) {
        return (
            <div className="p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Category not found
                </div>
                <div className="mt-4">
                    <Link
                        href="/library"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to library
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="border-l-1 rounded-md border-secondary/20 col-span-4 flex p-8 flex-col space-y-8">
            {currentCategory.items.map((items) => (
                <div key={items.slug}>{items.code}</div>
            ))}
        </div>
    );
}

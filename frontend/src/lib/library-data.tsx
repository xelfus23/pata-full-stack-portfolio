import SimpleNav from "@/components/ui/navigation/simpleNav";
// import SecondaryButton from "@/components/ui/button/secondary-button";
// import PrimaryButton from "@/components/ui/button/primary-button";
// src/lib/library_data.ts
export const componentsData = [
    {
        label: "Buttons",
        slug: "buttons",
        items: [
            {
                label: "Primary Button",
                slug: "primary",
                code: <div></div>,
            },
            {
                label: "Secondary Button",
                slug: "secondary",
                code: <div></div>,
            },
        ],
    },
    {
        label: "Navigation Bar",
        slug: "navbar",
        items: [
            {
                label: "Simple Navigation Bar",
                slug: "simple-nav",
                code: <SimpleNav />,
            },
        ],
    },
    {
        label: "Forms",
        slug: "forms",
        items: [
            {
                label: "Text Input",
                slug: "text-input",
                code: (
                    <input type="text" className="border rounded py-2 px-3" />
                ),
            },
            {
                label: "Select Dropdown",
                slug: "select-dropdown",
                code: (
                    <select className="border rounded py-2 px-3">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                ),
            },
        ],
    },
];

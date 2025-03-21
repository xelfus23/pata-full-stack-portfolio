export const FadeIn = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: index * 0.2,
        },
    }),
};

export const FadeOut = {
    initial: {
        opacity: 1,
    },
    animate: (index: number) => ({
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: index * 0.2,
        },
    }),
};

export const move = {
    initial: ({ from }: { from: string }) => ({
        opacity: 0,
        x: from === "left" ? -20 : from === "right" ? 20 : 0,
        y: from === "top" ? -20 : from === "bottom" ? 20 : 0,
    }),
    animate: ({ delay }: { delay: number }) => ({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: delay * 0.2,
        },
    }),
};

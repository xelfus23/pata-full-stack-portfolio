import { useEffect, useRef } from "react";

/**
 * Custom hook that inverts the scrolling direction on the page
 * @param {boolean} enabled - Whether the inverted scrolling is enabled
 * @param {number} smoothness - Duration of smooth scrolling in ms
 * @returns {void}
 */
const useInvertedScroll = (
    enabled: boolean = true,
    smoothness: number = 200
): void => {
    // Ref to track if we're currently scrolling
    const isScrollingRef = useRef<boolean>(false);
    // Ref to store timeout id
    const scrollTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Only set up the event listener if enabled
        if (!enabled) return;

        // Handler function for the wheel event
        const handleScroll = (event: WheelEvent): void => {
            // Prevent the default scroll behavior
            event.preventDefault();

            if (!isScrollingRef.current) {
                isScrollingRef.current = true;

                // Invert the scroll direction
                // When user scrolls down (positive deltaY), we scroll up (negative value)
                const scrollAmount = -event.deltaY;

                // Perform the scroll
                window.scrollBy({
                    top: scrollAmount,
                    behavior: "smooth",
                });

                // Reset scrolling state after animation completes
                if (scrollTimeoutRef.current) {
                    window.clearTimeout(scrollTimeoutRef.current);
                }

                scrollTimeoutRef.current = window.setTimeout(() => {
                    isScrollingRef.current = false;
                }, smoothness);
            }
        };

        // Add wheel event listener to the window
        window.addEventListener("wheel", handleScroll, { passive: false });

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("wheel", handleScroll);

            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [enabled, smoothness]);
};

export default useInvertedScroll;

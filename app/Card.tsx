import { useEffect, useRef, useState } from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
    const [height, setHeight] = useState(0);
    const childrenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!childrenRef.current) return;

        const observer = new ResizeObserver(() => {
            const childrenHeight = Array.from(
                childrenRef.current?.children || []
            ).reduce(
                (total, child) => total + (child as HTMLElement).offsetHeight,
                0
            );
            setHeight(childrenHeight);
        });

        observer.observe(childrenRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="flex relative flex-col max-w-lg mx-auto py-10 opacity-0 px-10 h-fit animate-blur-zoom-in blur-[10]"
            style={{ animationDelay: "0.5s" }}
        >
            <div ref={childrenRef}>{children}</div>
            <div
                className="absolute w-full left-0 top-1/2 bg-white bg-opacity-65  ring-2  ring-black ring-opacity-5 rounded-3xl  -translate-y-1/2 transition-all -z-10"
                style={{ height: height + 80 }}
            />
        </div>
    );
};

export default Card;

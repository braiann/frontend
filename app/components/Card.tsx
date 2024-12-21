import { useEffect, useRef, useState } from "react";

const Card = ({
    children,
    fullscreen,
}: {
    children: React.ReactNode;
    fullscreen: boolean;
}) => {
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
            if (fullscreen) {
                setHeight(window.innerHeight - 230);
            } else {
                setHeight(childrenHeight);
            }
        });

        observer.observe(childrenRef.current);

        return () => observer.disconnect();
    }, [fullscreen]);

    return (
        <div
            className={`flex relative flex-col max-w-lg mx-auto py-10 opacity-0 px-10 ${
                fullscreen ? "h-[calc(100vh-230px)]" : "h-fit"
            } animate-blur-zoom-in blur-[10]`}
            style={{ animationDelay: "0.5s" }}
        >
            <div ref={childrenRef} className={fullscreen ? "h-full" : ""}>
                {children}
            </div>
            <div
                className={`absolute -z-10 ${
                    fullscreen ? " bg-opacity-30" : " bg-opacity-65"
                } left-0 w-full  top-1/2 bg-white ring-2 rounded-3xl ring-black ring-opacity-5  -translate-y-1/2 transition-all -z-10"`}
                style={{ height: height + 80 }}
            />
        </div>
    );
};

export default Card;

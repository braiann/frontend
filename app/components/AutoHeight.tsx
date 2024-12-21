import { useEffect, useRef, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";

const AutoHeight = ({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [height, setHeight] = useState<Height>("auto");
    const contentDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = contentDiv.current as HTMLDivElement;
        const resizeObserver = new ResizeObserver(() => {
            setHeight(element.clientHeight);
        });
        resizeObserver.observe(element);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <AnimateHeight
            {...props}
            height={height}
            contentClassName={`auto-content ${className}`}
            ref={contentDiv}
            disableDisplayNone
        >
            {children}
        </AnimateHeight>
    );
};

export default AutoHeight;

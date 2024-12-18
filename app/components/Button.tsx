import React from "react";

const Button = ({
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
    accent = false,
}: {
    children: React.ReactNode;
    className?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    accent?: boolean;
}) => (
    <button
        className={`${
            accent
                ? "bg-pink-600 text-white font-medium"
                : "bg-black bg-opacity-5"
        } p-1 w-full rounded-md hover:opacity-80 active:brightness-90 active:opacity-100 flex justify-center ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;

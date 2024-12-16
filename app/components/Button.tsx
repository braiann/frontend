import React from "react";

const Button = ({
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
    <button
        className={`bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15 flex justify-center ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;

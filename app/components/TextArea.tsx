import { ChangeEvent } from "react";

const TextArea = ({
    name,
    id,
    value,
    onChange,
    animateThinking,
    replaceHover,
}: {
    name: string;
    id?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    animateThinking?: boolean;
    replaceHover?: boolean;
}) => {
    return (
        <div className="relative">
            <textarea
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                rows={4}
                className={`
                w-full bg-transparent transition-all bg-[radial-gradient(circle,rgba(247,246,232,0.1)0%,rgba(247,246,232,0.5)26%,rgba(214,143,214,0.5)36%,rgba(0,129,167,0.5)52%,rgba(15,244,198,0.5)68%,rgba(247,246,232,0.1)79%,rgba(247,246,232,0.1)100%)] bg-zoom resize-none hover:resize-y outline-none rounded-lg px-2 py-1
                hover: hover:ring-white hover:ring-opacity-50
                hover:bg-[linear-gradient(-25deg,rgba(0,0,0,0.02)0%,rgba(0,0,0,0.01)100%)]
                focus:bg-[linear-gradient(-25deg,rgba(0,0,0,0.03)0%,rgba(0,0,0,0.01)100%)]
                ${!value && "border-[1px] border-black border-opacity-5"}
                ${animateThinking && `toggle-thinking`}
                ${replaceHover && "animate-blurpulse"}
            `}
            ></textarea>
        </div>
    );
};

export default TextArea;

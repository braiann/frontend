import { Instrument_Sans } from "next/font/google";
import { ChangeEvent } from "react";
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

const TextField = ({
    name,
    placeholder,
    value = "",
    onChange,
    className,
    autofocus,
}: {
    name: string;
    placeholder: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    autofocus?: boolean;
}) => {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autofocus}
            className={`${
                value ? "ring-0" : "ring-[1px]"
            } ring-black ring-opacity-5 px-2 outline-none rounded-md bg-transparent ${
                className || ""
            } ${instrumentSans}`}
        />
    );
};

export default TextField;

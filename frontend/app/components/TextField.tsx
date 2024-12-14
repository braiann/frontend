import { Instrument_Sans } from "next/font/google";
import { ChangeEvent } from "react";
const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

const TextField = ({
    name,
    placeholder,
    value = "",
    onChange,
    className,
  }: {
    name: string;
    placeholder: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string;
  }) => {
    

    return (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${value ? "ring-2" : "ring-0"} ring-black ring-opacity-10 px-2 outline-none rounded-md bg-transparent ${className || ""} ${instrumentSans}`}
      />
    );
  };
  
  export default TextField;
  
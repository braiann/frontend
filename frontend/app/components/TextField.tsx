import { Instrument_Sans } from "next/font/google";
const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

const TextField = ({
    name,
    placeholder,
    className,
  }: {
    name: string;
    placeholder: string;
    className?: string;
  }) => {
    

    return (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={`ring-1 ring-black ring-opacity-10 rounded-md bg-transparent ${className || ""} ${instrumentSans}`}
      />
    );
  };
  
  export default TextField;
  
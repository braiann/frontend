import Cross from "./icons/Cross";

const SuggestionCard = ({
    index,
    suggestion,
    onClose,
}: {
    index: number;
    suggestion: string;
    onClose: () => void;
}) => {
    return (
        <li
            key={index}
            className={`flex relative gap-2 flex-col text-xs text-center basis-full items-center bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2`}
        >
            <div className="bg-indigo-500 w-9 h-9 aspect-square flex items-center justify-center rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                </svg>
            </div>
            <span>{suggestion}</span>
            <button
                onClick={onClose}
                className="scale-75 hover:opacity-70 transition-opacity opacity-100 absolute right-2"
            >
                <Cross />
            </button>
        </li>
    );
};

export default SuggestionCard;

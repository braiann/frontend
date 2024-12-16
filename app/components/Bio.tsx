import { useDispatch, useSelector } from "react-redux";
import { Resume } from "../types/resume";
import TextArea from "./TextArea";
import { useState } from "react";
import { RootState } from "../store";
import { updateBio } from "../store/resumeSlice";
import SuggestionsButton from "./SuggestionsButton";
import SuggestionCard from "./SuggestionCard";
import Button from "./Button";
import Checkmark from "./icons/Checkmark";
import Cross from "./icons/Cross";

const Bio = () => {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    0;
    const dispatch = useDispatch();

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [rewrite, setRewrite] = useState("");
    const [loading, setLoading] = useState(false);
    const [replaceHover, setReplaceHover] = useState(false);
    const [showSuccessCheckmark, setShowSuccessCheckmark] = useState(false);

    const handleSuggestions = async () => {
        setLoading(true);
        setRewrite("");
        setSuggestions([]);
        try {
            const prompt = `Generate this JSON (DO NOT INCLUDE the notation just the plain JSON, so no backticks json preceding and no ending backticks): {suggestions: [suggestion, suggestion, suggestion], rewrite} with each suggestion being a short suggestion about the resume About Me field and a final rewrite in a length that would be appropriate for a About Me of a resume in the same language as input language. Do not answer back any other text just the plain JSON. This is the About Me: ${resume.bio}. (Answer in input language). No placeholders, all text should be final.`;

            const apiUrl =
                process.env.GENERATE_API_URL ||
                "http://localhost:5000/api/generate";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: prompt }),
            });
            console.log(response);
            const results = JSON.parse(await response.text());
            setLoading(false);
            setRewrite(results.rewrite || "");
            setSuggestions(results.suggestions || []);
        } catch (error) {
            console.log("Error generating suggestions: ", error);
            setLoading(false);
            alert("Failed to generate suggestions. Please try again."); // TODO: improve UI
        }
    };

    const handleReplaceHover = () => {
        setReplaceHover(!replaceHover);
    };

    const handleReplace = () => {
        dispatch(updateBio(rewrite));
        setRewrite("");
        setReplaceHover(false);
    };

    return (
        <>
            <label className="pl-2" htmlFor="bio">
                About me
            </label>
            <div className="relative group">
                <TextArea
                    name="bio"
                    id="bio"
                    value={resume.bio || ""}
                    onChange={(e) => dispatch(updateBio(e.target.value))}
                    animateThinking={loading}
                    replaceHover={replaceHover}
                />
                <SuggestionsButton
                    onClick={handleSuggestions}
                    className="-top-3 -left-6"
                />
            </div>
            {loading && (
                <div className="px-2">
                    <div className="w-full h-14 mb-2 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
                    <div className="w-full h-14 mb-2 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
                    <div className="w-full h-24 bg-black bg-opacity-5 rounded-md animate-pulse"></div>
                </div>
            )}

            <div className="px-2">
                {suggestions.length > 0 && (
                    <ul className="flex gap-2">
                        {suggestions.map((suggestion, index) => (
                            <SuggestionCard
                                index={index}
                                key={index}
                                suggestion={suggestion}
                                onClose={() =>
                                    setSuggestions((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                            />
                        ))}
                    </ul>
                )}
                {rewrite && (
                    <div className="bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2">
                        <div className="w-full flex justify-between mt-1">
                            <div />
                            <span className="text-center text-xs font-bold opacity-50">
                                Rewrite
                            </span>
                            <button
                                onClick={() => setRewrite("")}
                                className="scale-75 hover:opacity-70 transition-opacity opacity-100"
                            >
                                <Cross />
                            </button>
                        </div>
                        <p>{rewrite}</p>
                        <div className="flex gap-2 mb-1 mt-3">
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(rewrite);
                                    setShowSuccessCheckmark(true);
                                    setTimeout(
                                        () => setShowSuccessCheckmark(false),
                                        500
                                    );
                                }}
                            >
                                {showSuccessCheckmark ? <Checkmark /> : "Copy"}
                            </Button>
                            <Button
                                className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15 flex justify-center"
                                onMouseEnter={handleReplaceHover}
                                onMouseLeave={handleReplaceHover}
                                onClick={handleReplace}
                            >
                                Replace
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Bio;

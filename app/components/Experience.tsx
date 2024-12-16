import { useState } from "react";
import TextField from "./TextField";
import TextArea from "./TextArea";
import removeByIndex from "../utils/removeByIndex";
import SuggestionsButton from "./SuggestionsButton";
import SuggestionCard from "./SuggestionCard";

interface WorkExperience {
    position: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
    skills: string[];
}

interface Rewrite {
    position: string;
    company: string;
    description: string;
}

const Experience = () => {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [rewrites, setRewrites] = useState<Rewrite[]>([]);

    const handleSuggestions = async () => {
        try {
            const prompt = `Generate this JSON (DO NOT INCLUDE the notation just the plain JSON, so no backticks json preceding and no ending backticks): {suggestions: [suggestion, suggestion, suggestion], rewrites: [{position, company, description}, ...]} with each suggestion being a short suggestion about the resume Experience section and a final rewrite in a length that would be appropriate for each field, in the same language as input language. Do not answer back any other text just the plain JSON. This is the input: ${JSON.stringify(
                experiences
            )}. (Answer in input language). No placeholders, all text should be final. No brackets to fill in, no blanks.`;

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
            const results = JSON.parse(await response.text());
            setSuggestions(results.suggestions || []);
            setRewrites(results.rewrites || []);
        } catch (error) {
            console.log("Error generating suggestions: ", error);
        }
    };

    const handleAddExperience = () => {
        const newExperience: WorkExperience = {
            position: "",
            company: "",
            startDate: new Date(),
            endDate: new Date(),
            description: "",
            skills: [],
        };

        setExperiences((prev) => [...prev, newExperience]);
    };

    const handleChangeExperienceField = (
        index: number,
        field: keyof WorkExperience,
        value: string
    ) => {
        setExperiences((prev) =>
            prev.map((experience, i) =>
                i === index ? { ...experience, [field]: value } : experience
            )
        );
    };

    const clearRewrite = (index: number) => {
        setRewrites((prevArray) => removeByIndex(prevArray, index));
    };

    return (
        <section id="experience" className="mt-3 relative group">
            <hr className="mb-3"></hr>
            <h2 className="mx-2 text-2xl font-bold mb-3">Experience</h2>
            <SuggestionsButton
                onClick={handleSuggestions}
                className="top-4 -left-5"
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <SuggestionCard
                            index={index}
                            suggestion={suggestion}
                            key={index}
                            onClose={() =>
                                setSuggestions((prev) =>
                                    removeByIndex(prev, index)
                                )
                            }
                        />
                    ))}
                </ul>
            )}
            {experiences.map((experience, index) => (
                <div key={index}>
                    {index > 0 && <hr className="my-3"></hr>}
                    <div className="w-full max-w-full flex gap-2">
                        <TextField
                            name="position"
                            placeholder="Position"
                            onChange={(e) =>
                                handleChangeExperienceField(
                                    index,
                                    "position",
                                    e.target.value
                                )
                            }
                            className="font-semibold w-full"
                            value={experience.position}
                        />
                        <TextField
                            name="company"
                            placeholder="Company"
                            onChange={(e) =>
                                handleChangeExperienceField(
                                    index,
                                    "company",
                                    e.target.value
                                )
                            }
                            className="w-full"
                            value={experience.company}
                        />
                    </div>
                    <div className="mt-1 mb-2">
                        <input type="date" className="bg-transparent px-2" />
                        <span> - </span>
                        <input type="date" className="bg-transparent px-2" />
                    </div>
                    <TextArea
                        name="description"
                        onChange={(e) =>
                            handleChangeExperienceField(
                                index,
                                "description",
                                e.target.value
                            )
                        }
                        value={experience.description}
                    />
                    {rewrites[index] && (
                        <>
                            <div className="bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2">
                                <div className="w-full flex justify-between mt-1">
                                    <div />
                                    <span className="text-center text-xs font-bold opacity-50">
                                        Rewrite
                                    </span>
                                    <button
                                        onClick={() => {
                                            clearRewrite(index);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="#00000066"
                                            className="size-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p>{rewrites[index].description}</p>
                                <div className="flex gap-2 mb-1 mt-3">
                                    <button className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15">
                                        Copy
                                    </button>
                                    <button
                                        className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15"
                                        // onMouseEnter={handleReplaceHover}
                                        // onMouseLeave={handleReplaceHover}
                                        // onClick={handleReplace}
                                    >
                                        Replace
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
            <button
                onClick={handleAddExperience}
                className="bg-black bg-opacity-5 p-1 w-full rounded-md hover:bg-opacity-10 active:bg-opacity-15 flex justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#00000066"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </button>
        </section>
    );
};

export default Experience;

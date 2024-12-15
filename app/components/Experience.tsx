import { useState } from "react";
import TextField from "./TextField";
import TextArea from "./TextArea";

interface WorkExperience {
    position: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
    skills: string[] 
}

interface Rewrite {
    position: string,
    company: string,
    description: string
}

const Experience = () => {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [rewrites, setRewrites] = useState<Rewrite[]>([]);

    const handleSuggestions = async () => {
        try {
            const prompt = `Generate this JSON (DO NOT INCLUDE the notation just the plain JSON, so no backticks json preceding and no ending backticks): {suggestions: [suggestion, suggestion, suggestion], rewrites: [{position, company, description}, ...]} with each suggestion being a short suggestion about the resume Experience section and a final rewrite in a length that would be appropriate for each field, in the same language as input language. Do not answer back any other text just the plain JSON. This is the input: ${JSON.stringify(experiences)}. (Answer in input language). No placeholders, all text should be final. No brackets to fill in, no blanks.`;

            const apiUrl = "http://localhost:5000/api/generate";
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
        
        setExperiences(prev => [...prev, newExperience]);
    };

    const handleChangeExperiencePosition = (index: number, value: string) => {
        setExperiences(experiences.map((experience, i) => {
            if (index == i) {
                return {
                    ...experience,
                    position: value
                }
            } else {
                return experience
            }
        }))
    }

    const handleChangeExperienceCompany = (index: number, value: string) => {
        setExperiences(experiences.map((experience, i) => {
            if (index == i) {
                return {
                    ...experience,
                    company: value
                }
            } else {
                return experience
            }
        }))
    }

    const handleChangeExperienceDescription = (index: number, value: string) => {
        setExperiences(experiences.map((experience, i) => {
            if (index == i) {
                return {
                    ...experience,
                    description: value
                }
            } else {
                return experience
            }
        }))
    }

    const clearRewrite = (index: number) => {
        setRewrites((prevArray) => {
            const newArray = prevArray.filter((_, i) => i !== index);
            return newArray;
        });
    }

    return (
        <section id="experience" className="mt-3 relative group">
            <hr className="mb-3"></hr>
            <h2 className="mx-2 text-2xl font-bold mb-3">Experience</h2>
            <button
                    onClick={handleSuggestions}
                    className="absolute opacity-0 top-4 -left-5 group-hover:opacity-100 opacity drop-shadow-none scale-1 hover:brightness-105 hover:drop-shadow-[0_1px_1px_rgba(226,220,245,1)] hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#B9A9EB"
                        viewBox="0 0 24 24"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                    </svg>
            </button>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2`}
                        >
                            <div className="flex gap-2 items-center">
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
                            </div>
                            <button
                                onClick={() =>
                                    setSuggestions((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="#00000066"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {experiences.map((experience, index) =>
                <div key={index} >
                    {index > 0 && <hr className="my-3"></hr>}
                    <div className="w-full max-w-full flex gap-2">
                        <TextField
                            name="position"
                            placeholder="Position"
                            onChange={(e) => handleChangeExperiencePosition(index, e.target.value)}
                            className="font-semibold w-full"
                            value={experience.position}
                        />
                        <TextField
                            name="company"
                            placeholder="Company"
                            onChange={(e) => handleChangeExperienceCompany(index, e.target.value)}
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
                        onChange={(e) => handleChangeExperienceDescription(index, e.target.value)}
                        value={experience.description}
                    />
                    {rewrites[index] && <>
                        <div className="bg-black bg-opacity-5 rounded-lg px-4 py-2 mb-2">
                        <div className="w-full flex justify-between mt-1">
                            <div />
                            <span className="text-center text-xs font-bold opacity-50">
                                Rewrite
                            </span>
                            <button onClick={() => { clearRewrite(index) }}>
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
                    }
                </div>
            )}
            <button
                onClick={handleAddExperience}
                className="bg-black bg-opacity-10 transition-opacity rounded-lg p-1 w-full flex justify-center hover:bg-opacity-15 active:bg-opacity-20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00000066" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </section>
    )
}

export default Experience;
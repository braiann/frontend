import { useDispatch, useSelector } from "react-redux";
import { Resume } from "../types/resume";
import { RootState } from "../store";
import Cross from "./icons/Cross";
import { addSkill, removeSkill } from "../store/resumeSlice";
import { useState } from "react";
import SuggestionsButton from "./SuggestionsButton";
import removeByIndex from "../utils/removeByIndex";
import Header from "./Header";

const Skills = ({ animatingOut }: { animatingOut: boolean }) => {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    const dispatch = useDispatch();

    const [currentSkill, setCurrentSkill] = useState("");
    const [suggestedSkills, setSuggestedSkills] = useState([]);

    const handleSuggestions = async () => {
        const prompt = `Generate an array of strings (NO OTHER OUTPUT, no backticks, no other notation other than the opening brackets, the strings in double quotes, and the commas separating the skills) with suggested skills based on the context of the user resume, in the same language as input language. Do not answer back any other text just the plain JSON. This is the context and input skills so you don't repeat:
            Skills: ${JSON.stringify(resume.skills)}
            Bio: ${resume.bio}
            Name: ${resume.name}
            Education: ${JSON.stringify(resume.education)}
            Experience: ${JSON.stringify(resume.experience)}
            (Answer in input language). No placeholders, all text should be final. No brackets to fill in, no blanks.`;

        const apiUrl =
            process.env.NEXT_PUBLIC_GENERATE_API_URL ||
            "http://localhost:5000/api/generate";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: prompt }),
        });
        const results = JSON.parse(await response.text());

        setSuggestedSkills(results);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(addSkill(currentSkill));
            setCurrentSkill("");
        } else if (
            (e.key === "Backspace" || e.key === "Delete") &&
            currentSkill === ""
        ) {
            dispatch(removeSkill(resume.skills.length - 1));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSkill(e.target.value);
    };

    const addSkillFromSuggestions = (index: number) => {
        dispatch(addSkill(suggestedSkills[index]));
        setSuggestedSkills((prev) => removeByIndex(prev, index));
    };

    return (
        <section
            id="skills"
            className={`relative group animate-blur-zoom-in ${
                animatingOut ? "animate-blur-zoom-out" : ""
            }`}
        >
            <Header h2>Skills</Header>
            <SuggestionsButton
                onClick={handleSuggestions}
                className="top-4 -left-5"
            />
            <div className="flex gap-2 w-full p-2 border-2 border-black border-opacity-10 rounded-md">
                <ul className="flex gap-2 flex-wrap gap-y-3">
                    {resume.skills.map((skill, index) => (
                        <li
                            key={skill}
                            className="flex gap-1 text-nowrap bg-pink-600 text-white rounded-xl px-2 py-1 -my-1 -ml-1"
                        >
                            <span>{skill}</span>
                            <button
                                className="scale-75"
                                onClick={() => dispatch(removeSkill(index))}
                            >
                                <Cross color="white" strokeWidth={3} />
                            </button>
                        </li>
                    ))}
                    <li
                        className={resume.skills.length > 0 ? "w-32" : "w-full"}
                    >
                        <input
                            type="text"
                            className="outline-none bg-transparent w-full -mx-2 -my-1 px-2 py-1"
                            placeholder="Add a skill"
                            value={currentSkill}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                        />
                    </li>
                </ul>
            </div>
            <ul className="flex gap-2 flex-wrap pt-2">
                {suggestedSkills.map((suggestedSkill, index) => (
                    <li
                        key={suggestedSkill}
                        className="flex gap-1 bg-[linear-gradient(25deg,rgba(214,143,214,0.7)-50%,rgba(0,129,167,0.6)100%)] text-white rounded-xl px-2 py-1"
                    >
                        <button
                            onClick={() => addSkillFromSuggestions(index)}
                            className="w-full h-full -mx-2 px-2 pr-4"
                        >
                            {suggestedSkill}
                        </button>
                        <button
                            className="scale-75 opacity-50 pr-2 -mx-2 transition-all hover:opacity-70 hover:scale-90"
                            onClick={() =>
                                setSuggestedSkills((prev) =>
                                    removeByIndex(prev, index)
                                )
                            }
                        >
                            <Cross color="white" strokeWidth={3} />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;

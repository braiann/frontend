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

const Experience = () => {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);

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
        console.log(experiences)
    };

    return (
        <section id="experience" className="mt-5">
            <h2 className="mx-2 text-2xl font-bold mb-1">Experience</h2>
            {experiences.map((experience, index) =>
                <div key={index} >
                    <div className="mb-2 w-full max-w-full">
                        <TextField
                            name="position"
                            placeholder="Position"
                            onChange={() => ""}
                        />
                        <input type="date" />
                        <span> - </span>
                        <input type="date" />
                    </div>
                    <TextArea
                        name="description"
                        value={experiences[index].description}
                        onChange={() => ""}
                    />
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
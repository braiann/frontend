import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Resume } from "../types/resume";
import Header from "./Header";

const FinalReview = () => {
    const resume: Resume = useSelector((state: RootState) => state.resume);

    return (
        <section id="final-review" className="min-h-96 h-full overflow-y-auto">
            <Header h1>{resume.name}</Header>
            <p className="text-sm opacity-85">{resume.bio}</p>
            <div className="mt-7 overflow-x-hidden ">
                <h2 className="text-2xl font-bold mb-3 w-screen max-w-sm select-none">
                    Experience
                </h2>
                {resume.experience.map((exp, index) => (
                    <div key={index} className="mt-2">
                        <Header h3>{exp.position}</Header>
                        <p>{exp.company}</p>
                        <p className="text-xs opacity-80">
                            {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-sm mb-4">{exp.description}</p>
                    </div>
                ))}
            </div>
            <div className="overflow-x-hidden">
                <h2 className="text-2xl font-bold mb-3 w-screen max-w-sm select-none">
                    Education
                </h2>
                {resume.education.map((edu, index) => (
                    <div key={index} className="mt-2">
                        <Header h3>{edu.title}</Header>
                        <p>{edu.institution}</p>
                        <p className="text-xs opacity-80">
                            {edu.startDate} - {edu.endDate}
                        </p>
                        <p className="text-sm mb-4">{edu.description}</p>
                    </div>
                ))}
            </div>
            <div className="overflow-x-hidden">
                <h2 className="text-2xl font-bold mb-3 w-screen max-w-sm select-none">
                    Skills
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {resume.skills.map((skill, index) => (
                        <div key={index} className="text-sm">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FinalReview;

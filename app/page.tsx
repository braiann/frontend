"use client";

import React, { useState } from "react";
import TextField from "./components/TextField";
import Spacer from "./components/Spacer";
import Bio from "./components/Bio";
import { RootState } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { updateName } from "./store/resumeSlice";
import { Resume } from "./types/resume";
import WorkExperience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import GradientBackground from "./components/GradientBackground";

export default function Home() {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);

    const steps = [
        <>
            <TextField
                name="name"
                value={resume.name}
                onChange={(e) => dispatch(updateName(e.target.value))}
                placeholder="Full name"
                className="text-4xl max-w-sm ring-transparent outline-none border-none"
                autofocus
            />
            <Spacer size="20px" />
            <Bio />
        </>,
        <WorkExperience />,
        <Education />,
        <Skills />,
    ];

    return (
        <Provider store={store}>
            <main className="flex flex-col max-w-lg mx-auto py-10 px-10 bg-white bg-opacity-65 ring-2 ring-black ring-opacity-5 rounded-3xl h-fit">
                {steps[step]}
                <div className="flex justify-between mt-10 -mb-8 -mx-8">
                    {step > 0 ? (
                        <button
                            onClick={() =>
                                setStep((prev) => (prev - 1 < 0 ? 0 : prev - 1))
                            }
                            className="bg-black bg-opacity-15 text-white rounded-full w-12 transition-all opacity-100 h-w-12 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                        >
                            {"<-"}
                        </button>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={() =>
                            setStep((prev) =>
                                prev + 1 >= steps.length ? prev : prev + 1
                            )
                        }
                        className="bg-teal-500 text-white rounded-full w-12 h-w-12 transition-all opacity-100 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                    >
                        {"->"}
                    </button>
                </div>
            </main>
        </Provider>
    );
}

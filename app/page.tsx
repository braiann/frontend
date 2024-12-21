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
import Card from "./Card";
import AddMoreSections from "./components/AddMoreSections";

export default function Home() {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);
    const [animatingOut, setAnimatingOut] = useState(false);

    const steps = [
        <div
            className={`animate-blur-zoom-in ${
                animatingOut ? "animate-blur-zoom-out" : ""
            }`}
        >
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
        </div>,
        <WorkExperience animatingOut={animatingOut} />,
        <Education animatingOut={animatingOut} />,
        <Skills animatingOut={animatingOut} />,
        <AddMoreSections animatingOut={animatingOut} />,
    ];

    const handleGoToNextStep = async () => {
        if (step + 1 >= steps.length) return;
        setAnimatingOut(true);
        console.log(animatingOut);
        setTimeout(() => {
            setAnimatingOut(false);
            console.log(animatingOut);
            setStep((prev) => prev + 1);
        }, 300);
    };

    const handleGoToPreviousStep = async () => {
        if (step - 1 < 0) return;
        setAnimatingOut(true);
        console.log(animatingOut);
        setTimeout(() => {
            setAnimatingOut(false);
            console.log(animatingOut);
            setStep((prev) => prev - 1);
        }, 300);
    };

    return (
        <Provider store={store}>
            <Card>
                <main>
                    <div
                        className={`w-96 transition-all flex flex-col justify-between relative`}
                    >
                        {steps[step]}
                        <Spacer size="2.5rem" />
                        <div className="flex justify-between -mb-8 -mx-8">
                            {step > 0 ? (
                                <button
                                    onClick={handleGoToPreviousStep}
                                    className="text-teal-600 select-none   rounded-full w-12 transition-all opacity-100 h-w-12 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                                >
                                    {"<-"}
                                </button>
                            ) : (
                                <div />
                            )}
                            <button
                                onClick={handleGoToNextStep}
                                className="bg-teal-500 text-white rounded-full w-12 h-w-12 transition-all opacity-100 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                            >
                                {"->"}
                            </button>
                        </div>
                    </div>
                </main>
            </Card>
        </Provider>
    );
}

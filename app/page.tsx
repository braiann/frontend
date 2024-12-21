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
    const [animatingOut, setAnimatingOut] = useState(false);
    const [wh, setWH] = useState([100, 100]);

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
    ];

    const handleGoToNextStep = async () => {
        if (step + 1 >= steps.length) return;
        setAnimatingOut(true);
        setTimeout(() => {
            setAnimatingOut(false);
            setStep((prev) => prev + 1);
        }, 300);
    };

    const handleGoToPreviousStep = async () => {
        if (step - 1 < 0) return;
        setAnimatingOut(true);
        setWH([0, 0]);
        setTimeout(() => {
            setAnimatingOut(false);
            setWH([100, 100]);
            setStep((prev) => prev - 1);
        }, 300);
    };

    return (
        <Provider store={store}>
            <main
                className="flex flex-col max-w-lg mx-auto py-10 opacity-0 px-10 bg-white bg-opacity-65 ring-2 ring-black ring-opacity-5 rounded-3xl h-fit animate-blur-zoom-in blur-[10]"
                style={{ animationDelay: "0.5s" }}
            >
                <div
                    className={`w-96 transition-all flex flex-col justify-between`}
                >
                    {steps[step]}
                    <Spacer size="2.5rem" />
                    <div className="flex justify-between -mb-8 -mx-8">
                        {step > 0 ? (
                            <button
                                onClick={handleGoToPreviousStep}
                                className="bg-black select-none bg-opacity-15 text-white rounded-full w-12 transition-all opacity-100 h-w-12 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
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
        </Provider>
    );
}

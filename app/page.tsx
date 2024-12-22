"use client";

import React, { useEffect, useState } from "react";
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
import Card from "./components/Card";
import AddMoreSections from "./components/AddMoreSections";
import FinalReview from "./components/FinalReview";
import printToPDF from "./utils/printToPDF";

export default function Home() {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);
    const [animatingOut, setAnimatingOut] = useState(false);

    const steps = [
        <div
            key={0}
            className={`animate-blur-zoom-in ${
                animatingOut ? "animate-blur-zoom-out" : ""
            }`}
        >
            <TextField
                key={1}
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
        <WorkExperience key={2} animatingOut={animatingOut} />,
        <Education key={3} animatingOut={animatingOut} />,
        <Skills key={4} animatingOut={animatingOut} />,
        <AddMoreSections key={5} animatingOut={animatingOut} />,
        <FinalReview key={6} />,
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

    useEffect(() => {
        const warmUpServer = async () => {
            try {
                const response = await fetch("/api/warmup");
                if (!response.ok) {
                    throw new Error("Failed to contact server");
                }
            } catch (e) {
                console.log(e);
            }
        };
    }, []);

    return (
        <Provider store={store}>
            <Card fullscreen={step === steps.length - 1}>
                <main className={step === steps.length - 1 ? "h-full" : ""}>
                    <div
                        className={`w-96 transition-all flex flex-col justify-between relative ${
                            step === steps.length - 1 ? "h-full" : ""
                        }`}
                    >
                        {steps[step]}
                        <Spacer size="2.5rem" />
                        <div
                            className={`flex justify-between select-none -mx-8 ${
                                step === steps.length - 1
                                    ? "-mb-[4.5rem]"
                                    : "-mb-8"
                            }`}
                        >
                            {step > 0 ? (
                                <button
                                    onClick={handleGoToPreviousStep}
                                    className="text-teal-600 rounded-full w-12 transition-all opacity-100 h-w-12 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                                >
                                    {"<-"}
                                </button>
                            ) : (
                                <div />
                            )}
                            {step < steps.length - 1 && (
                                <button
                                    onClick={handleGoToNextStep}
                                    className="bg-teal-500 text-white rounded-full w-12 h-w-12 transition-all opacity-100 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                                >
                                    {"->"}
                                </button>
                            )}
                            {step === steps.length - 1 && (
                                <button
                                    onClick={() => printToPDF(resume)}
                                    className="bg-cyan-700 text-white flex items-center justify-center rounded-full w-12 h-w-12 transition-all opacity-100 aspect-square text-xl brightness-100 hover:opacity-70 active:brightness-90 active:opacity-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </Card>
        </Provider>
    );
}

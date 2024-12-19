"use client";

import React from "react";
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

export default function Home() {
    const resume: Resume = useSelector((state: RootState) => state.resume);
    const dispatch = useDispatch();

    return (
        <Provider store={store}>
            <main className="flex flex-col max-w-lg mx-auto py-10">
                <TextField
                    name="name"
                    value={resume.name}
                    onChange={(e) => dispatch(updateName(e.target.value))}
                    placeholder="Full name"
                    className="text-4xl ring-transparent outline-none border-none"
                />
                <Spacer size="20px" />
                <Bio />
                <WorkExperience />
                <Education />
                <Skills />
            </main>
        </Provider>
    );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience, Resume, Study } from "../types/resume";

const initialState: Resume = {
    name: "",
    bio: "",
    experience: [],
    education: [],
    skills: []
};

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        updateName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        updateBio(state, action: PayloadAction<string>) {
            state.bio = action.payload;
        },
        updateExperience(
            state,
            action: PayloadAction<{index: number; newExperience: Experience}>
        ) {
            const { index, newExperience } = action.payload;
            if (index >= 0 && index < state.experience.length) {
                state.experience[index] = newExperience;
            } else if (index === state.experience.length) {
                state.experience.push(newExperience);
            } else {
                console.error("Invalid index.");
            }
        },
        removeExperience(state, action: PayloadAction<number>) {
            const index = action.payload;
            if (index >= 0 && index < state.experience.length) {
                state.experience.splice(index, 1);
            } else {
                console.error("Invalid index.");
            }
        },
        updateEducation(
            state,
            action: PayloadAction<{index: number, newStudy: Study }>
        ) {
            const { index, newStudy } = action.payload;
            if (index >= 0 && index < state.education.length ) {
                state.education[index] = newStudy;
            } else if (index === state.education.length) {
                state.education.push(newStudy);
            } else {
                console.error("Invalid index.");
            }
        },
        removeEducation(state, action: PayloadAction<number>) {
            const index = action.payload;
            if (index >= 0 && index < state.education.length) {
                state.education.splice(index, 1);
            } else {
                console.error("Invalid index.");
            }
        },
        addSkill(state, action: PayloadAction<string>) {
            if (action.payload) {
                state.skills.push(action.payload);
            }
        },
        removeSkill(state, action: PayloadAction<number>) {
            const index = action.payload;
            if (index >= 0 && index < state.skills.length) {
                state.skills.splice(index, 1);
            } else {
                console.error("Invalid index.");
            }
        }
    }
});

export const { updateName, 
    updateBio, 
    updateExperience, 
    removeExperience,
    updateEducation, 
    removeEducation,
    addSkill,
    removeSkill
} = resumeSlice.actions;
export default resumeSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience, Resume } from "../types/resume";

const initialState: Resume = {
    name: "",
    bio: "",
    experience: [],
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
                console.error("Invalid index for experience update");
            }
        }
    }
});

export const { updateName, updateBio, updateExperience } = resumeSlice.actions;
export default resumeSlice.reducer;
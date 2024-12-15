import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume } from "../types/resume";

const initialState: Resume = {
    name: "",
    bio: "",
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
    }
});

export const { updateName, updateBio } = resumeSlice.actions;
export default resumeSlice.reducer;
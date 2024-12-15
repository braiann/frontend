import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResumeState {
    name: string;
}

const initialState: ResumeState = {
    name: "",
};

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        updateName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        }
    }
});

export const { updateName } = resumeSlice.actions;
export default resumeSlice.reducer;
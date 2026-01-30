import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LanguageState = {
    language: string
}

const initialState: LanguageState = {
    language: 'en-US'
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
        clearLanguage(state) {
            state.language = 'en-US';
        }
    },
})

export const { setLanguage, clearLanguage } = languageSlice.actions;
export default languageSlice.reducer;



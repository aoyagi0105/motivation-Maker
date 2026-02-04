import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MotivationIdState = {
    lastMotivationId: number;
}

const initialState: MotivationIdState = {
    lastMotivationId: 1
}

const MotivationIdSlice = createSlice({
    name: 'lastMotivationId',
    initialState,
    reducers: {
        setLastMotivationId(state, action: PayloadAction<number>) {
            state.lastMotivationId = action.payload
        },
        clearLastMotivationId(state) {
            state.lastMotivationId = 0
        },
        increseMotivationId(state) {
            state.lastMotivationId += 1
        },
        initialMotivationId(state) {
            state.lastMotivationId = 1
        }
    }
})

export const { setLastMotivationId, clearLastMotivationId, increseMotivationId, initialMotivationId } = MotivationIdSlice.actions;
export default MotivationIdSlice.reducer;
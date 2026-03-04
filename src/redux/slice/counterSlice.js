import { createSlice } from "@reduxjs/toolkit"

export const counterClice = createSlice({
    name: 'counter', // Reducer name
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => { // These are actions
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        }
    }
});

export const { increment, decrement, reset } = counterClice.actions;
export default counterClice.reducer;
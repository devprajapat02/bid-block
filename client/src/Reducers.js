import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    display: "Dashboard"
}

export const reducer = createReducer(initialState, {
    "SET_DISPLAY": (state, action) => {
        state.display = action.payload
    }
})

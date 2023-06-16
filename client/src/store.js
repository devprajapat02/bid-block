import {configureStore} from "@reduxjs/toolkit"
import {reducer} from "./Reducers.js"

const store = configureStore({
    reducer: {
        custom: reducer,
    },
})

export default store
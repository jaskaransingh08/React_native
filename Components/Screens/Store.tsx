import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./CreateSlice"

export const store= configureStore(
    {
        reducer:{
            todos:todoSlice
        }
    }
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
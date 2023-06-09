import { configureStore } from "@reduxjs/toolkit";
import { usersSlices } from "./slices/users/usersSlices";

export const store = configureStore({
    reducer: {
        users: usersSlices.reducer,
        
    }
})
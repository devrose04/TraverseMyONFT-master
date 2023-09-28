/** @format */
import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./reducers/wallet";
import contractReducer from "./reducers/contract";
import cardReducer from "./reducers/cards";

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        contract: contractReducer,
        cards: cardReducer,
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

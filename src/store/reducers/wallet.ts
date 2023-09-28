import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: false,
    provider: {},
    address: "",
    connectedChainId: 0,
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        connect: (state, action) => {
            state.isConnected = true;
            state.provider = action.payload.provider;
            state.address = action.payload.address;
            state.connectedChainId = action.payload.connectedChainId;
        },
        disConnect: (state) => {
            state.isConnected = false;
            state.provider = {};
            state.address = "";
        },
        changeChain: (state, action) => {
            state.connectedChainId = action.payload.chainId;
        },
        changeAccount: (state, action) => {
            state.address = action.payload.address;
        },
    },
});

export const { connect, disConnect, changeChain, changeAccount } =
    walletSlice.actions;

export default walletSlice.reducer;

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";
import { changeChain, connect, disConnect } from "../store/reducers/wallet";
import { chainIdToInfo } from "../utils/chainConfig";

export const connectWallet = async (dispatch: any = () => {}) => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "12803c9f5919455ba1ac0be83197d502", // required
                chainId: 1,
                mobileLinks: ["metamask", "trust", "imtoken"],
                rpc: {
                    56: "https://bsc-dataseed.binance.org/", // BSC
                    137: "https://polygon-mainnet.g.alchemy.com/v2/ma3nP6ZZCpI81yCWIBz2fPOD2BNBrVP5", // Polygon
                    250: "https://rpc.ftm.tools", // Fantom
                    42161: "https://arb1.arbitrum.io/rpc", // Arbitrum
                    80001: "https://rpc-mumbai.matic.today", // Mumbai
                },
            },
        },
    };
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });
    try {
        const provider = await web3Modal.connect();
        web3Modal.clearCachedProvider();
        const web3Instance = new Web3(provider);
        let account = (await web3Instance.eth.getAccounts())[0];
        const chainId = await web3Instance.eth.getChainId();
        if (!account) {
            await provider.request({
                method: "eth_requestAccounts",
            });
            account = (await web3Instance.eth.getAccounts())[0];
        }
        dispatch(
            connect({
                provider: provider,
                address: account,
                connectedChainId: chainId,
            })
        );
    } catch (e) {}
};

export const disConnectWallet = (dispatch: any = () => {}) => {
    dispatch(disConnect());
};

export const switchNetwork = async (
    provider: any,
    chainId: any,
    dispatch: any
) => {
    if (!provider) return;
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });

        dispatch(
            changeChain({
                chainId: chainId,
            })
        );
    } catch (err: any) {
        // if no chain found request to add
        if (
            err.code === 4902 ||
            /Unrecognized chain ID/.test(err.message || err)
        )
            return await provider.request({
                method: "wallet_addEthereumChain",
                params: [chainIdToInfo[chainId].configs],
            });
        console.log("switchNetwork", err);
    }
};

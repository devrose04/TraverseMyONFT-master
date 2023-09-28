/** @format */

export const chainIdToInfo = {
    "0x1": {
        lzChainId: 101,
        rpcURL: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        blockExplorer: "https://etherscan.io",
        chainName: "Ethereum",

        configs: {
            name: "Ethereum Mainnet",
            chain: "ETH",
            network: "mainnet",
            icon: "ethereum",
            rpc: [
                `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
                `wss://mainnet.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
                "https://api.mycryptoapi.com/eth",
                "https://cloudflare-eth.com",
            ],
            faucets: [],
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            infoURL: "https://ethereum.org",
            shortName: "eth",
            chainId: "0x1",
            networkId: 1,
            slip44: 60,
            ens: { registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
            explorers: [
                {
                    name: "etherscan",
                    url: "https://etherscan.io",
                    standard: "EIP3091",
                },
            ],
        },
        lzEntryPoint: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
    },
    "0x89": {
        lzChainId: 109,
        rpcURL: "https://polygon-rpc.com",
        blockExplorer: "https://polygonscan.com",
        chainName: "Polygon",
        configs: {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
        },
        lzEntryPoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    },
    "0x38": {
        lzChainId: 102,
        rpcURL: "https://bsc-dataseed.binance.org",
        blockExplorer: "https://bscscan.com",
        chainName: "BSC",
        configs: {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com/"],
        },
        lzEntryPoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    },
    "0xa86a": {
        lzChainId: 106,
        rpcURL: "https://api.avax.network/ext/bc/C/rpc",
        blockExplorer: "https://snowtrace.io",
        chainName: "Avalanche",
        configs: {
            chainId: "0xa86a",
            chainName: "Avalanche Mainnet",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
            },
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://snowtrace.io"],
        },
        lzEntryPoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    },
    "0xfa": {
        lzChainId: 112,
        rpcURL: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com",
        chainName: "Fantom",
        configs: {
            chainId: "0xfa",
            chainName: "Fantom Opera",
            nativeCurrency: {
                name: "FTM",
                symbol: "FTM",
                decimals: 18,
            },
            rpcUrls: ["https://rpcapi.fantom.network/"],
            blockExplorerUrls: ["https://ftmscan.com/"],
        },
        lzEntryPoint: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    },

    /************************* TESTNETS *************************/
    "0xa869": {
        lzChainId: 10106,
        rpcURL: "https://api.avax-test.network/ext/bc/C/rpc",
        blockExplorer: "https://testnet.snowtrace.io/",
        chainName: "Avalanche Testnet",
        configs: {
            chainId: "0xa869",
            chainName: "Avalanche Testnet",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
            },
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://testnet.snowtrace.io"],
        },
        lzEntryPoint: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
    },
    "0x5": {
        lzChainId: 10121,
        rpcURL: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        blockExplorer: "https://goerli.etherscan.io/",
        chainName: "Goerli Testnet",
        configs: {
            chainId: "0x5",
            chainName: "Goerli Testnet",
            nativeCurrency: {
                name: "TETH",
                symbol: "TETH",
                decimals: 18,
            },
            rpcUrls: [
                "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            ],
            blockExplorerUrls: ["https://goerli.etherscan.io"],
        },
        lzEntryPoint: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
    },
    "0x61": {
        lzChainId: 10102,
        rpcURL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        blockExplorer: "https://testnet.bscscan.com/",
        chainName: "BNB Testnet",
        configs: {
            chainId: "0x61",
            chainName: "BNB Testnet",
            nativeCurrency: {
                name: "TBNB",
                symbol: "TBNB",
                decimals: 18,
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
        lzEntryPoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
    },
    "0x13881": {
        lzChainId: 10109,
        rpcURL: "https://matic-mumbai.chainstacklabs.com/",
        blockExplorer: "https://mumbai.polygonscan.com/",
        chainName: "Polygon Mumbai",
        configs: {
            chainId: "0x13881",
            chainName: "Polygon Mumbai",
            nativeCurrency: {
                name: "Matic",
                symbol: "Matic",
                decimals: 18,
            },
            rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com"],
        },
        lzEntryPoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
    },
} as any;

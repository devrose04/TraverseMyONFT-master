export const getNavigableURL = (urlString: string) => {
    if (urlString && /ipfs:\/\//.test(urlString))
        return `https://ipfs.moralis.io:2053/ipfs/${
            urlString.split("ipfs://")[1]
        }`;

    return urlString;
};

export const shortenAddress = (address: string) =>
    `${address.slice(0, 5)}...${address.slice(-5)}`;

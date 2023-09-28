import styled from "styled-components";
import { NormalButton } from "../../theme/components";
import { ChainSelect } from "./chainSelect";
import { useEffect, useState } from "react";
import { CHAIN_COLORS, CHAIN_NAMES, CHAIN_TYPES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getNavigableURL, shortenAddress } from "../../utils/helper";
import { chainIdToInfo } from "../../utils/chainConfig";
import Web3 from "web3";
import ABI_ERC721 from "../../assets/abis/basicERC721.abi.json";
import traverseAbi from "../../assets/abis/traverse.abi..json";
import travereseAbiV2 from "../../assets/abis/ONFT.json";
import entrypointAbi from "../../assets/abis/entrypoint.abi.json";
import { BigNumber } from "@ethersproject/bignumber";
import { switchNetwork } from "../../controllers/wallet";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: all 0.3s;

    &.active {
        opacity: 1;
        pointer-events: auto;
        user-select: auto;
    }
`;

const DialogOverlay = styled.div`
    position: fixed;
    z-index: 98;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
`;

const TraverseModalContent = styled.div`
    position: relative;
    padding: 2px;
    width: 1100px;
    max-width: 90%;
    background: linear-gradient(
        135deg,
        rgba(37, 53, 217, 1) 0%,
        rgba(255, 14, 100, 1) 100%
    );
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    top: 50%;
    z-index: 99;
    border-radius: 11px;
    box-shadow: inset -3px 4px 224px -26px rgba(0, 0, 0, 0.24);
`;

const ModalContainer = styled.div`
    overflow: auto;
    max-height: calc(90vh - 4px);

    background: #1e1e1e;
    border-radius: 11px;
    padding: 3rem;
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;

    img {
        width: 21px;
        transition: all 0.3s;

        &:hover {
            filter: invert(0.5);
        }
    }
`;

const NFTInfoWrapper = styled.div`
    color: white;

    .bg-text {
        font-weight: 500;
        font-size: 28px;
        line-height: 28px;
    }

    .sm-text {
        font-weight: 500;
        font-size: 18px;
    }
`;

const NFTImage = styled.div`
    img {
        width: 380px;
        height: 380px;
    }
`;

const NFTTitle = styled.div`
    font-weight: 500;
    font-size: 40px;
`;

const ChainWrapper = styled.div`
    width: 800px;
    max-width: 90%;
    color: white;
`;

const ChainItem = styled.div`
    position: relative;
    z-index: 50;

    .bg-text {
        font-weight: 500;
        font-size: 28px;
        line-height: 35px;
    }

    .chainName {
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
    }

    .destChain {
        border: 2px solid #fffbf7;
        width: 111px;
        height: 111px;
        border-radius: 100vw;

        &.border-none {
            border: none;
        }
    }

    .chainPreviewImg {
        width: 111px;
        height: 111px;
    }
`;

const TraverseBtn = styled(NormalButton)`
    font-weight: 500;
    font-size: 28px;
    color: white;
    border-radius: 11px;
    padding: 1rem 1.25rem;
    background: linear-gradient(89.66deg, #2535d9 9.12%, #ff0e64 100.7%);

    &:disabled {
        background: transparent;
        opacity: 0.3;
        border: 2px solid #fffbf7;
        color: white;
    }
`;

const ChainLine = styled.div`
    width: 0;
    left: 125px;
    top: 95px;
    position: absolute;
    height: 10px;
    background: white;
    z-index: 10;
    transition: width 0.5s;
    border-radius: 20px;

    &.active {
        width: calc(100% - 280px) !important;
    }
`;

const NFTSingle = ({ cards }: any) => {
    const card = cards[0];

    return (
        <NFTInfoWrapper className="flex items-center gap-8 relative mb-8">
            <NFTImage>
                <img
                    alt="pic"
                    placeholder="/assets/imgs/nft_placeholder.png"
                    src={getNavigableURL(card.image)}
                />
            </NFTImage>

            <div
                className="flex flex-col gap-4"
                style={{ width: "calc(100% - 380px - 2rem)" }}
            >
                <NFTTitle>{card.name}</NFTTitle>

                <div className="flex flex-col">
                    <div className="bg-text">Description</div>

                    <div className="sm-text">{card.name}</div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-text">Source Contract</div>

                    <div className="sm-text">
                        {shortenAddress(card.contract)}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-text">NFT ID</div>

                    <div className="sm-text">{card.tokenId}</div>
                </div>
            </div>
        </NFTInfoWrapper>
    );
};

const NFTImageGroup = styled.div`
    display: inline-flex;
    width: 60%;
    height: 295px;
    filter: drop-shadow(9px 7px 18px rgba(0, 0, 0, 0.3));

    .groupItem {
        position: absolute;
        top: 0;

        img {
            width: 295px;
        }
    }
`;

const NFTList = styled.div`
    width: 35%;
    height: 295px;
    border-radius: 8px;
    padding: 5px;
    background: linear-gradient(
        90deg,
        rgba(37, 53, 217, 1) 0%,
        rgba(255, 14, 100, 1) 100%
    );

    .nftListContainer {
        color: white;
        background: #1e1e1e;
        border-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        overflow: auto;
    }
`;

const NFTLessTen = ({ nftCount, cards }: any) => {
    return (
        <div className="flex mb-8 justify-between">
            <NFTImageGroup className="relative">
                {cards.map((card: any, index: number) => (
                    <div
                        key={`nftgroup${index}`}
                        className="groupItem"
                        style={{
                            left: `calc((100% - 295px) / ${
                                nftCount - 1
                            } * ${index})`,
                        }}
                    >
                        <img alt="pic" src={getNavigableURL(card.image)} />
                    </div>
                ))}
            </NFTImageGroup>

            <NFTList className="relative">
                <div className="nftListContainer w-full h-full p-4">
                    {cards.map((card: any) => (
                        <div key={`cardname${card.tokenId}`}>{card.name}</div>
                    ))}
                </div>
            </NFTList>
        </div>
    );
};

const NFTGroupFrame = styled.div`
    position: relative;
    width: 45%;

    img {
        width: 100%;
    }

    .nftContents {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 3rem;
        padding-top: 4.5rem;
        padding-bottom: 1rem;
        padding-left: 2rem;

        .item {
            filter: drop-shadow(9px 7px 18px rgba(0, 0, 0, 0.3));

            img {
                width: 64px;
            }
        }

        .nftCount {
            font-weight: 500;
            font-size: 40px;
            color: white;
        }
    }
`;

const NFTMoreTen = ({ nftCount, cards }: any) => {
    return (
        <div className="flex mb-8 justify-around items-center">
            <NFTGroupFrame>
                <img alt="pic" src="/assets/imgs/nftGroupFrame.svg" />

                <div className="nftContents">
                    <div className="flex gap-4 justify-center items-center flex-wrap">
                        {cards.map((card: any) => (
                            <div
                                className="item"
                                key={`imgGroup${card.tokenId}`}
                            >
                                <img
                                    alt="pic"
                                    src={getNavigableURL(card.image)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="nftCount w-full text-center mt-4">
                        {nftCount} NFTS
                    </div>
                </div>
            </NFTGroupFrame>

            <NFTList className="relative">
                <div className="nftListContainer w-full h-full p-4">
                    {cards.map((card: any) => (
                        <div key={`cardname${card.tokenId}`}>{card.name}</div>
                    ))}
                </div>
            </NFTList>
        </div>
    );
};

const TraversingContent = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    font-size: 40px;
    font-weight: 500;

    img {
        width: 600px;
    }
`;

const TraversingState = {
    Before: 0x01,
    Traversing: 0x02,
    After: 0x03,
};

interface TraverseModalProps {
    active: boolean;
    onClose: VoidFunction;
    nftCount: number;
    chainId: string;
    setBlock: any;
}

export const TraverseModal = ({
    active,
    onClose,
    nftCount,
    chainId,
    setBlock,
}: TraverseModalProps) => {
    const dispatch = useDispatch();

    const cardsState = useSelector((state: any) => state.cards);
    const walletState = useSelector((state: any) => state.wallet);

    const [selectedChain, setSelectedChain] = useState(null);

    const [isTraversing, setIsTraversing] = useState(TraversingState.Before);
    const [isSuccess, setIsSuccess] = useState(false);

    const getSelectedChainCards = () => {
        return cardsState.selectedCards.filter(
            (card: any) => card.chainId === chainId
        );
    };

    const onClickTraverse = async () => {
        if (!selectedChain) return;

        const destChainId = chainIdToInfo[selectedChain].lzChainId;
        const srcEntryPoint = chainIdToInfo[chainId].lzEntryPoint;
        const web3Instance = new Web3(walletState.provider);

        const selectedCards = getSelectedChainCards();

        if (!selectedCards.length) return;

        console.error(walletState.connectedChainId, chainId);
        if (walletState.connectedChainId !== chainId) {
            await switchNetwork(walletState.provider, chainId, dispatch);
        }

        const version = selectedCards[0].version;
        const contractAddress = selectedCards[0].contract;

        setIsTraversing(TraversingState.Traversing);

        try {
            if (version === 1) {
                const tokenId = selectedCards[0].tokenId;

                const contractInstance = new web3Instance.eth.Contract(
                    traverseAbi,
                    contractAddress
                ) as any;
                const endpointInstance = new web3Instance.eth.Contract(
                    entrypointAbi,
                    srcEntryPoint
                ) as any;
                const payload = web3Instance.eth.abi.encodeParameters(
                    ["address", "uint16"],
                    [contractAddress, tokenId]
                );
                const adapterParams = web3Instance.utils.encodePacked(
                    { value: 1, type: "uint16" },
                    { value: 350000, type: "uint256" }
                );
                const crossGas = await endpointInstance.methods
                    .estimateFees(
                        destChainId,
                        contractAddress,
                        payload,
                        false,
                        adapterParams
                    )
                    .call();
                try {
                    await new Promise((resolve, reject) => {
                        contractInstance.methods
                            .traverseChains(destChainId, tokenId)
                            .send({
                                from: walletState.address,
                                value: crossGas[0],
                            })
                            .once("transactionHash", function (txHash: any) {
                                console.log(txHash);
                            })
                            .once("receipt", async (receipt: any) => {
                                resolve(receipt);
                            })
                            .on("error", reject);
                    });

                    setIsSuccess(true);
                    setBlock((prev: number) => prev + 1);
                } catch (err) {
                    setIsTraversing(TraversingState.After);
                    console.error(err);
                }
            } else if (version === 2) {
                const selectedTokenIds = selectedCards.map(
                    (card: any) => card.tokenId
                );

                const contractInstance = new web3Instance.eth.Contract(
                    travereseAbiV2,
                    contractAddress
                ) as any;

                let minGasToTransferAndStore: any =
                    await contractInstance.methods
                        .minDstGasLookup(destChainId, 1)
                        .call();
                let transferGasPerToken: any = await contractInstance.methods
                    .dstChainIdToTransferGas(destChainId)
                    .call();

                let adapterParams = web3Instance.utils.encodePacked(
                    { value: 1, type: "uint16" },
                    {
                        value: BigNumber.from(minGasToTransferAndStore)
                            .add(BigNumber.from(transferGasPerToken))
                            .mul(BigNumber.from(selectedTokenIds.length)),
                        type: "uint256",
                    }
                );

                let fees: any = await contractInstance.methods
                    .estimateSendBatchFee(
                        destChainId,
                        walletState.address,
                        [...selectedTokenIds],
                        false,
                        adapterParams
                    )
                    .call();
                console.log(`fees[0] (wei): ${fees[0]}}`);

                try {
                    let tx = await contractInstance.methods
                        .sendBatchFrom(
                            walletState.address, // 'from' address to send tokens
                            destChainId, // remote LayerZero chainId
                            walletState.address, // 'to' address to send tokens
                            [...selectedTokenIds], // tokenIds to send
                            walletState.address, // refund address (if too much message fee is sent, it gets refunded)
                            "0x0000000000000000000000000000000000000000", // address(0x0) if not paying in ZRO (LayerZero Token)
                            adapterParams // flexible bytes array to indicate messaging adapter services
                        )
                        .send({
                            from: walletState.address,
                            value: fees[0],
                        });
                    console.log(` tx: ${tx.transactionHash}`);

                    setIsSuccess(true);
                    setBlock((prev: number) => prev + 1);
                } catch (e: any) {
                    setIsTraversing(TraversingState.After);
                    if (
                        e.error?.message.includes(
                            "Message sender must own the OmnichainNFT."
                        )
                    ) {
                        console.log(
                            "*Message sender must own the OmnichainNFT.*"
                        );
                    } else if (
                        e.error?.message.includes(
                            "This chain is not a trusted source source."
                        )
                    ) {
                        console.log(
                            "*This chain is not a trusted source source.*"
                        );
                    } else {
                        console.log(e);
                    }
                }
            }
        } catch (err: any) {
            setIsTraversing(TraversingState.After);
        }

        setIsTraversing(TraversingState.After);
    };

    return (
        <ModalWrapper className={`${active ? "active" : ""}`}>
            <DialogOverlay onClick={onClose} />

            <TraverseModalContent className="relative">
                <ModalContainer className="w-full h-full">
                    <CloseBtn onClick={onClose}>
                        <img alt="pic" src="/assets/icons/close.svg" />
                    </CloseBtn>

                    {isTraversing === TraversingState.Before ? (
                        <>
                            {nftCount === 1 ? (
                                <NFTSingle cards={getSelectedChainCards()} />
                            ) : nftCount <= 10 ? (
                                <NFTLessTen
                                    nftCount={nftCount}
                                    cards={getSelectedChainCards()}
                                />
                            ) : (
                                <NFTMoreTen
                                    nftCount={nftCount}
                                    cards={getSelectedChainCards()}
                                />
                            )}

                            <ChainWrapper className="relative flex justify-between m-auto">
                                <ChainItem className="flex flex-col justify-start items-center gap-2">
                                    <div className="bg-text">Source Chain</div>

                                    <img
                                        className="chainPreviewImg"
                                        alt="pic"
                                        src={`/assets/imgs/chain/${CHAIN_NAMES[chainId]}.png`}
                                    />

                                    <div className="chainName">
                                        {CHAIN_NAMES[chainId]}
                                    </div>
                                </ChainItem>

                                <ChainItem className="flex flex-col justify-start items-center gap-2">
                                    <div className="bg-text">
                                        Destination Chain
                                    </div>

                                    <div
                                        className={`destChain ${
                                            selectedChain ? "border-none" : ""
                                        }`}
                                    >
                                        {selectedChain && (
                                            <img
                                                className="rounded-full"
                                                alt="pic"
                                                src={`/assets/imgs/chain/${CHAIN_NAMES[selectedChain]}.png`}
                                            />
                                        )}
                                    </div>

                                    <ChainSelect
                                        selectedChain={selectedChain}
                                        setSelectedChain={setSelectedChain}
                                        chainId={chainId}
                                    />
                                </ChainItem>

                                <ChainLine
                                    id={"chainLine"}
                                    className={`${
                                        selectedChain ? "active" : ""
                                    }`}
                                    style={{
                                        background: `linear-gradient(
                                90deg,
                                ${CHAIN_COLORS[CHAIN_TYPES["Ethereum"]]} 0%,
                                ${
                                    selectedChain
                                        ? CHAIN_COLORS[selectedChain]
                                        : "#fff"
                                } 100%
                            )`,
                                    }}
                                />
                            </ChainWrapper>

                            <div className="relative w-full flex justify-center items-center">
                                <TraverseBtn
                                    disabled={!selectedChain}
                                    onClick={onClickTraverse}
                                >
                                    Traverse
                                </TraverseBtn>
                            </div>
                        </>
                    ) : isTraversing === TraversingState.Traversing ? (
                        <TraversingContent className="flex flex-col justify-center items-center gap-8">
                            <img src="/assets/imgs/traversing.gif" alt="pic" />
                            Traversing...
                        </TraversingContent>
                    ) : isTraversing === TraversingState.After ? (
                        <TraversingContent className="flex flex-col justify-center items-center gap-8">
                            <img
                                src="/assets/imgs/afterTraversing.png"
                                alt="pic"
                            />
                            {isSuccess ? "All Set!" : "Something went wrong!"}
                        </TraversingContent>
                    ) : null}
                </ModalContainer>
            </TraverseModalContent>
        </ModalWrapper>
    );
};

export default TraverseModal;

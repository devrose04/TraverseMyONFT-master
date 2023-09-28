import styled from "styled-components";
import NavBar from "../../components/NavBar";
import WalletInfo from "../../components/WalletInfo";
import ChainNFT from "../../components/ChainNFT";
import { CHAIN_TYPES } from "../../constants";
import { Footer } from "../../components/Footer";
import { ToolBar } from "../../components/ToolBar";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Wrapper = styled.div`
    position: relative;
    min-height: calc(100vh - 104px);

    .backgroundWrapper {
        background-image: url("/assets/imgs/website_background.png");
        background-size: 100% auto;

        padding: 100px 0 50px 0;

        &:before {
            background-image: url("/assets/imgs/white-area-top.svg");
            padding: 14%;
            top: -27.7vw;
            position: absolute;
            width: 100%;
            display: block;
            content: "";
            background-repeat: none;
            background-position: center;
            background-size: cover;
            pointer-events: none;
        }
    }
`;

const ContentWrapper = styled.div`
    width: 80%;
    margin: auto;
`;

const Space = styled.div`
    position: relative;
    height: 100px;
`;

const HeaderTitle = styled.div`
    color: #fff;
    font-size: 36px;
    font-family: Futura-Bold;
    font-weight: 500;
`;

const HeaderText = styled.div`
    color: #fff;
    font-size: 18px;
    font-family: Futura;
    font-weight: 500;
`;

const NFT_INFO = [
    {
        img: "1.png",
        name: `Material World #19048`,
    },
    {
        img: "2.png",
        name: `Zeuz #895`,
    },
    {
        img: "3.png",
        name: `Zeuz #895`,
    },
    {
        img: "4.png",
        name: `Zeuz #895`,
    },
    {
        img: "5.png",
        name: `Zeuz #895`,
    },
    {
        img: "6.png",
        name: `Zeuz #895`,
    },
];

export const Gallery = () => {
    const { address: searchAddress } = useParams();

    const walletState = useSelector((state: any) => state.wallet);
    const cardsState = useSelector((state: any) => state.cards);

    const isActiveChain = (chainId: string) => {
        if (!cardsState.filteredChains.length) return true;

        return cardsState.filteredChains.indexOf(chainId) !== -1;
    };

    return (
        <>
            <Wrapper className="relative w-screen">
                <NavBar />

                <Space />
                <div className="container m-auto">
                    <ContentWrapper>
                        <div
                            className="relative m-auto"
                            style={{ width: "90%" }}
                        >
                            <HeaderTitle>
                                The First Universal ONFT Traversal Site
                            </HeaderTitle>

                            <HeaderText className="my-8">
                                The purpose of ONFT Traverse is to provide a
                                user-friendly experience for moving an ONFT or
                                group of ONFTs from one chain to another. ONFT
                                Traverse leverages LayerZero’s protocol to allow
                                simple and secure cross-chain transfers without
                                directly interacting with a smart contract or
                                block explorer.
                            </HeaderText>
                        </div>

                        <WalletInfo />

                        {(walletState.isConnected || searchAddress) && (
                            <>
                                <ToolBar />

                                {Object.keys(CHAIN_TYPES).map(
                                    (key: string, index: number) => (
                                        <ChainNFT
                                            key={`chainnfts${index}`}
                                            chainType={
                                                CHAIN_TYPES[
                                                    key as keyof typeof CHAIN_TYPES
                                                ]
                                            }
                                            walletAddress={
                                                searchAddress
                                                    ? searchAddress
                                                    : walletState.address
                                            }
                                            cards={NFT_INFO.slice(0, 5)}
                                            active={isActiveChain(
                                                CHAIN_TYPES[
                                                    key as keyof typeof CHAIN_TYPES
                                                ]
                                            )}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </ContentWrapper>
                </div>

                <Space />
            </Wrapper>

            <Footer />
        </>
    );
};

export default Gallery;

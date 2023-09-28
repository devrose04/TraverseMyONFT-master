import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { ReactComponent as SubstractSVG } from "../../assets/imgs/Subtract.svg";
import { CHAIN_COLORS, CHAIN_NAMES } from "../../constants";
import NFTCard from "./NFTCard";
import { NormalButton } from "../../theme/components";
import TraverseModal from "../TraverseModal";
import { useEffect, useState } from "react";
import { getContractsByChainIdAPI } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { insertCardsArray } from "../../store/reducers/cards";

const Wrapper = styled.div`
    margin: 2rem 0;
    margin-bottom: 6rem;

    .substractSVG {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 10;
    }
`;

const Title = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 1rem;
    width: 18%;
    height: 7%;
    z-index: 1;
    color: white;
    font-size: 28px;
    padding-bottom: 1%;
    padding-right: 2%;
`;

export const CheckBox = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;

    .m-checkbox__input {
        position: relative;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        appearance: none;
        outline: none;
        background: #252224;
        cursor: pointer;
        border: 2px solid #ff0e64;

        &:checked::before {
            top: 2px;
            right: 2px;
            bottom: 2px;
            left: 2px;
        }

        &:before {
            content: " ";
            position: absolute;
            top: 50%;
            right: 50%;
            bottom: 50%;
            left: 50%;
            transition: all 0.1s;
            background: #ff0e64;
        }
    }

    .m-checkbox__label {
        user-select: none;
        position: relative;
        flex-shrink: 0;
        padding: 0.5rem 0.5rem;
        color: #fff;
        cursor: pointer;
    }
`;

const NFTWrapper = styled.div`
    width: 99%;
    height: 80%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    top: 10%;
    padding-left: 5%;
    padding-right: 5%;
    overflow: auto;
`;

const TraverseBtn = styled(NormalButton)`
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    font-size: 1.1rem;
`;

export const ChainNFT = ({ chainType, walletAddress, active }: any) => {
    const walletState = useSelector((state: any) => state.wallet);

    const isMyWallet =
        walletState.isConnected && walletAddress === walletState.address;

    const cardsState = useSelector((state: any) => state.cards);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState(null);

    const [block, setBlock] = useState(0);

    const getSelectedChainCards = () => {
        return cardsState.selectedCards.filter(
            (card: any) => card.chainId === chainType
        );
    };

    const selectedCardsCount = getSelectedChainCards().length;

    const getCards = async () => {
        const res = await getContractsByChainIdAPI(chainType, walletAddress);

        setCards(res.data.result);

        res.data.result.forEach((item: any) => {
            dispatch(
                insertCardsArray({
                    chainId: chainType,
                    info: item,
                })
            );
        });
    };

    useEffect(() => {
        setCards(null);

        getCards();
    }, [chainType, walletAddress, block]);

    // useEffect(() => {
    //     if (cards) {
    //         setInterval(() => {
    //             console.error("1h1h23123---------------------------");

    //             getCards();
    //         }, 10000);
    //     }
    // });

    const onChangeSelectAll = (ev: any) => {
        const isChecked = ev.target.checked;

        const chainCards = cardsState.cardsArray.filter(
            (card: any) => card.chainId === chainType
        );

        if (isChecked && chainCards.length > 1) {
            if (
                chainCards[0].info.version !== 2 ||
                chainCards[0].info.token_address !==
                    chainCards[1].info.token_address
            ) {
                NotificationManager.warning(
                    "Not all of these collections support batch traversing."
                );

                // if (chainCards[0].info.version !== 2)
                //     NotificationManager.warning(
                //         "This collection does not support batch traversing."
                //     );

                // if (
                //     chainCards[0].info.token_address !==
                //     chainCards[1].info.token_address
                // )
                //     NotificationManager.warning(
                //         "Only can select same collections."
                //     );

                return;
            }
        }

        chainCards.forEach(({ info: card }: any) => {
            const id = `chainNFT${chainType}${card.token_id}${card.token_address}`;

            const element = document.getElementById(id);

            if (element?.getElementsByTagName("input")[0].checked !== isChecked)
                document.getElementById(id)?.click();
        });
    };

    const getSearchCards = () => {
        if (cardsState.searchValue && cardsState.searchValue !== "") {
            const filteredCards = (cards as any).filter(
                (card: any) =>
                    card.name
                        .toUpperCase()
                        .indexOf(cardsState.searchValue.toUpperCase()) !== -1
            );

            return filteredCards;
        } else {
            return cards;
        }
    };

    const isSelectedAll = () => {
        if (cards && (cards as any).length > 0) {
            return selectedCardsCount === (cards as any).length;
        }

        return false;
    };

    return (
        <Wrapper
            className={`${
                !active || (cards && !(cards as any).length) ? "hidden" : ""
            } relative`}
        >
            <SubstractSVG
                className="substractSVG"
                fill={CHAIN_COLORS[chainType]}
            />

            <Title
                style={{ background: CHAIN_COLORS[chainType] }}
                className="flex justify-center items-center gap-2"
            >
                <img
                    alt="pic"
                    src={`/assets/icons/chain/${CHAIN_NAMES[chainType]}.svg`}
                    style={{
                        height: 30,
                    }}
                />
                {CHAIN_NAMES[chainType]}
            </Title>

            {isMyWallet && (
                <CheckBox>
                    <label
                        className="m-checkbox__label"
                        htmlFor={`selectAllInput${chainType}`}
                    >
                        Select All
                    </label>
                    <input
                        type={"checkbox"}
                        className="m-checkbox__input"
                        id={`selectAllInput${chainType}`}
                        onChange={onChangeSelectAll}
                        checked={isSelectedAll()}
                    />
                </CheckBox>
            )}

            <NFTWrapper className="flex gap-8 flex-wrap">
                {!cards
                    ? new Array(5)
                          .fill(10)
                          .map((card: any, index: number) => (
                              <NFTCard
                                  key={`card${index}`}
                                  card={card}
                                  loading={true}
                              />
                          ))
                    : getSearchCards().map((card: any, index: number) => (
                          <NFTCard
                              key={`card${index}`}
                              card={card}
                              chainId={chainType}
                              isMyWallet={isMyWallet}
                          />
                      ))}
            </NFTWrapper>

            {isMyWallet && (
                <>
                    <TraverseBtn
                        className="z-10 bottom-4"
                        onClick={() => setShowModal(true)}
                        disabled={!selectedCardsCount}
                    >
                        Traverse
                    </TraverseBtn>

                    {showModal && (
                        <TraverseModal
                            active={showModal}
                            onClose={() => setShowModal(false)}
                            nftCount={selectedCardsCount}
                            chainId={chainType}
                            setBlock={setBlock}
                        />
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default ChainNFT;

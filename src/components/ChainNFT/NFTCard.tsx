import styled, { keyframes } from "styled-components";
import { CheckBox } from ".";
import { getNavigableURL } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addSelected, removeSelected } from "../../store/reducers/cards";
import { NotificationManager } from "react-notifications";

const loading = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }

    100% {
        opaicty: 1;
    }
`;

const Card = styled.div`
    box-shadow: 18px 17px 56px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    width: 321px;
    padding: 1px;
    cursor: pointer;
    height: fit-content;

    .cardLoad {
        animation: 2s ${loading} linear infinite;
    }

    .nftContent {
        height: 100%;
        background: #1e1e1e;
        border-radius: 9px;
    }

    .cardImage {
        width: 287px;
        height: 287px;
    }

    &:hover {
        background: linear-gradient(
            135deg,
            rgba(37, 53, 217, 1) 0%,
            rgba(255, 14, 100, 1) 100%
        );
    }
`;

const Loading = styled.div`
    background: linear-gradient(
        90deg,
        rgba(217, 217, 217, 0.21) 0%,
        rgba(255, 255, 255, 0.85) 81.54%,
        rgba(217, 217, 217, 0.22) 100%
    );
    opacity: 0.57;
    border-radius: 2px;
    height: 12px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: white;
`;

export const NFTCard = ({ card, loading, chainId, isMyWallet }: any) => {
    const cardsState = useSelector((state: any) => state.cards);
    const dispatch = useDispatch();

    const {
        contract_type: contractType,
        token_address: contract,
        token_id: tokenId,
        version: version,
    } = card;
    const image = !loading && card.metadata.image;
    const name = !loading && card.metadata.name;

    const getSelectedChainCards = () => {
        return cardsState.selectedCards.filter(
            (card: any) => card.chainId === chainId
        );
    };

    const isSelected =
        getSelectedChainCards().findIndex(
            (item: any) =>
                item.chainId === chainId &&
                item.contract === contract &&
                item.tokenId === tokenId
        ) !== -1;

    const onClickCard = () => {
        if (loading || !isMyWallet) return;

        const selectedCards = getSelectedChainCards();

        if (!isSelected) {
            if (
                selectedCards.length > 0 &&
                (selectedCards[0].version !== 2 ||
                    selectedCards[0].contract !== contract)
            ) {
                if (selectedCards[0].version !== 2)
                    NotificationManager.warning(
                        "This collection does not support batch traversing."
                    );

                if (selectedCards[0].contract !== contract)
                    NotificationManager.warning(
                        "Only can select same collections."
                    );

                return;
            }

            dispatch(
                addSelected({
                    chainId,
                    contract,
                    tokenId,
                    image,
                    name,
                    version,
                })
            );
        } else {
            dispatch(
                removeSelected({
                    chainId,
                    contract,
                    tokenId,
                })
            );
        }
    };

    return (
        <Card
            id={`chainNFT${chainId}${tokenId}${contract}`}
            className={`relative flex flex-col justify-center items-center`}
            onClick={onClickCard}
        >
            <div className="nftContent p-4">
                {loading ? (
                    <div className="cardLoad flex flex-col gap-4">
                        <img alt="pic" src="/assets/imgs/nft_placeholder.png" />

                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <img
                                className="cardImage"
                                alt="pic"
                                placeholder="/assets/imgs/nft_placeholder.png"
                                src={getNavigableURL(card.metadata.image)}
                            />

                            <Title>{card.metadata.name}</Title>
                        </div>

                        {isMyWallet && (
                            <div className="flex justify-end w-full">
                                <CheckBox style={{ position: "relative" }}>
                                    <input
                                        type={"checkbox"}
                                        className="m-checkbox__input"
                                        value={"on"}
                                        checked={isSelected}
                                        onChange={() => {}}
                                    />
                                </CheckBox>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    );
};

export default NFTCard;

import { useSelector } from "react-redux";
import styled from "styled-components";
import { shortenAddress } from "../../utils/helper";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    background-color: #4b4a49;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Wallet = styled.div`
    position: relative;
    color: #fffbf6;

    .pic {
        background: #d9d9d9;
        width: 77px;
        height: 77px;
    }

    .address {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        opacity: 0.63;
    }

    .nftCount {
        font-weight: 500;
        font-size: 37px;
        line-height: 37px;

        span {
            font-size: 24px;
            opacity: 0.63;
        }
    }

    .connectWallet {
        font-weight: 600;
        font-size: 24px;
        padding: 0.3rem 1rem;
        border-radius: 3px;
    }
`;

const Search = styled.div`
    height: 44px;
    background: #fff;
    box-shadow: 0px 4px 22px -6px rgba(0, 0, 0, 0.38);
    border-radius: 31px;
    width: 350px;

    input {
        outline: none;
        width: 100%;
        padding-left: 50px;
        padding-right: 1.5rem;
        font-size: 18px;
        background: transparent;
    }
`;

const SearchIcon = styled.img`
    position: absolute;
    transform: translate(0, -50%);
    top: 50%;
    left: 1rem;
`;

export const WalletInfo = () => {
    const navigate = useNavigate();

    const { address: searchAddress } = useParams();

    const walletState = useSelector((state: any) => state.wallet);
    const cardsState = useSelector((state: any) => state.cards);

    const [address, setAddress] = useState("");

    const onChangeAddress = (ev: any) => {
        setAddress(ev.target.value);
    };

    const onSearch = () => {
        if (!address || address.length !== 42) return;

        navigate(`/address/${address}`);

        setAddress("");
    };

    const onKeyDownInput = (ev: any) => {
        if (ev.key === "Enter") onSearch();
    };

    const walletAddress = searchAddress ? searchAddress : walletState.address;

    return (
        <Wrapper className="px-4 py-4">
            <Wallet className="flex justify-center items-center gap-8">
                {walletState.isConnected || searchAddress ? (
                    <>
                        <div className="pic">
                            <img
                                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${walletAddress}&backgroundColor=b6e3f4`}
                                alt="pic"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="address">
                                {shortenAddress(walletAddress)}
                            </div>
                            <div className="nftCount">
                                {cardsState.cardsArray.length} <span>NFTs</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="connectWallet">
                        Please connect your wallet to view omnichain NFTs.
                    </div>
                )}
            </Wallet>

            <Search className="relative flex items-center">
                <div onClick={onSearch}>
                    <SearchIcon alt="pic" src="/assets/imgs/search.svg" />
                </div>

                <input
                    type="text"
                    placeholder="Search by Wallet Address"
                    value={address}
                    onChange={onChangeAddress}
                    onKeyDown={onKeyDownInput}
                />
            </Search>
        </Wrapper>
    );
};

export default WalletInfo;

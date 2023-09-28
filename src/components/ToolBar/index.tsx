import styled from "styled-components";
import { CheckBox } from "../ChainNFT";
import { NormalButton } from "../../theme/components";
import { useState } from "react";
import { CHAIN_NAMES, CHAIN_TYPES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
    addFilteredChains,
    removeFilteredChains,
    setSearchValue,
} from "../../store/reducers/cards";

const ToolBarWrapper = styled.div`
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    margin-left: 7rem;
`;

const SearchInput = styled.div`
    height: 44px;
    background: #1e1e1e;
    border: 1px solid #fffbf7;
    box-shadow: 0px 4px 22px -6px rgba(0, 0, 0, 0.38);
    border-radius: 31px;
    width: 350px;

    input {
        color: #fffbf7;
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

const Setting = styled.div`
    cursor: pointer;

    .settingBtn {
        height: 44px;
        background: #1e1e1e;
        border: 1px solid #fffbf7;
        box-shadow: 0px 4px 22px -6px rgba(0, 0, 0, 0.38);
        border-radius: 31px;
        transition: all 0.5s;

        &.active {
            background: #fffbf7;
            img {
                filter: invert(1);
            }
        }
    }
`;

const HoverWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 257px;
    height: 203px;
    background: url("/assets/imgs/settingPop.svg");
    background-size: cover;
    transition: opacity 0.5s;
    opacity: 0;
    pointer-events: none;
    overflow: auto;

    &.active {
        opacity: 1;
        pointer-events: auto;
    }
`;

const FilterBtn = styled(NormalButton)`
    border-radius: 7px;
    border: 1px solid rgba(255, 251, 247, 1);
    color: rgba(255, 251, 247, 1);
    background: transparent;

    &:hover {
        background: #dadada;
    }

    &:disabled {
        border: 1px solid rgba(255, 251, 247, 0.2);
        color: rgba(255, 251, 247, 0.2);
        background: transparent;
    }
`;

export const ToolBar = () => {
    const cardsState = useSelector((state: any) => state.cards);

    const dispatch = useDispatch();

    const [showSetting, setShowSetting] = useState(false);

    const onSearch = (ev: any) => {
        dispatch(setSearchValue(ev.target.value));
    };

    const isFilteredChain = (chainId: any) => {
        const index = cardsState.filteredChains.indexOf(chainId);

        return index !== -1;
    };

    const onChangeCheckBox = (ev: any, chainId: any) => {
        const checked = ev.target.checked;

        if (checked) dispatch(addFilteredChains(chainId));
        else dispatch(removeFilteredChains(chainId));
    };

    return (
        <ToolBarWrapper className="flex justify-start items-center gap-8">
            <SearchInput className="relative flex items-center">
                <SearchIcon alt="pic" src="/assets/imgs/search_white.svg" />

                <input
                    type="text"
                    placeholder="Search"
                    onChange={onSearch}
                    value={cardsState.searchValue}
                />
            </SearchInput>

            <Setting className="relative">
                <button
                    className={`settingBtn relative z-50 p-4 flex justify-center items-center ${
                        showSetting ? "active" : ""
                    }`}
                    onClick={() => setShowSetting((prev) => !prev)}
                >
                    <img alt="pic" src="/assets/imgs/setting.svg" />
                </button>

                <HoverWrapper
                    className={`z-40 pl-20 ${showSetting ? "active" : ""}`}
                >
                    <div className="p-4">
                        <div className="flex flex-col gap-1/2">
                            {Object.keys(CHAIN_TYPES).map(
                                (key: string, index: number) => (
                                    <CheckBox
                                        key={`checkbox${index}`}
                                        style={{ position: "relative" }}
                                    >
                                        <input
                                            type={"checkbox"}
                                            className="m-checkbox__input"
                                            id={`selectAllInput${index}`}
                                            value={"on"}
                                            checked={isFilteredChain(
                                                CHAIN_TYPES[
                                                    key as keyof typeof CHAIN_TYPES
                                                ]
                                            )}
                                            onChange={(ev) =>
                                                onChangeCheckBox(
                                                    ev,
                                                    CHAIN_TYPES[
                                                        key as keyof typeof CHAIN_TYPES
                                                    ]
                                                )
                                            }
                                        />
                                        <label
                                            className="m-checkbox__label"
                                            htmlFor={`selectAllInput${index}`}
                                        >
                                            {
                                                CHAIN_NAMES[
                                                    CHAIN_TYPES[
                                                        key as keyof typeof CHAIN_TYPES
                                                    ]
                                                ]
                                            }
                                        </label>
                                    </CheckBox>
                                )
                            )}
                        </div>

                        {/* <div className="w-full mt-4 flex justify-center">
                            <FilterBtn disabled>Filter</FilterBtn>
                        </div> */}
                    </div>
                </HoverWrapper>
            </Setting>
        </ToolBarWrapper>
    );
};

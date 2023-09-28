import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CHAIN_NAMES, CHAIN_TYPES } from "../../constants";

const MoveToRight = keyframes`
    0% {
        transform: translate(-100px);
    }

    100% {
        transform: translate(0px);
    }
`;

const ChainSelectWrapper = styled.div`
    #states-button {
        border-radius: 23px;
        position: relative;
        z-index: 20;
    }

    #dropdown-states {
        position: absolute;
        background: #141414;
        border-radius: 23px;
        color: white;
        padding-top: 40px;
        overflow: auto;

        &.active {
            display: block;
        }

        .option {
            animation: ${MoveToRight} 0.3s;
        }
    }
`;

export const ChainSelect = ({
    selectedChain,
    setSelectedChain,
    chainId,
}: any) => {
    const [show, setShow] = useState(false);

    const onClickOption = (chainType: string) => {
        setShow(false);

        setSelectedChain(chainType);
    };

    const getCurrentChainName = () => {
        const index = Object.keys(CHAIN_TYPES).findIndex(
            (chainName: string) =>
                CHAIN_TYPES[chainName as keyof typeof CHAIN_TYPES] === chainId
        );

        return Object.keys(CHAIN_TYPES)[index];
    };

    return (
        <ChainSelectWrapper className="relative">
            <div className="flex flex-col">
                <button
                    id="states-button"
                    data-dropdown-toggle="dropdown-states"
                    className="flex-shrink-0 z-10 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-44"
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                >
                    {!selectedChain
                        ? "Select Chain"
                        : CHAIN_NAMES[selectedChain]}

                    <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-1 absolute right-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    id="dropdown-states"
                    className={`z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
                        show ? "active" : ""
                    }`}
                >
                    <ul
                        className="py-2 text-sm dark:text-gray-200"
                        aria-labelledby="states-button"
                    >
                        {Object.keys(CHAIN_TYPES)
                            .filter((item) => item !== getCurrentChainName())
                            .map((chainName, index) => (
                                <li className="option" key={`chain${index}`}>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 text-sm hover:bg-slate-800"
                                        onClick={() =>
                                            onClickOption(
                                                CHAIN_TYPES[
                                                    chainName as keyof typeof CHAIN_TYPES
                                                ]
                                            )
                                        }
                                    >
                                        <div className="inline-flex items-center gap-2">
                                            <img
                                                className="rounded-full"
                                                alt="pic"
                                                src={`/assets/imgs/chain/${
                                                    CHAIN_NAMES[
                                                        CHAIN_TYPES[
                                                            chainName as keyof typeof CHAIN_TYPES
                                                        ]
                                                    ]
                                                }.png`}
                                                width={20}
                                            />

                                            {
                                                CHAIN_NAMES[
                                                    CHAIN_TYPES[
                                                        chainName as keyof typeof CHAIN_TYPES
                                                    ]
                                                ]
                                            }
                                        </div>
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </ChainSelectWrapper>
    );
};

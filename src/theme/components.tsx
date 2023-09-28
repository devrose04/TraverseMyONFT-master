import styled from "styled-components";

export const InputButton = styled.button`
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    :hover {
        cursor: pointer;

        svg {
            stroke: #986db2 !important;
        }
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const NormalButton = styled.button`
    font-size: 15px;
    line-height: 15px;
    color: #ffffff;
    opacity: 1;

    border-radius: 5px;
    background: #2535d9;
    padding: 10px 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);

    &:hover {
        background: #a3abff;
        color: black;
    }

    &:disabled {
        color: #ffffff;
        background: #2535d9;
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

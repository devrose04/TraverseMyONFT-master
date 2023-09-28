import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import { NormalButton } from "../../theme/components";
import { WalletButton } from "./walletBtn";

const NavBarWrapper = styled.div`
    position: fixed;
    background: linear-gradient(89.66deg, #2535d9 9.12%, #ff0e64 100.7%);
    box-shadow: 0px 11px 25px rgba(0, 0, 0, 0.1);
    opacity: 1;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 99;
    height: 60px;
    top: -60px;
    width: 100vw;
    transition: all 0.5s;

    &.active {
        top: 0;
    }

    @media (max-width: 640px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
`;

const Logo = styled.a`
    position: relative;

    .logo_desktop {
        display: block;
    }

    .logo_mobile {
        display: none;
    }

    img {
        height: 40px;
    }

    @media (max-width: 640px) {
        .logo_desktop {
            display: none;
        }

        .logo_mobile {
            display: block;
        }
    }
`;

export const NavBar = () => {
    const location = useLocation();

    const [active, setActive] = useState(true);
    const scrollRef = useRef(0);

    const handleScroll = () => {
        if (window.scrollY <= scrollRef.current) setActive(true);
        else setActive(false);

        scrollRef.current = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <NavBarWrapper className={`${active ? "active" : ""}`}>
            <div className="container m-auto h-full">
                <div className="flex justify-between items-center px-2 py-2 h-full">
                    <div className="flex items-center justify-center gap-8">
                        <Logo href="/">
                            <img
                                className="logo_desktop"
                                alt="pic"
                                src="/assets/imgs/logo.svg"
                            />

                            <img
                                className="logo_mobile"
                                alt="pic"
                                src="/assets/imgs/logo_mobile.svg"
                            />
                        </Logo>
                    </div>

                    <WalletButton />
                </div>
            </div>
        </NavBarWrapper>
    );
};

export default NavBar;

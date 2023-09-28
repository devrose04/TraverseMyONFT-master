import styled from "styled-components";

const Wrapper = styled.div`
    background: #1d1d1d;
    height: 104px;
    color: #ffffff;
    font-size: 18px;
`;

export const Footer = () => {
    return (
        <Wrapper className="relative p-4">
            <div className="container m-auto relative h-full">
                <div className="flex justify-between items-center px-8 h-full">
                    <div className="flex gap-8 items-center">
                        <div>Powerd by</div>
                        <img
                            alt="pic"
                            src="/assets/imgs/footer_logo.svg"
                            height={42}
                        />
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        <div>Terms</div>
                        <div>Privacy Policy</div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

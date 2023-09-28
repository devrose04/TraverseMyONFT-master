import { useDispatch, useSelector } from "react-redux";
import { NormalButton } from "../../theme/components";
import { connectWallet, disConnectWallet } from "../../controllers/wallet";

export const WalletButton = () => {
    const walletState = useSelector((state: any) => state.wallet);
    const dispatch = useDispatch();

    const onClickWalletBtn = () => {
        if (walletState.isConnected) disConnectWallet(dispatch);
        else connectWallet(dispatch);
    };

    return (
        <NormalButton onClick={onClickWalletBtn}>
            {walletState.isConnected ? "Disconnect" : "Connect Wallet"}
        </NormalButton>
    );
};

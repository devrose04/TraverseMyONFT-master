// apis required for the the fetching data
import axios from "axios";
import { APIS_BASE_URL } from "../constants";

export const getSignInAPI = async (payload: any) => {
    return await axios.post(`${APIS_BASE_URL}/api/signIn`, payload);
};

export const checkTokenAPI = async (accessToken: any) => {
    return await axios({
        method: "get",
        url: `${APIS_BASE_URL}/api/check-token`,
        headers: accessToken
            ? { cookie: `dynaswapToken=${accessToken}` }
            : undefined,
    });
};

export const addContractAPI = async (payload: any) => {
    return await axios.post(`${APIS_BASE_URL}/api/add-contract`, payload);
};

export const getContractsAPI = async (page = 0) => {
    return await axios.get(`${APIS_BASE_URL}/api/get-contracts`, {
        params: { page },
    });
};

export const getContractsByChainIdAPI = async (
    chainId: any,
    account: any,
    cursor = null
) => {
    return await axios.get(`${APIS_BASE_URL}/api/get-contracts-by-chainId`, {
        params: { chainId, account, cursor },
    });
};

export const getContractInfoByAddressAPI = async (
    accessToken: any,
    address: any
) => {
    return await axios.get(
        `${APIS_BASE_URL}/api/get-contract-info-by-address`,
        {
            params: {
                address,
            },
            headers: accessToken
                ? { cookie: `dynaswapToken=${accessToken}` }
                : undefined,
        }
    );
};

export const updateContractInfoByAddressAPI = async (payload: any) => {
    return await axios.post(
        `${APIS_BASE_URL}/api/update-contract-by-address`,
        payload
    );
};

export const deleteContractInfoByAddressAPI = async (address: any) => {
    return await axios.delete(
        `${APIS_BASE_URL}/api/remove-contract-info-by-address`,
        {
            params: { address },
        }
    );
};

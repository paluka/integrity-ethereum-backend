import Web3 from 'web3';

export const web3 = new Web3(`ws://localhost:${process.env.ETHEREUM_CLIENT_PORT}`);
web3.eth.defaultAccount = process.env.ETHEREUM_DEFAULT_ACCOUNT

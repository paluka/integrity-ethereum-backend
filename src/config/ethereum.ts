import Web3 from "web3";
import { AbiItem } from "web3-utils";
import * as dotenv from "dotenv";
import { IntegrityABI } from "./integrityABI";

dotenv.config();

const contractAddress = process.env.ETH_CONTRACT;

if (!process.env.ETH_RPC) {
  console.error("Error: Ethereum RPC server url required");
}
const web3 = new Web3(process.env.ETH_RPC as string);

const IntegrityContract = new web3.eth.Contract(
  IntegrityABI as AbiItem[],
  contractAddress
);

if (IntegrityContract) {
  console.log(
    "Successfully connected to the Ethereum blockchain and smart contract"
  );
} else {
  console.error(
    "Error: Failed to connect to the Ethereum blockchain and smart contract"
  );
}

export default IntegrityContract;

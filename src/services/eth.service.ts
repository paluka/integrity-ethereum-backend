import * as dotenv from "dotenv";
import IntegrityContract from "../config/ethereum";

dotenv.config();

const userAccount = process.env.ETH_ACCOUNT;
const gasAmount = "1000000";

export async function uploadEth(email: string, name: string, hash: string) {
  try {
    const result = await IntegrityContract.methods
      .upload(email, name, hash)
      .send({ from: userAccount, gas: gasAmount });
    return result;
  } catch (error) {
    console.error("ETH error. Unable to upload hash to smart contract", error);
  }
}

export async function verifyEth(email: string, name: string, hash: string) {
  try {
    const result = await IntegrityContract.methods
      .verify(email, name, hash)
      .call({ from: userAccount });
    return result;
  } catch (error) {
    console.error(
      "ETH error. Unable to verify hash using smart contract",
      error
    );
  }
}

export async function randomEth() {
  try {
    const result = await IntegrityContract.methods
      .random()
      .call({ from: userAccount });
    return result;
  } catch (error) {
    console.error(
      "ETH error. Unable to get random value using smart contract",
      error
    );
  }
}

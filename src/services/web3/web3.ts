import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { integrityABI } from "../../constants";
import { sleep } from "../../utils";

export const web3 = new Web3(
  `ws://localhost:${process.env.ETHEREUM_CLIENT_PORT}`
);
web3.eth.defaultAccount = process.env.ETHEREUM_DEFAULT_ACCOUNT;

export const integrityContract = new web3.eth.Contract(
  integrityABI as AbiItem[],
  process.env.ETHEREUM_SMART_CONTRACT_ADDRESS
);

export function uploadData(res, hashedData) {
  integrityContract.methods
    .upload(web3.eth.defaultAccount, hashedData)
    .send({ from: web3.eth.defaultAccount }, async (error, transactonHash) => {
      if (error) {
        console.log("An error occured:", error);
        res.send(`error: ${error}`);
      } else {
        console.log("Hash of the transaction:", transactonHash);
        //res.send(`resulting transaction hash: ${transactonHash}`);

        let expectedBlockTime = 1000;
        let transactionReceipt = null;

        while (transactionReceipt == null) {
          transactionReceipt = await web3.eth.getTransactionReceipt(
            transactonHash
          );
          await sleep(expectedBlockTime);
        }

        console.log(
          "Receipt of the transaction:",
          JSON.stringify(transactionReceipt)
        );
        res.send(
          `resulting transaction receipt: ${JSON.stringify(transactionReceipt)}`
        );
      }

      res.end();
    });
}

export function verifyData(res, hashedData) {
  integrityContract.methods
    .verify(web3.eth.defaultAccount, hashedData)
    .call({ from: web3.eth.defaultAccount }, async (error, result) => {
      if (error) {
        console.log("An error occured:", error);
        res.send(`error: ${error}`);
      } else {
        console.log("File is verified:", result);
        res.send(`file is verified: ${result}`);
      }

      res.end();
    });
}

import express from "express";
import { uploadData, verifyData } from "../services/web3";
// import { integrityContract, web3 } from "../services/web3";
// import { sleep } from "../utils";

const router = express.Router();

router.post("/upload", async (req, res, next) => {
  const hashedData = req.body.hashedData;

  try {
    uploadData(res, hashedData);
    // integrityContract.methods
    //   .upload(web3.eth.defaultAccount, hashedData)
    //   .send(
    //     { from: web3.eth.defaultAccount },
    //     async (error, transactonHash) => {
    //       if (error) {
    //         console.log("An error occured:", error);
    //         res.send(`error: ${error}`);
    //       } else {
    //         console.log("Hash of the transaction:", transactonHash);
    //         //res.send(`resulting transaction hash: ${transactonHash}`);

    //         let expectedBlockTime = 1000;
    //         let transactionReceipt = null;

    //         while (transactionReceipt == null) {
    //           transactionReceipt = await web3.eth.getTransactionReceipt(
    //             transactonHash
    //           );
    //           await sleep(expectedBlockTime);
    //         }

    //         console.log(
    //           "Receipt of the transaction:",
    //           JSON.stringify(transactionReceipt)
    //         );
    //         res.send(
    //           `resulting transaction receipt: ${JSON.stringify(
    //             transactionReceipt
    //           )}`
    //         );
    //       }

    //       res.end();
    //     }
    //   );
  } catch (error) {
    console.log("Error uploading data:", error);
  }
});

router.post("/verify", async (req, res, next) => {
  const hashedData = req.body.hashedData;

  try {
    verifyData(res, hashedData);
    // integrityContract.methods
    //   .verify(web3.eth.defaultAccount, hashedData)
    //   .call({ from: web3.eth.defaultAccount }, async (error, result) => {
    //     if (error) {
    //       console.log("An error occured:", error);
    //       res.send(`error: ${error}`);
    //     } else {
    //       console.log("File is verified:", result);
    //       res.send(`file is verified: ${result}`);
    //     }

    //     res.end();
    //   });
  } catch (error) {
    console.log("Error verifying data:", error);
  }
});

router.get("/health", (req, res, next) => {
  //console.log(web3.eth.accounts.wallet)
  res.send("Status: OK");
});

export default router;

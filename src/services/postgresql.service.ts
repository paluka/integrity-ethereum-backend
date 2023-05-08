import express from "express";
import User from "../models/user";
import { uploadEth, verifyEth } from "./eth.service";

export async function addPgUser(res: express.Response, email: string) {
  try {
    const user = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        transactions: [],
      },
    });

    if (user[1]) {
      console.log("Success: user created", email);
    } else {
      console.log("Success: user already exists", email);
    }
    res.send(user[0].dataValues);
  } catch (error: any) {
    console.error(error.message, email, error.errors);

    res.send("Unable to create the user!");
  }
}

export async function addPgTransaction(
  res: express.Response,
  email: string,
  name: string,
  hash: string
) {
  try {
    if (!email || !name || !hash) {
      throw new Error(
        `Missing data. Email: ${email}, Name: ${name}, Hash: ${hash}`
      );
    }

    const uploadEthResult = await uploadEth(email, name, hash);
    console.log("Upload ETH result:", uploadEthResult);

    if (!uploadEthResult) {
      throw new Error("Error: File hash not uploaded to blockchain!");
    }

    const user = await User.findByPk(email);

    const transactionArray = user.dataValues.transactions;

    let isDuplicate = transactionArray.some(
      (item: string[]) => item[0] === name
    );

    if (isDuplicate) {
      throw new Error("Error: Duplicate file name found!");
    }

    transactionArray.push([name, hash]);
    const result = await User.update(
      { transactions: transactionArray },
      { where: { email } }
    );
    res.send(
      "File has been successfully stored in database and on the blockchain"
    );
  } catch (error: any) {
    console.error(error.message, email, error.errors);

    res.send("Unable to add the transaction for the user!");
  }
}

export async function verifyPgFile(
  res: express.Response,
  email: string,
  name: string,
  hash: string
) {
  try {
    if (!email || !name || !hash) {
      throw new Error(
        `Missing data. Email: ${email}, Name: ${name}, Hash: ${hash}`
      );
    }

    const verifyEthResult = await verifyEth(email, name, hash);
    console.log("Verify ETH result:", verifyEthResult);

    if (!verifyEthResult) {
      throw new Error("Error: File hash not found in blockchain!");
    }

    const user = await User.findByPk(email);

    const transactionArray = user.dataValues.transactions;

    const found = transactionArray.some(
      (item: string[]) => item[0] === name && item[1] === hash
    );

    if (!found) {
      throw new Error("Error: File and hash name not found in database!");
    }

    res.send("File has been successfully verified");
  } catch (error: any) {
    console.error(error.message, email, error.errors);

    res.send("Unable to verify the file!");
  }
}

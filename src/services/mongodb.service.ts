import express from "express";
import User from "../models/user";

export async function addMongoUser(res: express.Response, email: string) {
  try {
    const query = { _id: email };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const user = await User.findOneAndUpdate(query, query, options);

    console.log(user);
    res.send("User created or already exists");
  } catch (error: any) {
    console.error(error.message, email);

    res.send("Unable to create the user!");
  }
}

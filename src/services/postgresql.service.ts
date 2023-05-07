import express from "express";
import User from "../models/user";

export async function addPgUser(res: express.Response, email: string) {
  try {
    const user = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
      },
    });
    console.log("success", user[0].dataValues);

    if (user[1]) {
      res.send("User created");
    } else {
      res.send("User already exists");
    }
  } catch (error: any) {
    console.error(error.message, email, error.errors);

    res.send("Unable to create the user!");
  }
}

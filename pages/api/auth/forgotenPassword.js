import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import User from "../../../db/models/User";
import Token from "../../../db/models/Token";

import sendEmail from "../sendEmail";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email } = req.body;
    //Connect with database
    await connectMongo();
    //Check existing
    const user = await User.findOne({ email });
    //Send error response if duplicate user is found
    if (!user) {
      return res.json({ error: "Не съществуващ и-мейл" });
    }
    let token = await Token.findOne({ userId: ObjectId(user._id) });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: new ObjectId(),
      });
    }
    const message = `
      <h3>За забравена парола в finance statement
      </h2><a href="${process.env.HOST_URL}/changePassword/${user._id}/${token.token}">Натиснете тук</a>
      `;
    await sendEmail(
      process.env.EMAIL_SEND,
      email,
      "Смяна на парола - finance statement",
      message
    );
    return res.status(201).json({
      message: "Успешно изпратена заявка. Вижте си и-мейла",
      isErr: false,
    });
    //Send success response
    //Close DB connection
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

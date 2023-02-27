// Mongodb
import Token from "../../../db/models/Token";
import User from "../../../db/models/User";

import { ObjectId } from "mongodb";
// Validators
import { hash } from "bcryptjs";
import { connectMongo } from "../../../db/connectDb";

async function handler(req, res) {
  //Connect with database
  if (req.method == "POST") {
    await connectMongo();
    const { password, confPassword, token, userId } = req.body;

    const foundToken = await Token.findOne({ token });
    const user = await User.findById(userId);

    if (password != confPassword) {
      return res.json({ error: "Паролите трябва да съвпадат!" });
    }

    if (!foundToken || foundToken?.userId != userId || !user) {
      return res.json({ error: "Невалиден токен" });
    }
    user.password = await hash(password, 12);
    await user.save();
    await Token.deleteOne({ token });

    return res.status(201).json({ message: "Паролата успешно беше сменена !" });
  }
}
export default handler;

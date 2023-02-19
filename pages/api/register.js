import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";
import User from "../../db/models/User";
import Finance from "../../db/models/finance";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { name } = req.body;

    //Connect with database
    await connectMongo();
    //Check existing
    const user = await User.findOne({ name });
    //Send error response if duplicate user is found
    if (user) {
      return res.json({ error: "Вече същестува такова име" });
    }
    const finance = await Finance.create({});
    console.log(finance);
    await User.create({ name });
    mongoose.connection.close();

    return res
      .status(201)
      .json({ message: "Успешно създадохте вашият акаунт", isErr: false });
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

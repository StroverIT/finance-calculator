import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";
import User from "../../db/models/User";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { name } = req.body;
    console.log(name);
    //Connect with database
    await connectMongo();
    //Check existing
    const user = await User.findOne({ name });
    //Send error response if duplicate user is found
    if (!checkExisting) {
      return res.json({ error: "Не съществува такова име" });
    }

    mongoose.connection.close();

    return res.status(201).json({ message: "Успешно изпратена заявка" });
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

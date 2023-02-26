import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";
import User from "../../db/models/User";

import { ObjectId } from "mongodb";
import getTokenFn from "../../lib/getToken";

import Dept from "../../db/models/Dept";

async function handler(req, res) {
  //Only POST mothod is accepted

  if (req.method === "POST") {
    //Getting email and password from body
    const { price, reason, person, date } = req.body;

    //Connect with database
    await connectMongo();
    //Check existing
    const token = await getTokenFn(req);

    const user = await User.findOne({ email: token.email });

    let deptId = user.dept;

    await Dept.updateOne(
      { _id: deptId },
      {
        $push: {
          [`totalSums`]: { reason, price, person, date, _id: new ObjectId() },
        },
      }
    );

    //Send error response if duplicate user is found
    return res.status(201).json({
      message: "Успешно добавихте сума",
      isErr: false,
      _id: user._id,
    });
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

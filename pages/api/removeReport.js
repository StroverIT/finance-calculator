import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import { ObjectId } from "mongodb";

import User from "../../db/models/User";

import Report from "../../db/models/Report";
import getTokenFn from "../../lib/getToken";

async function handler(req, res) {
  //Only POST mothod is accepted
  try {
    const { stateId, type, typeFinance } = req.body;

    //Connect with database
    await connectMongo();
    //Check existing
    const token = await getTokenFn(req);
    console.log("vliza");
    const user = await User.findOne({ email: token.email });
    let reportId = user.report;

    await Report.updateOne(
      { _id: new ObjectId(reportId) },
      { $pull: { [`${type}.totalSums`]: { _id: ObjectId(stateId) } } }
    );

    //Send error response if duplicate user is found
    return res.status(201).json({
      message: "Успешно премахнахте сумата",
      isErr: false,
      _id: user._id,
    });
    //Getting email and password from body
  } catch (e) {
    mongoose.connection.close();

    if (e) {
      console.log(e);
    }
    return res.json({ error: e });
    //Response for other than POST method
  }
}

export default handler;

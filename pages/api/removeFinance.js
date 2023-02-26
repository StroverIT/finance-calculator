import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import { ObjectId } from "mongodb";

import User from "../../db/models/User";

import MonthlyFinance from "../../db/models/MonthlyFinance";
import DailyFinance from "../../db/models/DailyFinance";
import getTokenFn from "../../lib/getToken";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { stateId, type, typeFinance } = req.body;

    //Connect with database
    await connectMongo();
    //Check existing
    const token = await getTokenFn(req);

    const user = await User.findOne({ email: token.email });
    let financeId;
    if (typeFinance == "monthly") {
      financeId = user.monthlyFinance;
    } else if (typeFinance == "daily") {
      financeId = user.dailyFinance;
    }

    const financeUpdateCode = [
      { _id: financeId },
      { $pull: { [`${type}.totalSums`]: { _id: ObjectId(stateId) } } },
    ];
    if (typeFinance == "monthly") {
      await MonthlyFinance.updateOne(...financeUpdateCode);
    } else if (typeFinance == "daily") {
      await DailyFinance.updateOne(...financeUpdateCode);
    }
    //Send error response if duplicate user is found
    return res.status(201).json({
      message: "Успешно премахнахте сумата",
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

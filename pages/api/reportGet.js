import { connectMongo } from "../../db/connectDb";
import mongoose from "mongoose";

import { ObjectId } from "mongodb";

import User from "../../db/models/User";

import Report from "../../db/models/Report";
import getTokenFn from "../../lib/getToken";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body

    const { date } = req.body;
    //Connect with database
    await connectMongo();
    //Check existing

    const token = await getTokenFn(req);
    const user = await User.findOne({ email: token.email }).populate("report");
    const reports = [];

    user.report.totalSums.forEach((report) => {
      if (report.date == date) {
        reports.push(report);
      }
    });
    console.log(reports);
    //Send error response if duplicate user is found
    return res.status(201).json({
      data: reports,
      isErr: false,
    });
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

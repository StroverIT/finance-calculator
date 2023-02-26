import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import User from "../../../db/models/User";

import MonthlyFinance from "../../../db/models/MonthlyFinance";
import DailyFinance from "../../../db/models/DailyFinance";
import Dept from "../../../db/models/Dept";
import Report from "../../../db/models/Report";

import { hash } from "bcryptjs";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { email, password, name } = req.body;
    const errors = [];
    //Validate
    if (!email || !password) {
      errors.push("Всички полета трябва да бъдат попълнени");
    }

    //Connect with database
    await connectMongo();
    //Check existing
    const checkExisting = await User.findOne({ email });
    //Send error response if duplicate user is found
    if (checkExisting) {
      errors.push("Вече съществува такъв и-мейл");
    }

    if (errors.length > 0) {
      mongoose.connection.close();
      return res.status(406).json(errors);
    }

    const monthlyFinance = await MonthlyFinance.create({});
    const dailyFinance = await DailyFinance.create({});
    const dept = await Dept.create({});
    const report = await Report.create({});

    await User.create({
      email,
      password: await hash(password, 12),
      monthlyFinance: monthlyFinance._id,
      dailyFinance: dailyFinance._id,
      dept: dept._id,
      report: report._id,
    });

    return res
      .status(201)
      .json({ message: "Успешно изпратена заявка", isErr: false });
    //Send success response
    //Close DB connection
  } else {
    //Response for other than POST method
    mongoose.connection.close();

    res.status(500).json({ message: "Нещо се обърка..." });
  }
}

export default handler;

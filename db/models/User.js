import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSocialMedia: Boolean,
  monthlyFinance: { type: Schema.Types.ObjectId, ref: "MonthlyFinance" },
  dailyFinance: { type: Schema.Types.ObjectId, ref: "DailyFinance" },
  dept: { type: Schema.Types.ObjectId, ref: "Dept" },
  importantDates: { type: Schema.Types.ObjectId, ref: "ImportantDates" },
  plans: { type: Schema.Types.ObjectId, ref: "Plans" },
});

const User = models.User || model("User", userSchema);

export default User;

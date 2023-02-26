import { Schema, model, models } from "mongoose";

// const sumsObj = {
//   price: Number,
//   reason: String,
// };

function schema(text) {
  return {
    text: { type: String, default: text },
    totalSums: {
      type: Array,
      default: [],
    },
  };
}
const DailyfinanceSchema = new Schema({
  income: schema("Приход:"),
  expense: schema("Разход:"),

  // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const DailyFinance =
  models.DailyFinance || model("DailyFinance", DailyfinanceSchema);

export default DailyFinance;

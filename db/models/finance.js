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
const financeSchema = new Schema({
  income: schema("Приход:"),
  expense: schema("Разход:"),

  // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Finance = models.Finance || model("Finance", financeSchema);

export default Finance;

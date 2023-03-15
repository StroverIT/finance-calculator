import { Schema, model, models } from "mongoose";

function schema(text) {
  return {
    text: { type: String, default: text },
    totalSums: {
      type: Array,
      default: [],
    },
  };
}

const ReportSchema = new Schema({
  income: schema("Приход:"),
  expense: schema("Разход:"),

  // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;

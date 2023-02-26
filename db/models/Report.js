import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  totalSums: {
    type: Array,
    default: [],
  },

  // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;

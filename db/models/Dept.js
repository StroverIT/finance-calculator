import { Schema, model, models } from "mongoose";

const DeptSchema = new Schema({
  totalSums: {
    type: Array,
    default: [],
  },

  // ownerId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Dept = models.Dept || model("Dept", DeptSchema);

export default Dept;

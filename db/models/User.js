import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  finance: { type: Schema.Types.ObjectId, ref: "Finance" },
});

const User = models.User || model("User", userSchema);

export default User;

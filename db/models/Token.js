import { Schema, model, models } from "mongoose";

const tokenScheme = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = models.Token || model("Token", tokenScheme);

export default Token;

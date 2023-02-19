import mongoose from "mongoose";

export const connectMongo = async () =>
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

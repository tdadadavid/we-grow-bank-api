import mongoose from "mongoose";

const connectToDb = async () => {
  return await mongoose.connect(
    "mongodb://root:rootpassword@localhost:9000/weGrow?authSource=admin",
  );
};

export default connectToDb().then();

import mongoose from "mongoose";

const connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL);
    if (connect) {
      console.log("Connection successful");
    } else {
      console.log("error");
    }
  } catch (err) {
    throw err;
  }
};
export default connect;

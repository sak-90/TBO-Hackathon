import mongoose from "mongoose";
import Hospital from "./hospital.model.js";

const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  hospitals: { type: [Hospital.schema], required: true },
});

const City = mongoose.model("City", citySchema);

export default City;

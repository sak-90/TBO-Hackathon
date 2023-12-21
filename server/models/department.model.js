import mongoose from "mongoose";
import Doctor from "./doctor.model.js";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  doctors: { type: [Doctor.schema], required: true },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;

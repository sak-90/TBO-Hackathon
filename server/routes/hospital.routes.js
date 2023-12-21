import { Router } from "express";
import {
  addHospitalController,
  getHospitalsController,
} from "../controllers/hospital.controller.js";

const hospitalRouter = Router();

hospitalRouter.post("/addHospital", addHospitalController);
hospitalRouter.get("/getHospitals/:cityName", getHospitalsController);

export default hospitalRouter;

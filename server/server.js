import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./utils/db_init.js";
import hospitalRouter from "./routes/hospital.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/hospital", hospitalRouter);

await connect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

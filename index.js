import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import ProjectRoter from "./Routes/Project.js";
const app = express();
app.listen(process.env.PORT || 4000, () => {
  console.log("Done Connect To Server..");
});
mongoose
  .connect(
    "mongodb+srv://marwan:3MW9P5ChWi6esAMz@data.st2xw.mongodb.net/projects"
  )
  .then(() => console.log("Done Connect To Database.."))
  .catch((err) => {
    console.log(err.message, "Database Error");
  });

const corsOptions = {
  origin: "https://younesfilm-frontend.vercel.app", // النطاق المسموح به
  // origin: "https://younesfilm-frontend.vercel.app", // النطاق المسموح به
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // السماح بإرسال معلومات الاعتماد
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ extended: true, limit: "1gb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is Working Seccussfully." });
});
app.use("/api", ProjectRoter);

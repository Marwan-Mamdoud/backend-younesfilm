import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import ProjectRoter from "./Routes/Project.js";
import compression from "compression";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: "500mb" })); // Increase the limit as needed
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    parameterLimit: 100000,
    extended: true,
  })
);
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

app.use(compression());

const corsOptions = {
  // origin: "https://younesfilm-frontend.vercel.app", // النطاق المسموح به
  origin: "http://localhost:3000/", // النطاق المسموح به
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // السماح بإرسال معلومات الاعتماد
};

app.use(cors(corsOptions));

// app.use(express.json({ limit: "90mb" }));
// app.use(express.urlencoded({ extended: true, limit: "90mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Master Server is Working Seccussfully." });
});
app.use("/api", ProjectRoter);

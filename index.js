import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import ProjectRoter from "./Routes/Project.js";
import CategoriesRoter from "./Routes/Category.js";
import compression from "compression";
import bodyParser from "body-parser";
const app = express();

app.use(express.json({ limit: "100mb" })); // Set limit to an appropriate value, e.g., 100MB
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(compression());

const corsOptions = {
  origin: [
    // "http://localhost:3000",
    "https://younesfilm-frontend.vercel.app",
    "http://127.0.0.1:5500",
    "https://younes-flim-3fnv.vercel.app",
    "https://www.younesfilm.com",
  ], // النطاق المسموح به
  // origin: "*", // النطاق المسموح به
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"]
  credentials: true, // السماح بإرسال معلومات الاعتماد
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).send("Payload too large");
  }
  // معالجة أنواع أخرى من الأخطاء
  res.status(500).send("Internal Server Error");
});

// app.use(express.json({ limit: "90mb" }));
// app.use(express.urlencoded({ extended: true, limit: "90mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Master Server is Working Seccussfully." });
});
app.use("/api", ProjectRoter);
app.use("/api", CategoriesRoter);
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

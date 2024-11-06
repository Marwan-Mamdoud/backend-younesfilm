import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import ProjectRoter from "./Routes/Project.js";
import CategoriesRoter from "./Routes/Category.js";
import compression from "compression";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: "150mb" })); // Increase the limit as needed
app.use(
  bodyParser.urlencoded({
    limit: "150mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.listen(process.env.PORT || 4000, () => {
  console.log("Done Connect To Server..");
});
mongoose
  .connect(
    "mongodb+srv://marwan:3MW9P5ChWi6esAMz@data.st2xw.mongodb.net/projects",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 40000,
    }
  )
  .then(() => console.log("Done Connect To Database.."))
  .catch((err) => {
    console.log(err.message, "Database Error");
  });

app.use(compression());

const corsOptions = {
  origin: "https://younesfilm-frontend.vercel.app", // النطاق المسموح به
  // origin: "http://localhost:3000", // النطاق المسموح به
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
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

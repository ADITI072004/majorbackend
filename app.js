require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exam");
const studentRoutes = require("./routes/student");

const PORT =  8000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect("mongodb+srv://aditi786:aditi786@cluster0.kcvmvou.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`DB CONNECTION ERR: ${err}`);
  });

app.get("/api/hello", (req, res) => {
  return res.send("Hello");
});

app.use("/api", authRoutes);
app.use("/api", examRoutes);
app.use("/api", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

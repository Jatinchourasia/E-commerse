const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    // to keep db        alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// middlewares

app.use(bodyParser.json()); // bodyparser - parse request coming from frontend
app.use(cookieParser());
// cookieparser-its same but parse from cookie
app.use(cors());

// ROUTES

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments.js");
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
//connecting to database
const mongoConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connection established to the database");
  } catch (err) {
    console.log(err);
  }
};
//to avoid deprecation error
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoConnect();

//routes
app.get("/", (req, res) => {
  res.send("Welcome Home");
});
app.get("/users", (req, res) => {
  res.send("Welcome users");
});

//server listening
app.listen(port, () => {
  console.log(`server up and running on port:${port} `);
});

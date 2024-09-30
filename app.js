require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var PORT = 3000;
var cors = require("cors");

var indexRouter = require("./routes/index.js");

//connect database
const connectDB = require("./config/connectDatabase");

connectDB();
var app = express();

app.use(cors());

//path
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname, "/node_modules/spectre.css/dist")));
app.use(express.static(path.join(__dirname, "/node_modules/chart.js/dist")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening at  PORT ${PORT}`);
});

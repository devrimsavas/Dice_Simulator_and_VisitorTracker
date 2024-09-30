var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

//get
router.get("/", (req, res) => {
  const title = "title";

  if (!req.cookies.userId) {
    const uniqueUserId = Date.now();
    res.cookie("userId", uniqueUserId, { httpOnly: false });
    console.log(`new user id ${req.cookies.userId}`);
  } else {
    console.log(`returning user id : ${req.cookies.userId}`);
  }

  const ip =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const language = req.headers["accept-language"];
  const referer = req.headers["referer"] || "Direct";

  const userBackEndInfo = {
    userIp: ip,
    userAgent: userAgent,
    language: language,
    referer: referer,
  };

  console.log(userBackEndInfo);

  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//post
router.post("/", (req, res, next) => {
  const { diceFaces, rollTimes } = req.body;

  let diceMap = new Map();

  for (let i = 1; i <= rollTimes; i++) {
    let outCome = Math.floor(Math.random() * diceFaces) + 1;

    if (diceMap.has(outCome)) {
      diceMap.set(outCome, diceMap.get(outCome) + 1);
    } else {
      diceMap.set(outCome, 1);
    }
  }

  let result = {};
  diceMap.forEach((value, key) => {
    result[key] = value;
  });

  console.log(result);

  res.json(result);
});

//get info
// Route to handle frontend user data collection
router.post("/user-info", (req, res) => {
  const userInfo = req.body;
  const userId = req.cookies.userId || "unknown";

  // Log user information and cookie ID
  console.log(`User ID: ${userId}`);
  console.log("User info received:", userInfo);

  res.status(200).send("User info received");
});

module.exports = router;

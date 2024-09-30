var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

//get
router.get("/", (req, res) => {
  const title = "title";

  // Check if user has a cookie, if not, set one
  if (!req.cookies.userId) {
    const uniqueUserId = Date.now();
    res.cookie("userId", uniqueUserId, { httpOnly: true }); // Set user cookie
    console.log(`New user ID: ${uniqueUserId}`);
  } else {
    console.log(`Returning user ID: ${req.cookies.userId}`);
  }

  // Serve the index.html file
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

  // Collect IP, user agent, language, and referer from backend
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip === "::1") {
    ip = "127.0.0.1"; // Handle local IPv6 loopback
  }
  const userAgent = req.headers["user-agent"];
  const language = req.headers["accept-language"];
  const referer = req.headers["referer"] || "Direct";

  const userBackEndInfo = {
    userId: userId,
    userIp: ip,
    userAgent: userAgent,
    language: language,
    referer: referer,
  };

  // Combine frontend and backend info into one object
  const combinedUserInfo = { ...userInfo, ...userBackEndInfo };

  // Log the combined user information
  console.log("Combined user info:", combinedUserInfo);

  // Example: Save this data to a database (you can add your database logic here)
  // db.collection('user_visits').insertOne(combinedUserInfo);

  res.status(200).send("User info received and logged.");
});

module.exports = router;

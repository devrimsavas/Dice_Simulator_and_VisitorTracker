var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

router.get("/", (req, res) => {
  const title = "title";

  res.sendFile(path.join(__dirname, "../views/index.html"));
});

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

module.exports = router;

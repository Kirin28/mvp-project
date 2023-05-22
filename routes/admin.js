var express = require('express');
var router = express.Router();
const db = require("../model/helper");


module.exports = router;

router.post("/workouts", async function(req, res, next) {
    try {
      await db(
        `INSERT INTO workouts (title, url, minutes, calories, iscomplete) VALUES("${req.body.title}", "${req.body.url}", ${req.body.minutes}, ${req.body.calories}, 0);`
      );
      const result = await db("SELECT * FROM workouts;");
      res.send(result.data);
    } catch (error) {
      res.status(500).send(error);
    }
  }); 
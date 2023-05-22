var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.send({ title: 'Hello' });
}); */


router.get('/', async function(req, res, next) {
  try {
    const result = await db("SELECT * FROM workouts;");
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get workout by id
router.get("/:id", async function(req, res, next) {
  console.log(req.params)
  try {
    const result = await db(
      `SELECT * FROM workouts WHERE workout_id = ${req.params.id};`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//admins adds a new workout
router.post("/", async function(req, res, next) {
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


module.exports = router;

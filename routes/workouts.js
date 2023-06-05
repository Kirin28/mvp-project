var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//this api will return the whole workouts list: (it's not the homepage (homepage is localhost/api/))
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
  try {
    const result = await db(
      `SELECT * FROM workouts WHERE workout_id = ${req.params.id};`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//admin posts a new workout
router.post("/", async function(req, res, next) {
  try {
    await db(
      `INSERT INTO workouts (title, url, embedID, minutes, calories, iscomplete) VALUES("${req.body.title}", "${req.body.url}", "${req.body.embedID}", ${req.body.minutes}, ${req.body.calories}, 0);`
    );
    const result = await db("SELECT * FROM workouts;");
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
}); 



module.exports = router;

var express = require('express');
var router = express.Router();
const db = require("../model/helper");


module.exports = router;

router.get('/', async function (req, res, next) {
    const keyword = req.query.keyword;
    try {
      const result = await db(`SELECT * FROM workouts LEFT JOIN workout_keyword ON workouts.id = workout_keyword.WorkoutID LEFT JOIN keywords ON keywords.id = workout_keyword.KeywordID WHERE keywords.text LIKE "%${keyword}%";`);
      res.send(result.data);
    } catch(error) {
      res.status(500).send(error);
    }
  })

//just in case
  router.get('/:id', async function (req, res, next) {
    try {
      const result = await db(`SELECT * FROM workout_keyword WHERE id = ${req.params.id};`);
      res.send(result.data);
    } catch(error) {
      res.status(500).send(error);
    }
  })
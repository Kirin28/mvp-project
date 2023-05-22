var express = require('express');
var router = express.Router();
const db = require("../model/helper");
/* GET users listing. */


/* router.get('/', async function(req, res, next) {
  try {
    const result = await db("SELECT * FROM workouts;");
    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
}) */
module.exports = router;

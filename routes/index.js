var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */

router.get('/', async function(req, res, next) {
  try {
    res.send('Hello from Homepage');
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;

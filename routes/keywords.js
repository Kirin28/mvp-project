var express = require('express');
var router = express.Router();
const db = require("../model/helper");

module.exports = router;

router.get('/', async function(req, res, next) {
    try {
      const result = await db("SELECT * FROM keywords;");
      res.send(result.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });
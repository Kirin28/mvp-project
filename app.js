var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var workoutsRouter = require('./routes/workouts');
var searchRouter = require('./routes/search');
var keyRouter = require('./routes/keywords');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors()); //enables Cross-Origin Resource Sharing
app.use(logger('dev')); //logs HTTP requests
app.use(express.json()); //parses incoming JSON data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //handles cookies

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use('/api', indexRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/search', searchRouter);
app.use('/api/keywords', keyRouter);
app.use('/api/users', usersRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

module.exports = app;

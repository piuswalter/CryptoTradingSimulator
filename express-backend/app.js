const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config.js")


const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// define routes
// require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require("./routes/testing-router");

// check .env file within react folder

// parse json requests
app.use(bodyParser.json());

// parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/mongodb-models");

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


// auth routes:

const {verifyRegister}  = require("./app/middlewares");
const controller = require("./app/controllers/auth.controller");

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post(
    "/auth/register",
    [
        verifyRegister.checkDuplicateUsernameOrEmail
    ],
    controller.register
);

app.post("/auth/login", controller.login);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// test case:
app.use("/testing-router", testRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config.js");


const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// require exchange service routes
require('./routes/exchange.routes')(app);

app.use(bodyParser.json());

// parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// database connection
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
const { authJwt } = require("./app/middlewares");
const controller = require("./app/controllers/auth.controller");
const user_controller = require("./app/controllers/user.controller");

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

// user endpoints with verifyToken and verifyBalance/coins middlewares

app.post("/user/balance", [authJwt.verifyToken], user_controller.getUserBalance);

app.post("/user/buy", [authJwt.verifyToken, user_controller.verifyBalance], user_controller.buy);

app.post("/user/sell", [authJwt.verifyToken, user_controller.verifyCoins], user_controller.sell);

app.post("/user/value", [authJwt.verifyToken], user_controller.getUserValue);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
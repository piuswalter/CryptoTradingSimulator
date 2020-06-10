const config = require("../config/auth.config");
const db = require("../mongodb-models");
const User = db.user;
const Logs = db.logs;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Receives register request with username, email and password, writes user to database
exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        balance: 10000,
        bitcoin: 0,
        dash: 0,
        monero: 0,
        ethereum: 0,
        xrp: 0,
        tether: 0,
        bitcoinCash: 0,
        bitcoinSV: 0,
        litecoin: 0,
        eos: 0,
        binancecoin: 0,
        tezos: 0
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            Logs.create({
                username: req.body.username,
                email: req.body.email,
                time: Date(),
                action: "Register",
                status: err
            });
            return;
        }
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                Logs.create({
                    username: req.body.username,
                    email: req.body.email,
                    time: Date(),
                    action: "Register",
                    status: err
                });
                return;
            }
            Logs.create({
                username: req.body.username,
                email: req.body.email,
                time: Date(),
                action: "Register",
                status: "Successfull"
            });
            res.send({ message: "User was registered successfully!" });
        });
    });
};

// Receives username and password from frontend, validates and returns user id, username, email and JWT accesstoken
exports.login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                Logs.create({
                    username: req.body.username,
                    email: req.body.email,
                    time: Date(),
                    action: "Login",
                    status: err
                });
                return;
            }

            if (!user) {
                Logs.create({
                    username: req.body.username,
                    email: req.body.email,
                    time: Date(),
                    action: "Login",
                    status: "User not found"
                });
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                Logs.create({
                    username: req.body.username,
                    email: req.body.email,
                    time: Date(),
                    action: "Login",
                    status: "Invalid password"
                });
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            Logs.create({
                username: req.body.username,
                email: req.body.email,
                time: Date(),
                action: "Login",
                status: "Successfull. Token: " + token
            });
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        });
};



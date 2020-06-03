const db = require("../mongodb-models");
const User = db.user;
const exchange = require("../middlewares/exchange");



exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.getUserBalance = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }
            res.status(200).send({
                username: user.username,
                balance: user.balance,
                bitcoin: user.bitcoin,
                dash: user.dash,
                monero: user.monero,
                ethereum: user.ethereum,
                xrp: user.xrp,
                tether: user.tether,
                bitcoinCash: user.bitcoinCash,
                bitcoinSV: user.bitcoinSV,
                litecoin: user.litecoin,
                eos: user.eos,
                binancecoin: user.binancecoin,
                tezos: user.tezos
            });
        });
};

exports.verifyBalance = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (req.body.value > user.balance) {
                return res.status(404).send({message: "Insufficient funds."});
            } else {
                next();
            }
        })
};

exports.verifyCoins = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            let userCoins = {
                "username": user.username,
                "balance": user.balance,
                "bitcoin": user.bitcoin,
                "dash": user.dash,
                "monero": user.monero,
                "ethereum": user.ethereum,
                "xrp": user.xrp,
                "tether": user.tether,
                "bitcoinCash": user.bitcoinCash,
                "bitcoinSV": user.bitcoinSV,
                "litecoin": user.litecoin,
                "eos": user.eos,
                "binancecoin": user.binancecoin,
                "tezos": user.tezos
            };
            const coinsSold = req.body.value / exchange.getCurrentPrice(req.body.coin);
            const coinBalance = userCoins[req.body.coin];
            if (coinsSold > coinBalance) {
                return res.status(404).send({message: "Insufficient funds."});
            } else {
                // Pass coinsSold to next middleware by adding to request object
                req.coinsSold = coinsSold;
                req.coinBalance = coinBalance;
                next();
            }
        })
};

exports.buy = (req, res) => {
    const coin = req.body.coin;
    const coinsBought = req.body.value / exchange.getCurrentPrice(coin);
    // Build correct query
    let myquery = {balance:-req.body.value};
    myquery[req.body.coin] = coinsBought;
    // Debug: console.log(myquery);

    User.findOneAndUpdate({
        username: req.body.username
    },
        {
            $inc: myquery
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            res.status(200).send({
                balance: user.balance-req.body.value,
                coin: coinsBought

            });
        });
};

exports.sell = (req, res) => {
    const coinsSold = req.coinsSold;
    // Build correct query
    let myquery = {balance:req.body.value};
    myquery[req.body.coin] = -coinsSold;
    // Debug: console.log(myquery);
    User.findOneAndUpdate({
            username: req.body.username
        },
        {
            $inc: myquery
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            res.status(200).send({
                balance: user.balance+parseInt(req.body.value),
                coin: req.coinBalance-coinsSold

            });
        });
};

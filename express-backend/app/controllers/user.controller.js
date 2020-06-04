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
            exchange.getCurrentPrice(req.body.coin)
                .then(function (response) {
                    const coinsSold = parseFloat(req.body.value) / parseFloat(response.data[0].price_usd);
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
                .catch(function (error) {
                    console.log(error);
                });
        })
};

exports.buy = (req, res) => {
    const coin = req.body.coin;
    let coinsBought = 0.0;
    exchange.getCurrentPrice(coin)
        .then(function (response) {
        coinsBought = parseFloat(req.body.value) / parseFloat(response.data[0].price_usd);
        console.log(coinsBought);
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
                        coinsBought: coinsBought

                    });
                });
    })
        .catch(function (error) {
            console.log(error);
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
                newCoinBalance: req.coinBalance-coinsSold

            });
        });
};

exports.getUserValue = (req, res) => {
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
            let userCoins = {
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

            let userValue = user.balance;
            for (i=0; i < 12; i++) {
                const coinsAsArray = Object.entries(userCoins);
                userValue = userValue + coinsAsArray[i][1] * exchange.getCurrentPrice(coinsAsArray[i][0])
            }
            res.status(200).send({
                username: user.username,
                balance: user.balance,
                uservalue: userValue
            });
        });
};
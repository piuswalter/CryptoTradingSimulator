const db = require("../mongodb-models");
const User = db.user;
const Logs = db.logs;
const exchange = require("../middlewares/exchange");

// Receives username from frontend and returns complete portfolio
exports.getUserBalance = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Get user balance",
                    status: err
                });
                return;
            }

            if (!user) {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Get user balance",
                    status: "User not found"
                });
                return res.status(404).send({message: "User Not found."});
            }
            /**
            Logs.create({
                username: req.body.username,
                email: "not provided",
                time: Date(),
                action: "Get user balance",
                status: "Successful"
            });
            */
            // console.log("test");

            return res.status(200).send({
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

// Verifies if user has sufficient balance
exports.verifyBalance = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Verify balance",
                    status: err
                });
                return;
            }
            if (req.body.value > user.balance) {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Verify balance",
                    status: "Insufficient funds"
                });
                return res.status(404).send({message: "Insufficient funds."});
            }
            if (req.body.value <= 0) {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Verify balance",
                    status: "Negative value"
                });
                return res.status(404).send({message: "Nice try :) "});
            }
            else {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Verify balance",
                    status: "Successful"
                });
                next();
            }
        })
};

// Verifies if user has sufficient amount of coins to sell
exports.verifyCoins = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Verify coin balance",
                    status: err
                });
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
                        Logs.create({
                            username: req.body.username,
                            email: "not provided",
                            time: Date(),
                            action: "Verify coin balance",
                            status: "Insufficient funds"
                        });
                        return res.status(404).send({message: "Insufficient funds."});
                    }
                    if (req.body.value <= 0) {
                        Logs.create({
                            username: req.body.username,
                            email: "not provided",
                            time: Date(),
                            action: "Verify coin balance",
                            status: "Negative value"
                        });
                        return res.status(404).send({message: "Ernsthaft??"});
                    }
                    else {
                        // Pass coinsSold to next middleware by adding to request object
                        req.coinsSold = coinsSold;
                        req.coinBalance = coinBalance;
                        Logs.create({
                            username: req.body.username,
                            email: "not provided",
                            time: Date(),
                            action: "Verify coin balance",
                            status: "Successful"
                        });
                        next();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
};

// Receives a coin type and a us dollar value, writes new balances into database and returns new balance and amount of coins bought
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
                        Logs.create({
                            username: req.body.username,
                            email: "not provided",
                            time: Date(),
                            action: "Buy",
                            status: err
                        });
                        return;
                    }

                    if (!user) {
                        Logs.create({
                            username: req.body.username,
                            email: "not provided",
                            time: Date(),
                            action: "Buy",
                            status: "User not found"
                        });
                        return res.status(404).send({message: "User Not found."});
                    }
                    Logs.create({
                        username: req.body.username,
                        email: "not provided",
                        time: Date(),
                        action: "Buy",
                        status: "Successful. Bought: " + coinsBought + " of " + coin
                    });
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
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Sell",
                    status: err
                });
                return;
            }

            if (!user) {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Sell",
                    status: "User not found"
                });
                return res.status(404).send({message: "User Not found."});
            }
            Logs.create({
                username: req.body.username,
                email: "not provided",
                time: Date(),
                action: "Sell",
                status: "Successful. Sold " + coinsSold + " of " + req.body.coin
            });
            res.status(200).send({
                balance: user.balance+parseInt(req.body.value),
                newCoinBalance: req.coinBalance-coinsSold,
                coinsSold: coinsSold

            });
        });
};

// Calculates the complete value of the users portfolio
exports.getUserValue = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Get user value",
                    status: err
                });
                return;
            }

            if (!user) {
                Logs.create({
                    username: req.body.username,
                    email: "not provided",
                    time: Date(),
                    action: "Get user value",
                    status: "User not found"
                });
                return res.status(404).send({message: "User Not found."});
            }

            // stores user portfolio into dictionary
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

            exchange.getCurrentPrice("bitcoin")
                .then((response) => {
                    userValue = userValue + userCoins.bitcoin * response.data[0].price_usd;
                    return exchange.getCurrentPrice("dash")
                })
                .then((response) => {
                    userValue = userValue + userCoins.dash * response.data[0].price_usd;
                    return exchange.getCurrentPrice("monero")
                })
                .then((response) => {
                    userValue = userValue + userCoins.monero * response.data[0].price_usd;
                    return exchange.getCurrentPrice("ethereum")
                })
                .then((response) => {
                    userValue = userValue + userCoins.ethereum * response.data[0].price_usd;
                    return exchange.getCurrentPrice("xrp")
                })
                .then((response) => {
                    userValue = userValue + userCoins.xrp * response.data[0].price_usd;
                    return exchange.getCurrentPrice("tether")
                })
                .then((response) => {
                    userValue = userValue + userCoins.tether * response.data[0].price_usd;
                    return exchange.getCurrentPrice("bitcoinCash")
                })
                .then((response) => {
                    userValue = userValue + userCoins.bitcoinCash * response.data[0].price_usd;
                    return exchange.getCurrentPrice("bitcoinSV")
                })
                .then((response) => {
                    userValue = userValue + userCoins.bitcoinSV * response.data[0].price_usd;
                    return exchange.getCurrentPrice("litecoin")
                })
                .then((response) => {
                    userValue = userValue + userCoins.litecoin * response.data[0].price_usd;
                    return exchange.getCurrentPrice("eos")
                })
                .then((response) => {
                    userValue = userValue + userCoins.eos * response.data[0].price_usd;
                    return exchange.getCurrentPrice("binancecoin")
                })
                .then((response) => {
                    userValue = userValue + userCoins.binancecoin * response.data[0].price_usd;
                    return exchange.getCurrentPrice("tezos")
                })
                .then((response) => {
                    userValue = userValue + userCoins.tezos * response.data[0].price_usd;
                    Logs.create({
                        username: req.body.username,
                        email: "not provided",
                        time: Date(),
                        action: "Get user value",
                        status: "Successful. User value: " + userValue
                    });
                    res.status(200).send({
                        username: user.username,
                        balance: user.balance,
                        uservalue: userValue
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
};
const mongoose = require("mongoose");

// Database format for each user
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        balance: Number,
        bitcoin: Number,
        dash: Number,
        monero: Number,
        ethereum: Number,
        xrp: Number,
        tether: Number,
        bitcoinCash: Number,
        bitcoinSV: Number,
        litecoin: Number,
        eos: Number,
        binancecoin: Number,
        tezos: Number

    })
);

module.exports = User;
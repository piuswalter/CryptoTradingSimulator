const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        balance: Number,
        coins: {
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
        }

    })
);

module.exports = User;
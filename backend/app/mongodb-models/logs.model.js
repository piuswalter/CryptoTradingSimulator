const mongoose = require("mongoose");

// Database format for each new log
const Logs = mongoose.model(
    "Logs",
    new mongoose.Schema({
        username: String,
        email: String,
        time: String,
        action: String,
        status: String

    })
);

module.exports = Logs;
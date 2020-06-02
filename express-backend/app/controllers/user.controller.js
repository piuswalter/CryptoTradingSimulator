const db = require("../mongodb-models");
const User = db.user;


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
                coins: user.coins
            });
        });
};

exports.buy = (req, res) => {
    return
};

exports.sell = (req, res) => {
    return
}

const { authJwt, exchange } = require("../app/middlewares");
const controller = require("../app/controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/data/test/all", controller.allAccess);

    app.get("/data/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get("/exchange", exchange.notDefined);
    app.get("/exchange/price", exchange.notDefined);
    app.get("/exchange/price/:coin", function (req, res) {
      exchange.getCurrentPriceString(req, res)
    });
    app.get("/exchange/information", exchange.notDefined);
    app.get("/exchange/information/:coin", function (req, res) {
        exchange.getInformationString(req, res)
    });
};
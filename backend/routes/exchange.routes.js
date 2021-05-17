const { exchange } = require("../app/middlewares");

// additional routes for exchange service
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

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
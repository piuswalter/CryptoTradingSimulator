const axios = require("axios").default;


getAllInformationList = (req, res, next) => {
	axios.get("https://api.coinlore.net/api/ticker/?id=90")
	.then(function (response) {
		res.json(response.data[0]);
	})
	.catch(function (error) {
		console.log(error);
	})
};

getAllInformation = (req, res, next) => {
	axios.get("https://api.coinlore.net/api/ticker/?id=90")
	.then(function (response) {
		res.json(response.data);
	})
	.catch(function (error) {
		console.log(error);
	})
};

getCurrentPrice = (req, res, next) => {
	axios.get("https://api.coinlore.net/api/ticker/?id=90")
	.then(function (response) {
		res.json(response.data[0].price_usd);
	})
	.catch(function (error) {
		console.log(error);
	})
};

getCurrentPriceTest = (coin) => {
	if (coin == "bitcoin") {
		return 500
	}
	if (coin == "dash") {
		return 200
	}
};


const exchange = {
	getAllInformationList,
	getAllInformation,
	getCurrentPrice,
	getCurrentPriceTest
};

module.exports = exchange;

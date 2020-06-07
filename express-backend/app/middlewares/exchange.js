const axios = require("axios").default;


notDefined = (req, res, next) => {
	res.json({ "error": "endpoint not defined" });
};

getCurrentPriceString = (req, res) => {
	var coin = req.params.coin;
	var validCoin = true;

	if (coin == "bitcoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=90"
	} else if (coin == "dash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=8"
	} else if (coin == "monero") {
		api_link = "https://api.coinlore.net/api/ticker/?id=28"
	} else if (coin == "ethereum") {
		api_link = "https://api.coinlore.net/api/ticker/?id=80"
	} else if (coin == "xrp") {
		api_link = "https://api.coinlore.net/api/ticker/?id=58"
	} else if (coin == "tether") {
		api_link = "https://api.coinlore.net/api/ticker/?id=518"
	} else if (coin == "bitcoinCash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2321"
	} else if (coin == "bitcoinSV") {
		api_link = "https://api.coinlore.net/api/ticker/?id=33234"
	} else if (coin == "litecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=1"
	} else if (coin == "eos") {
		api_link ="https://api.coinlore.net/api/ticker/?id=2679"
	} else if (coin == "binancecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2710"
	} else if (coin == "tezos") {
		api_link = "https://api.coinlore.net/api/ticker/?id=3682"
	} else {
		validCoin = false;
		res.json({ "error": "no valid coin given" });
	}

	if (validCoin) {
		axios.get(api_link)
		.then(function (response) {
			res.json(response.data[0].price_usd);
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	
};

getCurrentPrice = (coin) => {
	if (coin == "bitcoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=90"
	} else if (coin == "dash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=8"
	} else if (coin == "monero") {
		api_link = "https://api.coinlore.net/api/ticker/?id=28"
	} else if (coin == "ethereum") {
		api_link = "https://api.coinlore.net/api/ticker/?id=80"
	} else if (coin == "xrp") {
		api_link = "https://api.coinlore.net/api/ticker/?id=58"
	} else if (coin == "tether") {
		api_link = "https://api.coinlore.net/api/ticker/?id=518"
	} else if (coin == "bitcoinCash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2321"
	} else if (coin == "bitcoinSV") {
		api_link = "https://api.coinlore.net/api/ticker/?id=33234"
	} else if (coin == "litecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=1"
	} else if (coin == "eos") {
		api_link ="https://api.coinlore.net/api/ticker/?id=2679"
	} else if (coin == "binancecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2710"
	} else if (coin == "tezos") {
		api_link = "https://api.coinlore.net/api/ticker/?id=3682"
	} else {
		return -1;
	}
	return axios.get(api_link)

};

getInformationString = (req, res) => {
	var coin = req.params.coin;
	var validCoin = true;

	if (coin == "bitcoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=90"
	} else if (coin == "dash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=8"
	} else if (coin == "monero") {
		api_link = "https://api.coinlore.net/api/ticker/?id=28"
	} else if (coin == "ethereum") {
		api_link = "https://api.coinlore.net/api/ticker/?id=80"
	} else if (coin == "xrp") {
		api_link = "https://api.coinlore.net/api/ticker/?id=58"
	} else if (coin == "tether") {
		api_link = "https://api.coinlore.net/api/ticker/?id=518"
	} else if (coin == "bitcoinCash") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2321"
	} else if (coin == "bitcoinSV") {
		api_link = "https://api.coinlore.net/api/ticker/?id=33234"
	} else if (coin == "litecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=1"
	} else if (coin == "eos") {
		api_link ="https://api.coinlore.net/api/ticker/?id=2679"
	} else if (coin == "binancecoin") {
		api_link = "https://api.coinlore.net/api/ticker/?id=2710"
	} else if (coin == "tezos") {
		api_link = "https://api.coinlore.net/api/ticker/?id=3682"
	} else {
		validCoin = false;
		res.json({ "error": "no valid coin given" });
	}

	if (validCoin) {
		axios.get(api_link)
		.then(function (response) {
			res.json(response.data[0]);
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	
};


const exchange = {
	notDefined,
	getCurrentPriceString,
	getCurrentPrice,
	getInformationString
};

module.exports = exchange;

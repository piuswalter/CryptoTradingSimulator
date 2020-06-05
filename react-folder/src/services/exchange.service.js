import Axios from "axios";

const API_URL = "http://localhost:8080/exchange/";

class ExchangeService {
    getCurrentPrice(paper) {
        return Axios
            .get(API_URL + "/all")
            .then(response => {
                localStorage.setItem("currentBTC", JSON.stringify(response.data[0].price_usd));

                return JSON.parse(localStorage.getItem('currentBTC'));;
            });
    }

    getPercentChange(timerange) {
        if (timerange === 1) {
            return Axios
                .get(API_URL + "/all")
                .then(response => {
                    localStorage.setItem("percentChange1h", JSON.stringify(response.data[0].percent_change_1h));

                    return JSON.parse(localStorage.getItem('percentChange1h'));;
                });
        } else if (timerange === 24) {
            return Axios
                .get(API_URL + "/all")
                .then(response => {
                    localStorage.setItem("percentChange24h", JSON.stringify(response.data[0].percent_change_24h));

                    return JSON.parse(localStorage.getItem('percentChange24h'));;
                });
        } else {
            return Axios
                .get(API_URL + "/all")
                .then(response => {
                    localStorage.setItem("percentChange7d", JSON.stringify(response.data[0].percent_change_7d));

                    return JSON.parse(localStorage.getItem('percentChange7d'));;
                });
        }
    }

    /*getCurrentPrice() {
        return Axios.get(API_URL + "/price")
            .then(response => {
                alert("service: " + response.data)
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }*/
}

export default new ExchangeService();
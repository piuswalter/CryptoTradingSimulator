import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/user/';

class UserService {
    getUserBalance(username) {
        return axios
            .post(API_URL + "balance", {
                username
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("balance", JSON.stringify(response.data.balance));
                    localStorage.setItem("coins", JSON.stringify(response.data.coins));
                }

                return response.data;
            });
    }
    buy(username, coin, value) {
        return axios
            .post(API_URL + "buy", {
                username,
                coin,
                value,
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("balance", JSON.stringify(response.data.balance));
                    localStorage.setItem("coins", JSON.stringify({
                        "bitcoin": response.data.bitcoin,
                        "dash": response.data.dash,
                        "monero": response.data.monero,
                        "ethereum": response.data.ethereum,
                        "xrp": response.data.xrp,
                        "tether": response.data.tether,
                        "bitcoinCash": response.data.bitcoinCash,
                        "bitcoinSV": response.data.bitcoinSV,
                        "litecoin": response.data.litecoin,
                        "eos": response.data.eos,
                        "binancecoin": response.data.binancecoin,
                        "tezos": response.data.tezos
                    }));
                }

                return response.data;
            });
    }
    sell(username, coin, value) {
        return axios
            .post(API_URL + "sell", {
                username,
                coin,
                value,
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("balance", JSON.stringify(response.data.balance));
                    localStorage.setItem("coins", JSON.stringify(response.data.coins));
                }

                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new UserService();
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
    buy(coin, value) {
        return axios
            .post(API_URL + "buy", {
                coin,
                value,
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("balance", JSON.stringify(response.data.balance));
                    localStorage.setItem("coins", JSON.stringify(response.data.coins));
                }

                return response.data;
            });
    }
    sell(coin, value) {
        return axios
            .post(API_URL + "sell", {
                coin,
                value,
            })
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
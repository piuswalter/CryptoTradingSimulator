import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/";

class UserService {
  getUserBalance(username) {
    return axios
      .post(
        API_URL + "balance",
        {
          username,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "balance",
            JSON.stringify(response.data.balance)
          );
          localStorage.setItem(
            "bitcoin",
            JSON.stringify(response.data.bitcoin)
          );
          localStorage.setItem("dash", JSON.stringify(response.data.dash));
          localStorage.setItem("monero", JSON.stringify(response.data.monero));
          localStorage.setItem(
            "ethereum",
            JSON.stringify(response.data.ethereum)
          );
          localStorage.setItem("xrp", JSON.stringify(response.data.xrp));
          localStorage.setItem("tether", JSON.stringify(response.data.tether));
          localStorage.setItem(
            "bitcoinCash",
            JSON.stringify(response.data.bitcoinCash)
          );
          localStorage.setItem(
            "bitcoinSV",
            JSON.stringify(response.data.bitcoinSV)
          );
          localStorage.setItem(
            "litecoin",
            JSON.stringify(response.data.litecoin)
          );
          localStorage.setItem("eos", JSON.stringify(response.data.eos));
          localStorage.setItem(
            "binancecoin",
            JSON.stringify(response.data.binancecoin)
          );
          localStorage.setItem("tezos", JSON.stringify(response.data.tezos));
        }

        return response.data;
      });
  }
  getUserValue(username) {
    return axios
      .post(
        API_URL + "value",
        {
          username,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "userworth",
            JSON.stringify(response.data.uservalue)
          );
        }

        return response.data;
      });
  }
  buy(username, coin, value) {
    return axios
      .post(
        API_URL + "buy",
        {
          username,
          coin,
          value,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "balance",
            JSON.stringify(response.data.balance)
          );
        }
        return response.data;
      });
  }
  sell(username, coin, value) {
    return axios
      .post(
        API_URL + "sell",
        {
          username,
          coin,
          value,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "balance",
            JSON.stringify(response.data.balance)
          );
        }

        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new UserService();

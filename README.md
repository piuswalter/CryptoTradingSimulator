<div align="center">
    <a href="#"><img src="https://raw.githubusercontent.com/piuswalter/CryptoTradingSimulator/master/frontend/src/img/logo.svg" alt="PaperCoin" width="300"></a>
    <br />
    <br />
    <p>Crypto Trading Simulator</p>
    <small>Built with ❤️ by
        <a href="https://github.com/silaspohl">Silas</a>,
        <a href="https://github.com/6010">Golo</a>,
        <a href="https://github.com/piuswalter">Pius</a> and
        <a href="https://github.com/piuswalter/StudyOffline/graphs/contributors">contributors</a>
    </small>
</div>

---

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/piuswalter/CryptoTradingSimulator/development)
[![GitHub issues](https://img.shields.io/github/issues/piuswalter/CryptoTradingSimulator)](https://github.com/piuswalter/CryptoTradingSimulator/issues)
![GitHub language count](https://img.shields.io/github/languages/count/piuswalter/CryptoTradingSimulator)
![Lines of code](https://img.shields.io/tokei/lines/github/piuswalter/CryptoTradingSimulator)

The aim of this web application is to deliver an authentic cryptocurrency trading experience. We strive to enable our users to engage in a <span style="color: #2896f3;">realistic and risk free trading environment</span> which is synced to the latest exchange rates.

Please note that this is a <span style="color: #2896f3;">prototype</span>, which means certain processes are yet to be optimised. Nevertheless, we are proud to present a <span style="color: #2896f3;">fully functional papertrading experience</span> with more than 10 supported currencies - and more to come.

## 💰 How it works

Users will receive their initial start-off funds of <span style="color: #2896f3;">10,000 dollars</span> right after registration. From thereon you are free to invest in our supported cryptocurrencies by selling or buying at your leisure. Strategic decisions are supported by our individual trading charts and exchange history. By practising with our simulation, you are able to gain vital knowledge and try out your own strategy first-hand, before even investing a cent of real money.

## ⚒️ Setup your own PaperCoin instance

Below is the procedure on how to set up your own PaperCoin instance.

### Prerequisites

Before you start, you need already installed software. To be specific

- Node.js ([nodejs.org/de/download/](https://nodejs.org/de/download/))
- MongoDB ([www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))

### Installing modules

Es gibt drei Ordner, die du benötigst, um PaperCoin zu installieren und zu starten.

By typing `cd frontend/` from the root folder you can navigate to the frontend directory. Run `npm ci` to install the required modules located in the `package-lock.json`.

Repeat the same procedure for the modules in the `backend` folder.

### Run the application

To start PaperCoin, you need to run the following commands in the three directories.

1. The directory mongodata is for the database stuff. Start the database instance with `mongod --dbpath mongodata/` and specify the folder as an argument.
2. The directory `backend` contains the entire Express backend with connection to the database execute the command `npm run start` here.
3. In the directory `frontend` execute the command `npm run start`. This folder contains the entire React frontend.

### Default application links

- The backend ist running on [localhost:8080](http://localhost:8080/)
- The frontend ist running on [localhost:3000](http://localhost:3000/)

## ⚙️ Built with MERN stack

[![MongoDB](https://img.shields.io/badge/-MongoDB-333333?logo=MongoDB)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/-Express-000000?logo=Express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/-React-333333?logo=React)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/-Node.js-333333?logo=Node.js)](https://nodejs.org/)

- [MongoDB](https://www.mongodb.com/) - The database to store your cryptocurrencies
- [Express](https://expressjs.com/) - The web framework used at the backend
- [React](https://reactjs.org/) - The web framework used at the frontend
- [Node.js](https://nodejs.org/en/) - The backend power


## 📜 License

[![GitHub license](https://img.shields.io/github/license/piuswalter/CryptoTradingSimulator)](https://github.com/piuswalter/CryptoTradingSimulator/blob/master/LICENSE)

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details

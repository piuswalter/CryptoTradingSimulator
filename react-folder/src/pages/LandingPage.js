//Modules
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

//Assets
import PaperCoinLogo from '../svg/PaperCoin_white.svg';
import Balloons from '../svg/balloons.svg';

//Component LandingPage
export default function LandingPage() {
    return (
        <div class="container-fluid">

            <div class="row" style={{ height: "8vh" }}>
                <div class="col my-auto">
                    <img id="logo" src={PaperCoinLogo} style={{ height: "5vh" }}></img>
                </div>
            </div>

            <div class="row" style={{ height: "92vh" }}>
                <div class="col align-bottom">
                    <img src={Balloons} style={{ height: "92vh" }}></img>
                </div>
                <div class="col my-auto">
                    <h1>Build Your Portfolio</h1>
                    <h2>Papertrading with cryptocurrencies</h2>
                    <Router>
                        <Link to="/login">
                            <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }} onClick="Router.refresh()"><h3>Get Started</h3></button>
                        </Link>
                    </Router>
                </div>
            </div>

        </div >
    )
}
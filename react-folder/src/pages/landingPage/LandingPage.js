//Modules
import React from '../../../node_modules/react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

//Style and Assets
import './LandingPage.css';
import PaperCoinLogo from '../../svg/PaperCoin_white.svg';
import Balloons from '../../svg/balloons.svg';

//Component LandingPage
export default function LandingPage() {
    return (
        <div>
            <img id="logo" src={PaperCoinLogo}></img>
            <div id="left">
                <img id="balloons" src={Balloons}></img>
            </div>
            <div id="right">
                <div id="content">
                    <div id="text1">Build Your Portfolio</div>
                    <div id="text2">Papertrading with cryptocurrencies</div>
                    <Router>
                        <Link to="/login">
                            <button id="getStarted" type="button" class="btn btn-primary" onClick="Router.refresh()">Get Started</button>
                        </Link>
                    </Router>
                </div>
            </div>
        </div >
    )
}
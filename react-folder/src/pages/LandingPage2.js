//Modules
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import $ from 'jquery';

//Assets
import PaperCoinLogo from '../img/PaperCoin_white.svg';
import Portfolio from '../img/portfolio.svg';
import Wave from '../img/wave.svg';
import Avatar from '../img/avatar.svg';
import BG from '../img/bg.svg';

//global styles

//local styles
const wave = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    height: '100%',
    zIndex: '-1'
}

const left = {
    position: 'fixed',
    left: '0',
    width: '50vw',
    height: '100vh',
}

const right = {
    position: 'fixed',
    left: '50%',
    width: '50vw',
    height: '100vh',
    whiteSpace: 'pre-wrap'
}

const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const portfolio = {
    height: '30vw'
}

const button = {
    color: 'white',
    backgroundColor: '#1B71CA',
    border: 'none',
    borderRadius: '30px',
    width: '270px',
    height: '60px',
    marginTop: '40px'
}

const buttonText = {
    lineHeight: '60px',
}

const Start = {
    width: '100%'
}

//Animation
$(document).ready(() => {
    $('#login').hide();
    $('#btnStart').click(() => {
        $('#btnStart').animate({ opacity: '0' })
        $('#start').animate({
            marginBottom: '100px'
        }, 1000, () => {
            $('#login').fadeIn();
        })
    })
})

//Component LandingPage
export default function LandingPage() {
    return (
        <div>
            <img src={Wave} style={wave}></img>

            <div style={Object.assign(left, center)}>
                <img src={Portfolio} style={portfolio}></img>
            </div>

            <div style={Object.assign(right, center)}>
                <div>
                    <div id='start'>
                        <h1>Build Your Portfolio</h1>
                        <h2>Papertrading with cryptocurrencies</h2>
                        <button id="btnStart" style={button}><h4 style={buttonText}>Get Started!</h4></button>
                    </div>
                    <div id='login' style={center}>
                        <form action="index.html">
                            <div><input value='username'></input></div>
                            <div><input value='password'></input></div>
                            <div><button style={button}>Login</button></div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
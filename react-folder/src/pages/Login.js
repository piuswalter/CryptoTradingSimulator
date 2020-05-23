//Modules
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

//Assets
import PaperCoinLogo from '../svg/PaperCoin_white.svg';
import Balloons from '../svg/balloons.svg';


//Component LandingPage
export default function Login() {
    return (
        <div class="container-fluid">
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
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
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"></input>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

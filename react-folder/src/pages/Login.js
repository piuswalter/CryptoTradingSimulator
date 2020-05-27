import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useSpring, animated as a, interpolate } from 'react-spring'

//img
import { Wave, Portfolio } from '../img'



//Component LandingPage
export default function LandingPage() {
    const props = useSpring({
        from: { marginRight: '-400px' },
        to: { marginRight: '0px' }
    })
    return (
        <div>
            <img class='wave' src={Wave}></img>
            <div class='right center'>
                <img class='portfolio' src={Portfolio}></img>
            </div>
            <div class='left center'>
                <div class='getStarted'>
                    <form>
                        <label for='email'>Email</label><br></br>
                        <input id='email' type='email'></input><br></br>
                        <label for='password'>Password</label><br></br>
                        <input id='password' type='password'></input><br></br>
                        <input class='button m-t' type='submit' value='Login'></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

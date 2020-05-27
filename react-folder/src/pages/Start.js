import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';

//img
import { Wave, Portfolio, Logo } from '../img'

//Component LandingPage
export default function LandingPage() {

    const [open, setOpen] = useState(false);

    return (
        <Container fluid>

            <Image src={Wave} className='position-fixed h-100'></Image>

            <Navbar>
                <img src={Logo} alt='PaperCoin' />
            </Navbar>

            <Row className='main-content'>
                <Col className='d-flex'>
                    <Image src={Portfolio} className='mx-auto my-auto h-60' fluid></Image>
                </Col>
                <Col className='d-flex'>
                    <div className='mx-auto my-auto'>
                        <h1>Build Your Portfolio</h1>
                        <h3>Papertrading with cryptocurrencies</h3>
                        <Router>
                            <Link to='/login'><Button variant='primary' size='lg' className='mt-3' onClick='router.refresh()'>Get Started!</Button></Link>
                        </Router>
                    </div>
                </Col>
            </Row>

        </Container >
    )
}
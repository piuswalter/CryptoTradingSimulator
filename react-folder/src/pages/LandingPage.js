import React from 'react';
import { Container, Row, Col, Image, Button, Navbar } from 'react-bootstrap';
import { Wave, Portfolio, Logo } from '../img'

//Component LandingPage
export default function LandingPage() {
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
                        <Button variant='primary' size='lg' className='mt-3' href='./login'>Get Started!</Button>
                    </div>
                </Col>
            </Row>

        </Container >
    )
}
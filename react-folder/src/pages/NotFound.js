import React from 'react';
import { Container, Row, Image, Navbar } from 'react-bootstrap';
import { Logo, PageNotFound } from '../img'

//Component LandingPage
export default function LandingPage() {
    return (
        <Container fluid>

            <Navbar className='z-100'>
                <Navbar.Brand href='./'><img src={Logo} alt='PaperCoin' /></Navbar.Brand>
            </Navbar>

            <Row className='main-content'>
                <Image src={PageNotFound} className='mx-auto my-auto'></Image>
            </Row>

        </Container >
    )
}
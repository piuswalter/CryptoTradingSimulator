import React from 'react';
import { Container, Row, Col, Image, Button, Navbar, Form, Jumbotron, Nav } from 'react-bootstrap';
import { Wave, Portfolio, Logo, Avatar } from '../img'

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
                    <Jumbotron className='mx-auto my-auto w-75 d-inline'>
                        <div className='d-flex justify-content-center mb-3'><Image src={Avatar} className='w-25'></Image></div>
                        <h1 className='text-center text-dark'>Welcome</h1>
                        <Form className='text-center'>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='w-100 mb-1'>Register</Button>
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link disabled>Already have an account?</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='ml-n4'>
                                    <Nav.Link href='./login'><u>Click here</u></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>

        </Container >
    )
}
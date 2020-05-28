import React, { Component } from 'react';
import { Container, Row, Col, Image, Button, Navbar, Form, Jumbotron, Nav, Alert } from 'react-bootstrap';
import AuthService from '../services/auth.service'
import { Wave, Portfolio, Logo, Avatar } from '../img'

//Component Login
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
            userInvalid: false,
            pwInvalid: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            message: "",
            username: e.target.value,
            userInvalid: false
        });
    }

    onChangePassword(e) {
        this.setState({
            message: "",
            password: e.target.value,
            pwInvalid: false
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
            message: ""
        })

        if (this.state.username === "" || this.state.password === "") {
            this.setState({
                userInvalid: !(this.state.username),
                pwInvalid: !(this.state.password),
                loading: false
            });
            return
        }

        AuthService.login(this.state.username, this.state.password).then(() => {
            this.props.history.push("/dashboard");
            window.location.reload();
        },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    userInvalid: true,
                    pwInvalid: true,
                    loading: false,
                    message: resMessage
                })
            })
    }

    render() {
        return (
            <Container fluid>

                <Image src={Wave} className='position-fixed h-100'></Image>

                <Navbar className='z-100'>
                    <Navbar.Brand href='./'><img src={Logo} alt='PaperCoin' /></Navbar.Brand>
                </Navbar>

                <Row className='main-content'>
                    <Col className='d-flex'>
                        <Image src={Portfolio} className='mx-auto my-auto h-60' fluid></Image>
                    </Col>
                    <Col className='d-flex'>
                        <Jumbotron className='mx-auto my-auto w-75 d-inline'>
                            <div className='d-flex justify-content-center mb-3'><Image src={Avatar} className='w-25'></Image></div>
                            <h1 className='text-center text-dark'>Welcome</h1>
                            <Form className='text-center' onSubmit={this.handleLogin}>

                                <Form.Group>
                                    <Form.Control type="text" placeholder="Username" onChange={this.onChangeUsername} isInvalid={this.state.userInvalid} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} isInvalid={this.state.pwInvalid} />
                                </Form.Group>
                                <Alert variant='danger' show={this.state.message}>{this.state.message}</Alert>
                                <Button variant="primary" type="submit" className='w-100 mb-1' disabled={this.state.loading}>Login</Button>
                                <Nav className="justify-content-center">
                                    <Nav.Item>
                                        <Nav.Link disabled>Not registered yet?</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='ml-n4'>
                                        <Nav.Link href='./register'><u>Click here</u></Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>

            </Container >
        )
    }
}
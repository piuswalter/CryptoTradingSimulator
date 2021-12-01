// imports
import React, { Component } from 'react';
import { Container, Row, Col, Image, Button, Navbar, Form, Nav, ProgressBar, Alert } from 'react-bootstrap';
import { AuthService } from '../services'
import { Wave, Portfolio, Logo, Avatar } from '../img'

// component Register
export default class Register extends Component {

    /**
     * constructor of Register
     * @param {*} props 
     */
    constructor(props) {

        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            loading: false,
            message: "",
            userInvalid: false,
            emailInvalid: false,
            pwInvalid: false,
            pwStrength: 0,
            pwColor: "",
            currentUser: AuthService.getCurrentUser()
        };

    }

    /**
     * handles change in username-input
     * @param {Event} e 
     */
    onChangeUsername(e) {

        this.setState({
            username: e.target.value,
            message: "",
            userInvalid: false
        });

        if (5 > e.target.value.length || e.target.value.length > 20) {
            this.setState({ userInvalid: true })
        }

    }

    /**
     * handles changes in email-input
     * @param {Event} e 
     */
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            message: "",
            emailInvalid: false
        });
    }

    /**
     * handles changes in password-input
     * @param {Event} e 
     */
    onChangePassword(e) {

        this.setState({
            password: e.target.value,
            message: "",
            pwInvalid: false
        });

        if (8 > e.target.value.length || e.target.value.length > 20) {
            this.setState({ pwInvalid: true })
        }

        switch (e.target.value.length) {
            case 0: this.setState({ pwStrength: 0, pwColor: "danger" }); break;
            case 1: this.setState({ pwStrength: 6.25, pwColor: "danger" }); break;
            case 2: this.setState({ pwStrength: 12.5, pwColor: "danger" }); break;
            case 3: this.setState({ pwStrength: 18.75, pwColor: "danger" }); break;
            case 4: this.setState({ pwStrength: 25, pwColor: "danger" }); break;
            case 5: this.setState({ pwStrength: 31.25, pwColor: "danger" }); break;
            case 6: this.setState({ pwStrength: 37.5, pwColor: "danger" }); break;
            case 7: this.setState({ pwStrength: 43.75, pwColor: "danger" }); break;
            case 8: this.setState({ pwStrength: 50, pwColor: "warning" }); break;
            case 9: this.setState({ pwStrength: 56.25, pwColor: "warning" }); break;
            case 10: this.setState({ pwStrength: 62.5, pwColor: "warning" }); break;
            case 11: this.setState({ pwStrength: 68.75, pwColor: "warning" }); break;
            case 12: this.setState({ pwStrength: 75, pwColor: "warning" }); break;
            case 13: this.setState({ pwStrength: 81.25, pwColor: "success" }); break;
            case 14: this.setState({ pwStrength: 87.5, pwColor: "success" }); break;
            case 15: this.setState({ pwStrength: 93.25, pwColor: "success" }); break;
            case 16: case 17: case 18: case 19: case 20: this.setState({ pwStrength: 100, pwColor: "success" }); break;
            default: this.setState({ pwStrength: 100, pwColor: "danger" });
        }

    }

    /**
     * calls login after registration
     */
    login() {
        setTimeout(() => {
            if (this.state.successful === true) {
                AuthService.login(this.state.username, this.state.password)
                    .then(
                        () => {
                            this.props.history.push("/dashboard");
                            window.location.reload();
                        },
                        () => {
                            this.login();
                        })
            }
        }, 1)
    }


    /**
     * handles register
     * @param {Event} e
     */
    handleRegister(e) {

        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
            this.setState({
                userInvalid: !(this.state.username),
                emailInvalid: !(this.state.email),
                pwInvalid: !(this.state.password),
                loading: false
            });
            return
        }

        if (this.state.userInvalid || this.state.emailInvalid || this.state.pwInvalid) {
            this.setState({
                loading: false
            });
            return
        }

        AuthService.register(this.state.username, this.state.email, this.state.password)
            .then(
                () => {
                    this.setState({
                        successful: true
                    });
                    this.login();
                },
                error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    this.setState({
                        successful: false,
                        loading: false,
                        message: resMessage
                    });
                }
            )
    }

    /**
     * render-function of Register
     */
    render() {
        const { currentUser } = this.state;

        if (currentUser != null) {
            this.props.history.push("/dashboard");
            window.location.reload();
        }
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
                        <div className='mx-auto my-auto w-75 d-inline jumbotron'>
                            <div className='d-flex justify-content-center mb-3'><Image src={Avatar} className='w-25'></Image></div>
                            <h1 className='text-center text-dark'>Welcome</h1>
                            <Form className='text-center' onSubmit={this.handleRegister}>

                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Username" onChange={this.onChangeUsername} isInvalid={this.state.userInvalid} />
                                    <Nav.Link disabled>Must be between 5 and 20 characters</Nav.Link>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" onChange={this.onChangeEmail} isInvalid={this.state.emailInvalid} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} isInvalid={this.state.pwInvalid} />
                                    <ProgressBar className='mt-1' now={this.state.pwStrength} variant={this.state.pwColor}></ProgressBar>
                                </Form.Group>
                                <Alert variant='danger' show={this.state.message}>{this.state.message}</Alert>
                                <Button variant="primary" type="submit" className='w-100 mb-1' disabled={this.state.loading}>Register</Button>
                                <Nav className="justify-content-center" activeKey="/home">
                                    <Nav.Item>
                                        <Nav.Link disabled>Already have an account?</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='ml-n4'>
                                        <Nav.Link href='./login'><u>Click here</u></Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Form>
                        </div>
                    </Col>
                </Row>

            </Container >
        )
    }
}
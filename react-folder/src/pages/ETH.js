import React from 'react';
import AuthService from '../services/auth.service';
import TradingViewWidget from 'react-tradingview-widget';
import { Container, Row, Col, Image, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { Logo, ETH_logo } from '../img';
import { CardBody, Label } from 'reactstrap';
import CarouselCaption from 'react-bootstrap/CarouselCaption';

//Component Bitcoin
export default class btc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentBTC: null,
            percentChange1h: null,
            percentChange24h: null,
            percentChange7d: null,
            chartWidth: 0,
            chartHeight: 0,
        };
    }

    updateWindowDimension() {
        this.setState({
            mainHeight: window.innerHeight - document.getElementById('navbar').offsetHeight,
        })
    }

    resize = () => this.updateWindowDimension();

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    render() {
        return (
            <Container fluid>

                <Navbar className='z-100' id='navbar'>
                    <Navbar.Brand href='./'><img src={Logo} alt='PaperCoin' /></Navbar.Brand>
                    <Nav className="mr-auto w-100">
                        <Button href='./dashboard' className='w-15 ml-4'>Dashboard</Button>
                        <Button href='./ranking' className='w-15 ml-4'>Ranking</Button>
                        <Button href='./about' className='w-15 ml-4'>About</Button>
                    </Nav>
                    <Navbar.Text className='text-light mr-2'>Your</Navbar.Text>
                    <Navbar.Text className='text-light mr-3'>Balance:</Navbar.Text>
                    <Navbar.Text className='text-light mr-4'>$154,986.92</Navbar.Text>
                    <Button className='w-15'>Logout</Button>
                </Navbar>

                <Row style={{ height: 'calc(100vh - 76px)', marginBottom: '0px', margin: '0', padding: '0' }}>

                    <Col md='8' className=' h-100 m-0 p-0 pb-2 pl-2'>
                        <div className='rounded w-100 h-100' style={{ border: '2px solid grey' }}>
                            <TradingViewWidget
                                autosize
                                symbol="ETHUSD"
                                interval="5"
                                timezone="Europe/Berlin"
                                theme="Dark"
                                style="1"
                                locale="de_DE"
                                toolbar_bg="#f1f3f6"
                                hide_top_toolbar
                            />
                        </div>
                    </Col>

                    <Col md='4' className='h-100 m-0 p-0 pr-2 pb-2 pl-2'>
                        <div className='h-45 rounded d-flex justify-content-center align-items-center' style={{ backgroundColor: '#131821', border: '2px solid grey' }}>
                            <div className='h-100 w-25 bg-secondary d-flex justify-content-center align-items-center'>
                                <img src={ETH_logo} className='w-100'></img>
                            </div>
                            <div className='h-100 w-75 d-flex justify-content-center align-items-center'>
                                <div className='w-95 text-center'>
                                    <h4>Ethereum</h4>
                                    Ethereum is the second largest cryptocurrency platform by market capitalization, behind Bitcoin.
                                    It is a decentralized open source blockchain featuring smart contract functionality.
                                </div>
                            </div>
                        </div>
                        <div className='h-15 pt-2'>
                            <div className='rounded d-flex justify-content-center align-items-center' style={{ backgroundColor: '#131821', height: '100%', border: '2px solid grey' }}>
                                <h3>Owned: 3.456x ($756.56)</h3>
                            </div>
                        </div>
                        <div className='h-40 pt-2'>
                            <div className='rounded' style={{ backgroundColor: '#131821', height: '100%', border: '2px solid grey' }}>
                                <Form className='w-100 h-100'>
                                    <div className='h-35 text-center'>
                                        <h3>Current Value</h3>
                                        <h2><b>$240.09</b></h2>
                                    </div>
                                    <div className='h-10 d-flex justify-content-center'>
                                        <Form.Label className='text-center w-45 d-inline mr-3'>Amount ETH</Form.Label>
                                        <Form.Label className='text-center w-45 d-inline'>Price USD</Form.Label>
                                    </div>
                                    <div className='h-20 d-flex justify-content-center'>
                                        <Form.Control className='w-45 d-inline mr-3' type='number'></Form.Control>
                                        <Form.Control className='w-45 d-inline' type='number'></Form.Control>
                                    </div>
                                    <div className='h-35'>
                                        <Button className='w-50 h-100 bg-success border-0 rounded-0'>Buy</Button>
                                        <Button className='w-50 h-100 bg-danger border-0 rounded-0'>Sell</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>

                </Row >

            </Container >
        )
    }
}
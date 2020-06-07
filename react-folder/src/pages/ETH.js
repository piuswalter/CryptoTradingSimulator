import React from 'react';
import AuthService from '../services/auth.service';
import TradingViewWidget from 'react-tradingview-widget';
import { Container, Row, Col, Image, Button, Navbar, Nav, Form, Modal, Table } from 'react-bootstrap';
import { Logo, ETH_logo } from '../img';
import UserService from '../services/user.service';
import ExchangeService from '../services/exchange.service';
import { CardBody, Label } from 'reactstrap';
import CarouselCaption from 'react-bootstrap/CarouselCaption';

//Component Bitcoin
export default class btc extends React.Component {
    constructor(props) {
        super(props);

        this.getBalance = this.getBalance.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleSell = this.handleSell.bind(this);
        this.getNameFromSymbol = this.getNameFromSymbol.bind(this);

        this.state = {
            coin: this.getNameFromSymbol(this.props.match.params.coin),
            currentUser: UserService.getCurrentUser(),
            mainHeight: 0,
            currentUSD: 0,
            currentETH: 0,
            price: 0,
            changeH: 0,
            changeD: 0,
            changeW: 0,
            message: ""
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
        this.getBalance();
        this.getAPIData(this.state.coin);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    getNameFromSymbol(symbol) {
        const symbols = {
            "btc": "bitcoin",
            "eth": "ethereum",
            "usdt": "tether",
            "xrp": "xrp",
            "bch": "bitcoinCash",
            "bsv": "bitcoinSV",
            "ltc": "litecoin",
            "bnb": "binanceCoin",
            "eos": "eos",
            "xtz": "tezos"
        }
        return symbols[symbol];
    }

    onChangeCoin() {
        document.getElementById('inputUSD').value = (240 * document.getElementById('inputCoin').value).toFixed(2);
    }

    onChangeUSD() {
        document.getElementById('inputCoin').value = (1 / 240 * document.getElementById('inputUSD').value).toFixed(5);
    }

    handleLogout(e) {
        e.preventDefault();
        AuthService.logout();
        window.location.reload();
    };

    getBalance() {
        UserService.getUserBalance(this.state.currentUser.username).then((response) => {
            this.setState({
                currentUSD: response.balance.toFixed(2),
                currentETH: response.ethereum.toFixed(5)
            })
        },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    message: resMessage
                })
            })
    }

    getAPIData(coin) {
        ExchangeService.getCurrentPrice(coin).then((response) => this.setState({
            price: response
        }));
        ExchangeService.getPercentChange(coin).then((response) => this.setState({
            changeH: response.hour,
            changeD: response.day,
            changeW: response.week
        }));
    }

    handleBuy(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        UserService.buy(this.state.currentUser.username, 'ethereum', document.getElementById('inputUSD').value).then((response) => {
            this.getBalance();
            this.setState({
                buySuccess: true,
                coinsBought: response.coinsBought.toFixed(5),
                buyModal: true
            });
            console.log(response);
        },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    failure: true,
                    message: resMessage
                })
            })

    }

    handleSell(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        UserService.sell(this.state.currentUser.username, 'ethereum', document.getElementById('inputUSD').value).then((response) => {
            this.getBalance();
            this.setState({
                sellSuccess: true,
                coinsSold: response.coinsSold,
            });
            console.log(response);
        },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    failure: true,
                    message: resMessage
                })
            })

    }

    render() {
        const { currentUser } = this.state;
        if (currentUser == null) {
            this.props.history.push("/login");
            window.location.reload();
        }

        const { currentUSD } = this.state;
        const { currentETH } = this.state;
        const { coinsBought } = this.state;
        const { coinsSold } = this.state;
        const { price } = this.state;
        const { changeH, changeD, changeW, coin } = this.state;

        return (
            <Container fluid>

                <Navbar className='z-100' id='navbar'>
                    <Navbar.Brand href='./'><img src={Logo} alt='PaperCoin' /></Navbar.Brand>
                    <Nav className="mr-auto w-100">
                        <Button href='./dashboard' className='w-15 ml-4'>Dashboard</Button>
                        <Button href='./ranking' className='w-15 ml-4'>Ranking</Button>
                        <Button href='./about' className='w-15 ml-4'>About</Button>
                    </Nav>
                    <Navbar.Text className='w-20 text-light mr-2'>Your Balance:</Navbar.Text>
                    <Navbar.Text className='text-light mr-4 ml-n4'>${currentUSD}</Navbar.Text>
                    <Button className='w-15' onClick={this.handleLogout}>Logout</Button>
                </Navbar>

                <Row style={{ height: 'calc(100vh - 76px)', marginBottom: '0px', margin: '0', padding: '0' }}>

                    <Col md='8' className='h-100 m-0 p-0 pb-2 pl-2 bg-dark'>
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
                        <div className='h-27_5 rounded d-flex justify-content-center align-items-center' style={{ backgroundColor: '#131821', border: '2px solid grey' }}>
                            <div className='h-100 w-25 d-flex justify-content-center align-items-center'>
                                <img src={ETH_logo} className='h-100'></img>
                            </div>
                            <div className='h-100 w-75 d-flex justify-content-center align-items-center'>
                                <div className='w-95 text-center'>
                                    <h5>Ethereum <a className='text-secondary'>ETH</a></h5>
                                    Ethereum is the second largest cryptocurrency platform by market capitalization, behind Bitcoin.
                                    It is a decentralized open source blockchain featuring smart contract functionality.
                                </div>
                            </div>
                        </div>
                        <div className='h-14_5 pt-2'>
                            <div className='rounded text-center' style={{ backgroundColor: '#131821', height: '100%', border: '2px solid grey' }}>
                                <h5 className='w-100 mt-2'>ETH in your Portfolio</h5>
                                <Table striped bordered hover variant="dark" className="w-100">
                                    <tr><td>{currentETH}x</td><td> ${(240 * currentETH).toFixed(2)}</td></tr>
                                </Table>
                            </div>
                        </div>
                        <div className='h-28 pt-2'>
                            <div className='rounded text-center' style={{ backgroundColor: '#131821', height: '100%', border: '2px solid grey' }}>
                                <h5 className='w-100 mt-2'>Performance</h5>
                                <Table striped bordered hover variant="dark" className="w-100">
                                    <tr><td>Change hour</td><td>{changeH} %</td></tr>
                                    <tr><td>Change day</td><td>{changeD} %</td></tr>
                                    <tr><td>Change week</td><td>{changeW} %</td></tr>
                                </Table>
                            </div>
                        </div>
                        <div className='h-30 pt-2'>
                            <div className='rounded' style={{ backgroundColor: '#131821', height: '100%', border: '2px solid grey' }}>
                                <Form className='w-100 h-100'>
                                    <div className='h-30 text-center pt-1'>
                                        <h5>Current Price</h5>
                                        <h4><b>$ {price}</b></h4>
                                    </div>
                                    <div className='h-15 d-flex justify-content-center'>
                                        <Form.Label className='text-center w-45 d-inline mr-3'>Amount ETH</Form.Label>
                                        <Form.Label className='text-center w-45 d-inline'>Price USD</Form.Label>
                                    </div>
                                    <div className='h-25 d-flex justify-content-center'>
                                        <Form.Control id='inputCoin' className='w-45 d-inline mr-3' onChange={this.onChangeCoin} placeholder='0.00000' type='number'></Form.Control>
                                        <Form.Control id='inputUSD' className='w-45 d-inline' onChange={this.onChangeUSD} placeholder='0.00' type='number'></Form.Control>
                                    </div>
                                    <div className='h-30 d-flex justify-content-center'>
                                        <div className='w-50 h-100 d-flex justify-content-center'>
                                            <Button className='w-95 h-90 bg-success border-0' onClick={this.handleBuy} disabled={this.state.loading}><h4 className='m-auto'>Buy</h4></Button>
                                        </div>
                                        <div className='w-50 h-100 d-flex justify-content-center'>
                                            <Button className='w-95 h-90 bg-danger border-0' onClick={this.handleSell} disabled={this.state.loading}><h4 className='m-auto'>Sell</h4></Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>

                </Row >

                <Modal size="sm" centered show={this.state.buySuccess} onHide={() => this.setState({ buySuccess: false, loading: false })}>
                    <Modal.Header className='bg-success' closeButton>
                        <Modal.Title>
                            Successful purchase!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark d-flex justify-content-center align-items-center'>
                        <Table striped bordered hover variant="dark">
                            <tr><td>Bought:</td><td>{coinsBought}ETH</td></tr>
                            <tr><td>Total:</td><td>{currentETH}ETH</td></tr>
                            <tr><td>Balance:</td><td>${currentUSD}</td></tr>
                        </Table>
                    </Modal.Body>
                </Modal>

                <Modal size="sm" centered show={this.state.sellSuccess} onHide={() => this.setState({ sellSuccess: false, loading: false })}>
                    <Modal.Header className='bg-success' closeButton>
                        <Modal.Title>
                            Successful sale!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark d-flex justify-content-center align-items-center'>
                        <Table striped bordered hover variant="dark">
                            <tr><td>Sold:</td><td>{coinsSold} ETH</td></tr>
                            <tr><td>Total:</td><td>{currentETH} ETH</td></tr>
                            <tr><td>Balance:</td><td>${currentUSD}</td></tr>
                        </Table>
                    </Modal.Body>
                </Modal>

                <Modal size="sm" centered show={this.state.failure} onHide={() => this.setState({ failure: false, loading: false })}>
                    <Modal.Header className='bg-danger' closeButton>
                        <Modal.Title>
                            Action failed!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark d-flex justify-content-center align-items-center'>
                        {this.state.message}
                    </Modal.Body>
                </Modal>

            </Container >
        )
    }
}
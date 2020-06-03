import React from 'react';
import AuthService from '../services/auth.service';
import TradingViewWidget from 'react-tradingview-widget';
import { Container, Row, Col, Image, Button, Navbar, Nav } from 'react-bootstrap';
import { Logo } from '../img';
import { CardBody } from 'reactstrap';

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
            chartHeight: 0
        };
    }

    updateWindowDimensions() {
        this.setState({
            chartWidth: document.getElementById('chartContainer').offsetWidth,
            chartHeight: window.innerHeight - (document.getElementById('navbar').offsetHeight + 10)
        });
        console.log(window.innerHeight)
        console.log(document.getElementById('navbar').offsetHeight)
        console.log(this.state.chartHeight)
    }

    resize = () => this.updateWindowDimensions();

    componentDidMount() {
        this.updateWindowDimensions();
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
                    <Button className='w-15'>Logout</Button>
                </Navbar>

                <Row>
                    <Col md='3'>
                        <Button>Buy</Button>
                        <Button>Sell</Button>
                    </Col>
                    <Col md='8' id='chartContainer' className='ml-auto mr-40px'>
                        <TradingViewWidget
                            width={this.state.chartWidth}
                            height={this.state.chartHeight}
                            symbol="BTCUSD"
                            interval="5"
                            timezone="Europe/Berlin"
                            theme="Dark"
                            style="1"
                            locale="de_DE"
                            toolbar_bg="#f1f3f6"
                            hide_top_toolbar
                        />
                    </Col>
                </Row>

            </Container >
        )
    }
}
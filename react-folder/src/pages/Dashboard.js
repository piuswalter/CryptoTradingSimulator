import React from "react";

import AuthService from '../services/auth.service';
import TradingViewWidget from 'react-tradingview-widget';
import { UserService, ExchangeService } from '../services';

// reactstrap components
import { Container, Row, Col, Image, Button, Navbar, Nav, Form, ListGroup, Card } from 'react-bootstrap';
import { Logo, BTC_logo, ETH_logo, USDT_logo, XRP_logo, BCH_logo, BSV_logo, LTC_logo, BNB_logo, EOS_logo, XTZ_logo } from '../img';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.getBalance = this.getBalance.bind(this);

		this.state = {
			currentUser: AuthService.getCurrentUser(),
			message: ""
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		this.getBalance();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	}

	getBalance() {
		UserService.getUserBalance(this.state.currentUser.username).then((response) => {
			console.log(response);
			this.setState({
				currentUSD: response.balance.toFixed(2)
			});
		},
			error => {
				const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				this.setState({
					message: resMessage
				})
			})
	}

	handleLogout(e) {
		e.preventDefault();
		AuthService.logout();
		window.location.reload();
	};

	render() {
		const { currentUser } = this.state;
		const { currentUSD } = this.state;

		if (currentUser == null) {
			this.props.history.push("/login");
			window.location.reload();
		}

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
					<Col md='8' className='h-100 m-0 p-0 pb-2 pl-2'>
						<div className='rounded w-100 h-100 bg-dark' style={{ border: '2px solid grey' }}>
							Portfolio
						</div>
					</Col>
					<Col md='4' className='h-100 m-0 p-0 pb-2 pl-2'>
						<div className='rounded w-100 h-100' style={{ border: '2px solid grey' }}>
							<Card className='h-100 bg-dark'>
								<Card.Body className='h-12'>
									<Card.Title className='text-center'><h3>Available Coins</h3></Card.Title>
								</Card.Body>
								<ListGroup variant='flush' className='h-88'>
									<ListGroup.Item action href='/btc' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>01 </div>
										<div className='d-inline'><img id='btc_logo' src={BTC_logo} className='w-10'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin <a className='text-secondary'>BTC</a></div>
										<div className='h5 d-inline float-right'>$9207.45</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/eth' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>02 </div>
										<div className='d-inline'><img src={ETH_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Ethereum <a className='text-secondary'>ETH</a></div>
										<div className='h5 d-inline float-right'>$240.23</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/usdt' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>03 </div>
										<div className='d-inline'><img src={USDT_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Tether <a className='text-secondary'>USDT</a></div>
										<div className='h5 d-inline float-right'>$1.03</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/xrp' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>04 </div>
										<div className='d-inline'><img src={XRP_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> XRP <a className='text-secondary'>XRP</a></div>
										<div className='h5 d-inline float-right'>$0.21</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bch' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>05 </div>
										<div className='d-inline'><img src={BCH_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin Cash <a className='text-secondary'>BCH</a></div>
										<div className='h5 d-inline float-right'>$230.89</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bsv' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>06 </div>
										<div className='d-inline'><img src={BSV_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin SV <a className='text-secondary'>BSV</a></div>
										<div className='h5 d-inline float-right'>$195.45</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/ltc' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>07 </div>
										<div className='d-inline'><img src={LTC_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Litecoin <a className='text-secondary'>LTC</a></div>
										<div className='h5 d-inline float-right'>$0.21</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bnb' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>08 </div>
										<div className='d-inline'><img src={BNB_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Binance Coin <a className='text-secondary'>BNB</a></div>
										<div className='h5 d-inline float-right'>$0.21</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/eos' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>09 </div>
										<div className='d-inline'><img src={EOS_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> EOS <a className='text-secondary'>EOS</a></div>
										<div className='h5 d-inline float-right'>$0.21</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/xtz' className='h-9 text-light bg-dark'>
										<div className='h5 w-10 d-inline'>10 </div>
										<div className='d-inline'><img src={XTZ_logo} className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Tezos <a className='text-secondary'>XTZ</a></div>
										<div className='h5 d-inline float-right'>$0.21</div>
									</ListGroup.Item>
									<ListGroup.Item className='h-10 d-flex justify-content-center align-items-center bg-dark'>more coins coming soon...</ListGroup.Item>
								</ListGroup>
							</Card>
						</div>
					</Col>
				</Row>
			</Container >
		);
	}
}

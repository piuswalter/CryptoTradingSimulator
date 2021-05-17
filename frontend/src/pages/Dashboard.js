// imports
import React from "react";
import { UserService, ExchangeService, AuthService } from '../services';
import { PieChart } from 'react-minimal-pie-chart';
import { Container, Row, Col, Button, Navbar, Nav, ListGroup, Card } from 'react-bootstrap';
import { Logo, BTC_logo, ETH_logo, USDT_logo, XRP_logo, BCH_logo, BSV_logo, LTC_logo, BNB_logo, EOS_logo, XTZ_logo } from '../img';

// component Dashboard
export default class Dashboard extends React.Component {

	/**
	 * constructor of Dashboard
	 * @param {*} props 
	 */
	constructor(props) {

		super(props);

		this.getBalance = this.getBalance.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleLogout = this.handleLogout.bind(this);

		this.state = {
			currentUser: AuthService.getCurrentUser(),
			portfolio: [
				{ title: 'USDollar', value: 0, color: '#F18F1B' },
				{ title: 'Bitcoin', value: 0, color: '#F18F1B' },
				{ title: 'Ethereum', value: 0, color: '#62688f' },
				{ title: 'Tether', value: 0, color: '#53ae94' },
				{ title: 'XRP', value: 0, color: '#292f4d' },
				{ title: 'BticoinCash', value: 0, color: '#f7941d' },
				{ title: 'BitcoinSV', value: 0, color: '#eab301' },
				{ title: 'Litecoin', value: 0, color: '#bebebe' },
				{ title: 'Binancecoin', value: 0, color: '#f3ba30' },
				{ title: 'EOS', value: 0, color: '#ffffff' },
				{ title: 'Tezos', value: 0, color: '#2c7df7' },
			],
			prices: new Map(),
			visibility: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
			message: ""
		};

	}

	/**
	 * executes on mount
	 */
	componentDidMount() {
		this.getUserValue();
		this.getAPIData();
	}

	/**
	 * gets the from backend
	 */
	getUserValue() {
		UserService.getUserValue(this.state.currentUser.username).then(
			response => {
				this.setState({
					userValue: response.uservalue.toFixed(2)
				});
			}, error => {
				const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				this.setState({
					message: resMessage
				})
			})
	}

	/**
	 * gets coin-prices from backend
	 */
	getAPIData() {
		var pricesMap = new Map();
		var n = 0;
		['bitcoin', 'ethereum', 'tether', 'xrp', 'bitcoinCash', 'bitcoinSV', 'litecoin', 'binancecoin', 'eos', 'tezos'].forEach(coin => {
			ExchangeService.getCurrentPrice(coin).then((response) => {
				response = parseFloat(response).toFixed(2);
				console.log(response);
				pricesMap.set(coin, response)
				n++;
				console.log(n);
				if (n === 10) {
					this.setState({ prices: pricesMap })
					this.getBalance();
				}
			});
		});
	}

	/**
	 * gets portfolio from backend
	 */
	getBalance() {
		UserService.getUserBalance(this.state.currentUser.username).then(
			response => {
				this.setState({
					currentUSD: response.balance.toFixed(2),
					portfolio: [
						{ title: 'USDollar', key: '$', value: response.balance, color: '#CBD4C6' },
						{ title: 'Bitcoin', key: 'BTC', value: response.bitcoin * this.state.prices.get('bitcoin'), color: '#f18f1b' },
						{ title: 'Ethereum', key: 'ETH', value: response.ethereum * this.state.prices.get('ethereum'), color: '#62688f' },
						{ title: 'Tether', key: 'USDT', value: response.tether * this.state.prices.get('tether'), color: '#53ae94' },
						{ title: 'XRP', key: 'XRP', value: response.xrp * this.state.prices.get('xrp'), color: '#292f4d' },
						{ title: 'BticoinCash', key: 'BCH', value: response.bitcoinCash * this.state.prices.get('bitcoinCash'), color: '#f7941d' },
						{ title: 'BitcoinSV', key: 'BSV', value: response.bitcoinSV * this.state.prices.get('bitcoinSV'), color: '#eab301' },
						{ title: 'Litecoin', key: 'LTC', value: response.litecoin * this.state.prices.get('litecoin'), color: '#bebebe' },
						{ title: 'Binancecoin', key: 'BNB', value: response.binancecoin * this.state.prices.get('binancecoin'), color: '#f3ba30' },
						{ title: 'EOS', key: 'EOS', value: response.eos * this.state.prices.get('eos'), color: '#ffffff' },
						{ title: 'Tezos', key: 'XTZ', value: response.tezos * this.state.prices.get('tezos'), color: '#2c7df7' },
					]
				});
				console.log(this.state.portfolio)
			}, error => {
				const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
				this.setState({
					message: resMessage
				})
			})
	}

	/**
	 * handles mouse over piechart
	 * @param {Event} e 
	 */
	handleMouseOver(e) {
		e.preventDefault();
		this.setState({
			visibility: 'visible'
		});
	}

	/**
	 * handles logout
	 * @param {Event} e 
	 */
	handleLogout(e) {
		e.preventDefault();
		AuthService.logout();
		window.location.reload();
	};

	/**
	 * render-function of Dashboard
	 */
	render() {
		const { currentUser, currentUSD, userValue, portfolio, prices } = this.state;

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
						<Button href='./about' className='w-15 ml-4'>About</Button>
					</Nav>
					<Navbar.Text className='w-20 text-light mr-2'>Your Balance:</Navbar.Text>
					<Navbar.Text className='text-light mr-4 ml-n4'>${currentUSD}</Navbar.Text>
					<Button className='w-15' onClick={this.handleLogout}>Logout</Button>
				</Navbar>

				<Row style={{ height: 'calc(100vh - 76px)', marginBottom: '0px', margin: '0', padding: '0' }}>
					<Col md='8' className='h-100 m-0 p-0 pb-2 pl-2'>
						<div className='rounded w-100 h-100 bg-dark' style={{ border: '2px solid grey' }}>
							<h3 className='text-center mt-3 mb-2 pb-0'>Total Value: ${userValue}</h3>
							<PieChart
								className='h-90 mt-0 pt-0'
								style={{ fontSize: '5px' }}
								data={portfolio}
								label={({ dataEntry }) => dataEntry.key}
								labelStyle={(index) => ({
									fill: portfolio[index].color,
									fontSize: '5px',
									visibility: this.state.visibility[index]
								})}
								radius={42}
								labelPosition={112}
								onMouseOver={(_, index) => {
									console.log(index)
									// eslint-disable-next-line
									this.state.visibility[index] = 'visible'
									this.forceUpdate()
								}}
								onMouseOut={(_, index) => {
									console.log(index)
									// eslint-disable-next-line
									this.state.visibility[index] = 'hidden'
									this.forceUpdate()
								}}
							/>
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
										<div className='d-inline'><img src={BTC_logo} alt='BTC logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin <span className='text-secondary'>BTC</span></div>
										<div className='h5 d-inline float-right'>${prices.get('bitcoin')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/eth' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>02 </div>
										<div className='d-inline'><img src={ETH_logo} alt='ETH logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Ethereum <span className='text-secondary'>ETH</span></div>
										<div className='h5 d-inline float-right'>${prices.get('ethereum')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/usdt' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>03 </div>
										<div className='d-inline'><img src={USDT_logo} alt='USDT logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Tether <span className='text-secondary'>USDT</span></div>
										<div className='h5 d-inline float-right'>${prices.get('tether')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/xrp' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>04 </div>
										<div className='d-inline'><img src={XRP_logo} alt='XRP logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> XRP <span className='text-secondary'>XRP</span></div>
										<div className='h5 d-inline float-right'>${prices.get('xrp')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bch' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>05 </div>
										<div className='d-inline'><img src={BCH_logo} alt='BCH logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin Cash <span className='text-secondary'>BCH</span></div>
										<div className='h5 d-inline float-right'>${prices.get('bitcoinCash')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bsv' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>06 </div>
										<div className='d-inline'><img src={BSV_logo} alt='BSV logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Bitcoin SV <span className='text-secondary'>BSV</span></div>
										<div className='h5 d-inline float-right'>${prices.get('bitcoinSV')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/ltc' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>07 </div>
										<div className='d-inline'><img src={LTC_logo} alt='LTC logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Litecoin <span className='text-secondary'>LTC</span></div>
										<div className='h5 d-inline float-right'>${prices.get('litecoin')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/bnb' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>08 </div>
										<div className='d-inline'><img src={BNB_logo} alt='BNB logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Binance Coin <span className='text-secondary'>BNB</span></div>
										<div className='h5 d-inline float-right'>${prices.get('binancecoin')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/eos' className='h-9 text-light bg-dark'>
										<div className='h5 d-inline'>09 </div>
										<div className='d-inline'><img src={EOS_logo} alt='EOS logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> EOS <span className='text-secondary'>EOS</span></div>
										<div className='h5 d-inline float-right'>${prices.get('eos')}</div>
									</ListGroup.Item>
									<ListGroup.Item action href='/xtz' className='h-9 text-light bg-dark'>
										<div className='h5 w-10 d-inline'>10 </div>
										<div className='d-inline'><img src={XTZ_logo} alt='XTZ logo' className='w-10 h-100'></img></div>
										<div className='h5 w-10 d-inline'> Tezos <span className='text-secondary'>XTZ</span></div>
										<div className='h5 d-inline float-right'>${prices.get('tezos')}</div>
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

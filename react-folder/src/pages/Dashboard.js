import React from "react";

import AuthService from '../services/auth.service';
import TradingViewWidget from 'react-tradingview-widget';
import ExchangeService from '../services/exchange.service';

import "../assets/css/black-dashboard-react.css";
import "../assets/demo/demo.css";
import "../assets/css/nucleo-icons.css";
import "../assets/css/dashboard.css";

// reactstrap components
import {
	Row,
	Col,
	Nav
} from "react-bootstrap";

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: AuthService.getCurrentUser(),
			currentBTC: null,
			percentChange1h: null,
			percentChange24h: null,
			percentChange7d: null,
			chartWidth: 0,
			chartHeight: 600
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.getCurrentBTCPrice();
		this.getCurrentBTCPercentChange();
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	getCurrentBTCPrice() {
		ExchangeService.getCurrentPrice().then((currentBTC) => this.setState({
			currentBTC: currentBTC
		}));
	}

	getCurrentBTCPercentChange() {
		ExchangeService.getPercentChange(1).then((percentChange1h) => this.setState({
			percentChange1h: percentChange1h
		}));
		ExchangeService.getPercentChange(24).then((percentChange24h) => this.setState({
			percentChange24h: percentChange24h
		}));
		ExchangeService.getPercentChange(7).then((percentChange7d) => this.setState({
			percentChange7d: percentChange7d
		}));
	}

	updateWindowDimensions() {
		this.setState({
			chartWidth: document.getElementById("chartContainer").offsetWidth,
			//chartHeight: document.getElementById("chartContainer").offsetHeight
		});
	}
	
	handleLogout(e) {
		e.preventDefault();

		AuthService.logout();
		this.props.history.push("/login");
		window.location.reload();
	};

	render() {
		const { currentUser } = this.state;
		
		if (currentUser == null) {
			this.props.history.push("/login");
			window.location.reload();
		}

		return (
			<>
				<div id="body">
					<Row>
						<Col>
							<Nav>
								<Nav.Item>
									<Nav.Link>Home</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link>Ranking</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link>About</Nav.Link>
								</Nav.Item>
								<Nav.Item className="ml-auto">
									<Nav.Link onClick={this.handleLogout}>Sign Out</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
					</Row>
					<Row>
						<Col><div className="placeholder"></div></Col>
					</Row>
					<Row>
						<Col sm={8} id = "chartContainer">
							<TradingViewWidget
								width={this.state.chartWidth}
								height={this.state.chartHeight}
								symbol="BTCUSD"
								interval="30"
								timezone="Europe/Berlin"
								theme="dark"
								style="3"
								locale="de_DE"
								toolbar_bg="#f1f3f6"
								hide_top_toolbar
							/>
						</Col>
						<Col sm={4}>
							<Row>
								<Col>
									<div className="panel panel-top">
										<h3>Logged in as <strong>{currentUser.username}</strong></h3>
										<br />
										<p>
											<strong>Token:</strong>{" "}
											{currentUser.accessToken.substring(0, 20)} ...{" "}
											{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
										</p>
										<p>
											<strong>Id:</strong>{" "}
											{currentUser.id}
										</p>
										<p>
											<strong>Email:</strong>{" "}
											{currentUser.email}
										</p>
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="panel">
										Current BTC price: {this.state.currentBTC} USD<br />
										BTC changed 1h: {this.state.percentChange1h} %<br />
										BTC changed 24h: {this.state.percentChange24h} %<br />
										BTC changed 7d: {this.state.percentChange7d} %
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

import React from "react";

import AuthService from '../services/auth.service'

import TradingViewWidget from 'react-tradingview-widget';

import "../assets/css/black-dashboard-react.css";
import "../assets/demo/demo.css";
import "../assets/css/nucleo-icons.css";
import "../assets/css/dashboard.css";

// reactstrap components
import {
	Button,
	Row,
	Col,
} from "reactstrap";

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: AuthService.getCurrentUser(),
			width: 0,
			height: 0
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	setBgChartData = name => {
		this.setState({
			bigChartData: name,
			currentUser: AuthService.currentUserValue,
			users: null
		});
	};
	
	handleLogout(e) {
		e.preventDefault();

		AuthService.logout();
		this.props.history.push("/login");
		window.location.reload();
	};

	componentWillMount(){
		this.setState({height: window.innerHeight + 'px'});
	  }

	render() {
		const { currentUser } = this.state;
		
		if (currentUser == null) {
			this.props.history.push("/login");
			window.location.reload();
		}

		return (
			<>
			<div className="container">
				<div className="userInformationPanel">
					<h3>Logged in with <strong>{currentUser.username}</strong></h3>
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
					<Button onClick={this.handleLogout}>Logout</Button>
				</div>
			</div>
				<div className="content">
					<div className="">

					</div>

					<Row>
						<Col>
							<TradingViewWidget
								width={this.state.width - 50}
								height={this.state.height - (this.state.height / 3)}
								symbol="NASDAQ:AAPL"
								interval="30"
								timezone="Europe/Berlin"
								theme="dark"
								style="1"
								locale="de_DE"
								toolbar_bg="#f1f3f6"
								hide_top_toolbar
							/>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

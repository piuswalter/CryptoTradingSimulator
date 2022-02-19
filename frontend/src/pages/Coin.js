// imports
import React from "react";
import AuthService from "../services/auth.service";
import TradingViewWidget from "react-tradingview-widget";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Navbar,
  Nav,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import {
  PageNotFound,
  Logo,
  BTC_logo,
  ETH_logo,
  USDT_logo,
  XRP_logo,
  BCH_logo,
  BSV_logo,
  LTC_logo,
  BNB_logo,
  EOS_logo,
  XTZ_logo,
} from "../img";
import { UserService, ExchangeService } from "../services";

// component Coin
export default class Coin extends React.Component {
  /**
   * constructor of Coin
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.onChangeCoin = this.onChangeCoin.bind(this);
    this.onChangeUSD = this.onChangeUSD.bind(this);

    this.state = {
      symbol: this.props.match.params.coin,
      coin: this.getNameFromSymbol(this.props.match.params.coin),
      currentUser: UserService.getCurrentUser(),
    };
  }

  /**
   * executes on mount
   */
  componentDidMount() {
    if (this.state.coin !== undefined) {
      window.addEventListener("resize", this.resize);
      this.getBalance();
      this.getAPIData(this.state.coin);
      this.setTextAndLogo();
    }
  }

  /**
   * executes on update
   */
  componentDidUpdate() {
    this.getBalance();
  }

  /**
   * executes on unmount
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => this.updateWindowDimension();
  /**
   * resizes the chart
   */
  updateWindowDimension() {
    this.setState({
      mainHeight:
        window.innerHeight - document.getElementById("navbar").offsetHeight,
    });
  }

  /**
   * sets text and logo dependent on coin
   */
  setTextAndLogo() {
    var text;
    var logo;
    switch (this.state.symbol) {
      case "btc":
        text = `Bitcoin is the world's leading cryptocurrency based on a decentrally organized system.
                                Payments are cryptographically authenticated and processed via a network of computers.`;
        logo = BTC_logo;
        break;
      case "eth":
        text = `Ethereum is the second largest cryptocurrency platform by market capitalization, behind Bitcoin. 
                                It is a decentralized open source blockchain featuring smart contract functionality.`;
        logo = ETH_logo;
        break;
      case "usdt":
        text = `Tether is an unregulated crypto currency with tokens issued by Tether Limited. 
                                Tether is traded as a so-called stablecoin 1:1 to the US dollar.`;
        logo = USDT_logo;
        break;
      case "xrp":
        text = `XRP is an open source protocol for a payment network, based on an idea by web developer Ryan Fugger, 
                                businessman Chris Larsen and programmer Jed McCaleb. It is further developed by Ripple Labs.`;
        logo = XRP_logo;
        break;
      case "bch":
        text = `Bitcoin Cash is a crypto currency that was created on August 1, 2017 through a hard fork from 
                                the Bitcoin network. Bitcoin Cash is the fourth largest crypto currency by market capitalization.`;
        logo = BCH_logo;
        break;
      case "bsv":
        text = `Bitcoin SV is a crypto currency based on the Bitcoin protocol. Its goal is to restore the original 
                                protocol rules and "freeze" these rules, as intended by Bitcoin inventor Satoshi Nakamoto.`;
        logo = BSV_logo;
        break;
      case "ltc":
        text = `Litecoin is a peer-to-peer cryptocurrency and open-source software project. Transfer of coins is 
                                based on an open source cryptographic protocol and is not managed by any central authority`;
        logo = LTC_logo;
        break;
      case "bnb":
        text = `The Chinese Exchange Binance introduced the native token Binance Coin on 8 July 2017. It is a token 
                                exclusively for their own trading exchange.`;
        logo = BNB_logo;
        break;
      case "eos":
        text = `EOS.IO is a blockchain protocol powered by the native cryptocurrency EOS. The smart contract 
                                platform claims to eliminate transaction fees and also conduct millions of transactions per second.`;
        logo = EOS_logo;
        break;
      case "xtz":
        text = `Tezos is a technology for deploying a blockchain capable of modifying its own set of rules with minimal 
                                disruption to the network through an on-chain governance model.`;
        logo = XTZ_logo;
        break;
      default:
        text = undefined;
        logo = undefined;
        break;
    }

    this.setState({
      text: text,
      logo: logo,
    });
  }

  /**
   * converts coin symbol to full name
   * @param {String} symbol
   */
  getNameFromSymbol(symbol) {
    const symbols = {
      btc: "bitcoin",
      eth: "ethereum",
      usdt: "tether",
      xrp: "xrp",
      bch: "bitcoinCash",
      bsv: "bitcoinSV",
      ltc: "litecoin",
      bnb: "binancecoin",
      eos: "eos",
      xtz: "tezos",
    };

    return symbols[symbol];
  }

  /**
   * gets balance of user
   */
  getBalance() {
    UserService.getUserBalance(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          currentUSD: response.balance.toFixed(2),
          currentCoin: response[this.state.coin].toFixed(5),
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
        });
      }
    );
  }

  /**
   * gets coin price
   * @param {String} coin
   */
  getAPIData(coin) {
    ExchangeService.getCurrentPrice(coin).then((response) => {
      this.setState({
        price: response,
      });
    });
    ExchangeService.getPercentChange(coin).then((response) => {
      this.setState({
        changeH: response.hour,
        changeD: response.day,
        changeW: response.week,
      });
      response.hour >= 0
        ? (document.getElementById("changeH").style.color = "#28A745")
        : (document.getElementById("changeH").style.color = "#EF534F");
      response.day >= 0
        ? (document.getElementById("changeD").style.color = "#28A745")
        : (document.getElementById("changeD").style.color = "#EF534F");
      response.week >= 0
        ? (document.getElementById("changeW").style.color = "#28A745")
        : (document.getElementById("changeW").style.color = "#EF534F");
    });
  }

  /**
   * handles changes in coin input
   */
  onChangeCoin() {
    document.getElementById("inputUSD").value = (
      this.state.price * document.getElementById("inputCoin").value
    ).toFixed(2);
  }

  /**
   * handles changes in USD input
   */
  onChangeUSD() {
    document.getElementById("inputCoin").value = (
      (1 / this.state.price) *
      document.getElementById("inputUSD").value
    ).toFixed(5);
  }

  /**
   * handles logout
   * @param {Event} e
   */
  handleLogout(e) {
    e.preventDefault();
    AuthService.logout();
    window.location.reload();
  }

  /**
   * handles buy
   * @param {Event} e
   */
  handleBuy(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    UserService.buy(
      this.state.currentUser.username,
      this.state.coin,
      document.getElementById("inputUSD").value
    ).then(
      (response) => {
        this.getBalance();
        this.setState({
          buySuccess: true,
          coinsBought: response.coinsBought.toFixed(5),
          buyModal: true,
        });
        console.log(response);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          failure: true,
          message: resMessage,
        });
      }
    );
  }

  /**
   * handles sell
   * @param {Event} e
   */
  handleSell(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    UserService.sell(
      this.state.currentUser.username,
      this.state.coin,
      document.getElementById("inputUSD").value
    ).then(
      (response) => {
        this.getBalance();
        this.setState({
          sellSuccess: true,
          coinsSold: response.coinsSold.toFixed(5),
        });
        console.log(response);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          failure: true,
          message: resMessage,
        });
      }
    );
  }

  /**
   * render-function of Coin
   */
  render() {
    const {
      currentUser,
      currentUSD,
      currentCoin,
      coinsBought,
      coinsSold,
      price,
      changeH,
      changeD,
      changeW,
      coin,
      symbol,
      text,
      logo,
    } = this.state;

    if (currentUser === null) {
      this.props.history.push("/login");
      window.location.reload();
    }

    if (coin === undefined) {
      return (
        <Container fluid>
          <Navbar className="z-100">
            <Navbar.Brand href="./">
              <img src={Logo} alt="PaperCoin" />
            </Navbar.Brand>
          </Navbar>

          <Row className="main-content">
            <Image src={PageNotFound} className="mx-auto my-auto"></Image>
          </Row>
        </Container>
      );
    }

    return (
      <Container fluid>
        <Navbar className="z-100" id="navbar">
          <Navbar.Brand href="./">
            <img src={Logo} alt="PaperCoin" />
          </Navbar.Brand>
          <Nav className="mr-auto w-100">
            <Button href="./dashboard" className="w-15 ml-4">
              Dashboard
            </Button>
            <Button href="./about" className="w-15 ml-4">
              About
            </Button>
          </Nav>
          <Navbar.Text className="w-20 text-light mr-2">
            Your Balance:
          </Navbar.Text>
          <Navbar.Text className="text-light mr-4 ml-n4">
            ${currentUSD}
          </Navbar.Text>
          <Button className="w-15" onClick={this.handleLogout}>
            Logout
          </Button>
        </Navbar>

        <Row
          style={{
            height: "calc(100vh - 76px)",
            marginBottom: "0px",
            margin: "0",
            padding: "0",
          }}
        >
          <Col md="8" className="h-100 m-0 p-0 pb-2 pl-2 bg-dark">
            <div
              className="rounded w-100 h-100"
              style={{ border: "2px solid grey" }}
            >
              <TradingViewWidget
                autosize
                symbol={this.state.symbol + "USD"}
                interval="5"
                timezone="Europe/Berlin"
                theme="Dark"
                locale="de_DE"
                toolbar_bg="#f1f3f6"
                hide_top_toolbar
              />
            </div>
          </Col>

          <Col md="4" className="h-100 m-0 p-0 pr-2 pb-2 pl-2">
            <div
              className="h-27_5 rounded d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "#131821", border: "2px solid grey" }}
            >
              <div className="h-100 w-25 d-flex justify-content-center align-items-center">
                <img src={logo} alt="logo" className="w-100 ml-2"></img>
              </div>
              <div className="h-100 w-75 d-flex justify-content-center align-items-center">
                <div className="w-95">
                  <h5 className="text-center">
                    {coin.slice(0, 1).toUpperCase() + coin.slice(1)}{" "}
                    <span className="text-secondary">
                      {symbol.toUpperCase()}
                    </span>
                  </h5>
                  <span className="text-align-left">{text}</span>
                </div>
              </div>
            </div>
            <div className="h-14_5 pt-2">
              <div
                className="rounded text-center"
                style={{
                  backgroundColor: "#131821",
                  height: "100%",
                  border: "2px solid grey",
                }}
              >
                <h5 className="w-100 mt-2">
                  {symbol.toUpperCase() + " in your Portfolio"}
                </h5>
                <Table striped bordered hover variant="dark" className="w-100">
                  <tr>
                    <td>{currentCoin}x</td>
                    <td> ${(price * currentCoin).toFixed(2)}</td>
                  </tr>
                </Table>
              </div>
            </div>
            <div className="h-28 pt-2">
              <div
                className="rounded text-center"
                style={{
                  backgroundColor: "#131821",
                  height: "100%",
                  border: "2px solid grey",
                }}
              >
                <h5 className="w-100 mt-2">Performance</h5>
                <Table striped bordered hover variant="dark" className="w-100">
                  <tr>
                    <td>Change hour</td>
                    <td id="changeH">{changeH} %</td>
                  </tr>
                  <tr>
                    <td>Change day</td>
                    <td id="changeD">{changeD} %</td>
                  </tr>
                  <tr>
                    <td>Change week</td>
                    <td id="changeW">{changeW} %</td>
                  </tr>
                </Table>
              </div>
            </div>
            <div className="h-30 pt-2">
              <div
                className="rounded"
                style={{
                  backgroundColor: "#131821",
                  height: "100%",
                  border: "2px solid grey",
                }}
              >
                <Form className="w-100 h-100">
                  <div className="h-30 text-center pt-1">
                    <h5>Current Price</h5>
                    <h4>
                      <b>${price}</b>
                    </h4>
                  </div>
                  <div className="h-15 d-flex justify-content-center">
                    <Form.Label className="text-center w-45 d-inline mr-3">
                      {"Amount " + symbol.toUpperCase()}
                    </Form.Label>
                    <Form.Label className="text-center w-45 d-inline">
                      Price USD
                    </Form.Label>
                  </div>
                  <div className="h-25 d-flex justify-content-center">
                    <Form.Control
                      id="inputCoin"
                      className="w-45 d-inline mr-3"
                      onChange={this.onChangeCoin}
                      placeholder="0.00000"
                      type="number"
                    ></Form.Control>
                    <Form.Control
                      id="inputUSD"
                      className="w-45 d-inline"
                      onChange={this.onChangeUSD}
                      placeholder="0.00"
                      type="number"
                    ></Form.Control>
                  </div>
                  <div className="h-30 d-flex justify-content-center">
                    <div className="w-50 h-100 d-flex justify-content-center">
                      <Button
                        className="w-95 h-90 bg-green border-0"
                        onClick={this.handleBuy}
                        disabled={this.state.loading}
                      >
                        <h4 className="m-auto">Buy</h4>
                      </Button>
                    </div>
                    <div className="w-50 h-100 d-flex justify-content-center">
                      <Button
                        className="w-95 h-90 bg-red border-0"
                        onClick={this.handleSell}
                        disabled={this.state.loading}
                      >
                        <h4 className="m-auto">Sell</h4>
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>

        <Modal
          size="sm"
          centered
          show={this.state.buySuccess}
          onHide={() => this.setState({ buySuccess: false, loading: false })}
        >
          <Modal.Header className="bg-success" closeButton>
            <Modal.Title>Successful purchase!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
            <Table striped bordered hover variant="dark">
              <tr>
                <td>Bought:</td>
                <td>{coinsBought + " " + symbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{currentCoin + " " + symbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Balance:</td>
                <td>${currentUSD}</td>
              </tr>
            </Table>
          </Modal.Body>
        </Modal>

        <Modal
          size="sm"
          centered
          show={this.state.sellSuccess}
          onHide={() => this.setState({ sellSuccess: false, loading: false })}
        >
          <Modal.Header className="bg-success" closeButton>
            <Modal.Title>Successful sale!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
            <Table striped bordered hover variant="dark">
              <tr>
                <td>Sold:</td>
                <td>{coinsSold + " " + symbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{currentCoin + " " + symbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Balance:</td>
                <td>${currentUSD}</td>
              </tr>
            </Table>
          </Modal.Body>
        </Modal>

        <Modal
          size="sm"
          centered
          show={this.state.failure}
          onHide={() => this.setState({ failure: false, loading: false })}
        >
          <Modal.Header className="bg-danger" closeButton>
            <Modal.Title>Action failed!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
            {this.state.message}
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

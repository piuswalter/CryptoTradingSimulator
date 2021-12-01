// imports
import React from "react";
import { Container, Row, Col, Image, Button, Navbar } from "react-bootstrap";
import { AuthService } from "../services";
import { Wave, Portfolio, Logo } from "../img";

// component LandingPage
export default class LandingPage extends React.Component {
  /**
   * constructor of LandingPage
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  /**
   * render-function of LandingPage
   */
  render() {
    const { currentUser } = this.state;

    if (currentUser != null) {
      this.props.history.push("/dashboard");
      window.location.reload();
    }

    return (
      <Container fluid>
        <Image src={Wave} className="position-fixed h-100"></Image>

        <Navbar className="z-100">
          <Navbar.Brand href="./">
            <img src={Logo} alt="PaperCoin" />
          </Navbar.Brand>
        </Navbar>

        <Row className="main-content">
          <Col className="d-flex" style={{ pointerEvents: "none" }}>
            <Image
              src={Portfolio}
              className="mx-auto my-auto h-60"
              fluid
            ></Image>
          </Col>
          <Col className="d-flex">
            <div className="mx-auto my-auto">
              <h1>Build Your Portfolio</h1>
              <h3>Papertrading with cryptocurrencies</h3>
              <Button
                variant="primary"
                size="lg"
                className="mt-3"
                href="./login"
              >
                Get Started!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

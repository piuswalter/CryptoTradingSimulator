import React, { Component } from 'react';

class GetAPI extends Component {
    // Initialize the state
    constructor(props){
        super(props);
        this.state = {expressResponse: ""}
    }

    callExpress() {
        fetch("/testing-router")
            .then(res => res.text())
            .then(res => this.setState({expressResponse: res}))
            .catch((err => err));

    }
    componentDidMount() {
        this.callExpress()
    }

    render() {

        return (
            <div className="App">
                <h1>React App: </h1>

                <h2>{this.state.expressResponse}</h2>
                    </div>
                )
                }
}

export default GetAPI;
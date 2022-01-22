/* eslint no-undef: 0 */ // --> OFF
import React from 'react';
import './App.css';
import GetUsernamePopup from './GetUsernamePopup';
import MainApp from './MainApp'

class App extends React.Component {   
    constructor (props) {
        super(props);
        this.state = {unameSubmitted: false, uname: ''};

        this.unameSubmitSuccess = this.unameSubmitSuccess.bind(this);
    }

    unameSubmitSuccess() {
        this.setState({unameSubmitted: true});
    }

    render() {
        const unameSubmitted = this.state.unameSubmitted;
        return (
            <div>
                {!unameSubmitted
                    ? <GetUsernamePopup onUsernameSubmit={this.unameSubmitSuccess}/>
                    : <MainApp />
                }
            </div>
        );
    }
}

export default App;

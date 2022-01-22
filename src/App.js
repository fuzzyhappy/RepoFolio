/* eslint no-undef: 0 */ // --> OFF
import React from 'react';
import './App.css';
import GetUsernamePopup from './GetUsernamePopup';
import MainApp from './MainApp'

class App extends React.Component {   
    constructor (props) {
        super(props);
        this.state = {unameSubmitted: false, userData: [], repoData: []};

        this.unameSubmitSuccess = this.unameSubmitSuccess.bind(this)
    }

    unameSubmitSuccess(recvUserData, recvRepoData) {
        this.setState({userData: recvUserData});
        this.setState({repoData: recvRepoData});
        console.log(this.state.userData);
        console.log(this.state.repoData);
        this.setState({unameSubmitted: true});
        
    }

    render() {
        const unameSubmitted = this.state.unameSubmitted;
        return (
            <div>
                {!unameSubmitted
                    ? <GetUsernamePopup onUsernameSubmit={this.unameSubmitSuccess}/>
                    : <MainApp userData={this.state.userData} repoData={this.state.repoData}/>
                }
            </div>
        );
    }
}

export default App;

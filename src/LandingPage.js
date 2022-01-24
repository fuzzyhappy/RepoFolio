import React from 'react';
import './LandingPage.css'
import { Octokit } from 'octokit';

export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uname: '', valid: true };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const octokit = new Octokit();
        var userData;
        var repoData;
        octokit.request("/users/" + this.state.uname)
            .then((res) => { userData = res["data"]; })
            .then(() => { return octokit.request("/users/" + this.state.uname + "/repos"); })
            .then((res) => { repoData = res["data"]; })
            .then(() => { this.props.onUsernameSubmit(userData, repoData) })
            .catch(e => {
                console.log(e);
                this.setState({ valid: false });
            });
    }

    handleChange(e) {
        this.setState({ uname: e.target.value });
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="welcome">
                    <span className="first">Welcome to</span>
                    <span className="Logo">RepoFolio</span>
                    <p className="Description">Ever feel bad for not having a portfolio website to show off on a job application? Me too! So my friend, Dan, and I made a React app that does it for you!</p>
                </div>

                <div className='divider'></div>

                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Try it out by entering your GitHub username!
                        </label>
                        <input type="text" value={this.state.uname} onChange={this.handleChange} />
                        <input className="button" type="submit" value="Submit" />
                    </form>
                    {!this.state.valid && <p className="usernameError">An error occured, please try again.</p>}
                </div>

            </div>
        );
    }
}
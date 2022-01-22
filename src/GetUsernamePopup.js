import React from 'react';
import { Octokit } from 'octokit';

export default class GetUsernamePopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uname: '', valid: true };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const octokit = new Octokit({ auth: "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" });
        octokit.request("/users/" + this.state.uname + "/repos")
            .then((res) => {
                console.log(res["data"]);
                this.props.onUsernameSubmit(true);  
            })
            .catch(e => {
                console.log("error!");
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
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Enter your GitHub username to continue:
                            <input type="text" value={this.state.uname} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    {!this.state.valid && <p className="usernameError">An error occured, please try again.</p>}
                </div>
            </div>
        );
    }
}
import React from 'react';
import './App.css';
import {Octokit} from 'octokit';

class GetUsernamePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {uname: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.uname);
    const octokit = new Octokit();
    octokit.request("/users/" + this.state.uname + "/repos").then(console.log);
  }

  handleChange(e) {
    this.setState({uname: e.target.value});
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
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <GetUsernamePopup />
    </div>
    
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Octokit } from "octokit";
const octokit = new Octokit();

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
/*
  Should:
  - have a text box for username
  - When user enters username, check if valid (i.e. GitHub API call made sense)
    - if valid, load the main app
    - if invalid, display some red text saying try again
*/
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

class Card extends React.Component {

}

/*
Initialize the whole main app by using GitHub repo information that should've been retrieved from the popup.
Maybe add little loading spinny circle while the app is generating. 
*/
class MainApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {repoData: props.repoData};
  }

  render() {
    return (
      <div>
        heelo
      </div>
    );
  }
}


function App() {
  return (
    <GetUsernamePopup />
  );
}

export default App;
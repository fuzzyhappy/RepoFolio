import React from 'react';
import './MainApp.css'

function Card(props) {
    return (
        <div className="card">
            <span className="title">{props.project["name"]}</span>
            <span className="subtitle">{props.project["created_at"]}</span>
            <p>{props.project["description"]}</p>
            <div className="footer">
                <a href="https://github.com">Repository Link</a>
            </div>
        </div>
    );
}

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: props.userData, repoData: props.repoData };
    }

    render() {
        const repoData = this.state.repoData;
        return (
            <div>
                <div className="header">
                    <div className="pfp"></div>
                    <h1>Username</h1>
                    <ul className="navbar">
                        <li><a href="https://google.com">About</a></li>
                        <li><a href="https://google.com">Projects</a></li>
                    </ul>

                </div>
                <div className="container">
                    {repoData.map((project, index) =>
                        <Card project={project} key={index} />
                    )}
                </div>
            </div>
        );
    }
}
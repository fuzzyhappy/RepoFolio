import React from 'react';
import './MainApp.css'

function Card(props) {
    return (
        <div class="card">
            <span class="title">{props.project["name"]}</span>
            <span class="subtitle">{props.project["created_at"]}</span>
            <p>{props.project["description"]}</p>
            <div class="footer">
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
                <div class="header">
                    <div class="pfp"></div>
                    <h1>Username</h1>
                    <ul class="navbar">
                        <li><a href="https://google.com">About</a></li>
                        <li><a href="https://google.com">Projects</a></li>
                    </ul>

                </div>
                <div className="container">
                    {repoData.map((project, index) =>
                        <Card project={project} idx={index} />
                    )}
                </div>
            </div>
        );
    }
}
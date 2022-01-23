import React from 'react';
import './MainApp.css'
import { FaEyeSlash } from 'react-icons/fa';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editable: true, project: props.project}
    }

    render() {
        const editable = this.state.editable;
        const project = this.state.project;
        const description = project["description"] == null ? '' : project["description"];
        return (
            <div className="card">
                <span className="title">{project["name"]}</span>
                <span className="subtitle">{project["created_at"].split("T")[0]}</span>
                {editable
                    ? <textarea defaultValue={description}></textarea>
                    : <p>{description}</p>}
                <div className="footer">
                    <a href={project["html_url"]}>Repository Link</a>
                    {editable && <button className="hide-project-button"><FaEyeSlash /></button>}
                </div>
            </div>
        );
    }
    

}

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: props.userData, 
        projectData: props.repoData.map(project => [true, project])};
    }

    render() {
        const userData = this.state.userData;
        const projectData = this.state.projectData;
        const visibleProjects = projectData.map(([visible, project]) => (visible && project));
        return (
            <div>
                <div className="header">
                    <div className="pfp"></div>
                    <h1>{userData["name"]}</h1>
                    <ul className="navbar">
                        <li><a href="https://google.com">About</a></li>
                        <li><a href="https://google.com">Projects</a></li>
                    </ul>

                </div>
                <div className="container">
                    {visibleProjects.map((project, index) =>
                        <Card project={project} key={index} />
                    )}
                </div>
            </div>
        );
    }
}
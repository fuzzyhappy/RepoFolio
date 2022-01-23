import React from 'react';
import { FaEye } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default class HiddenCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { project: props.project }  

        this.unhideThisProject = this.unhideThisProject.bind(this);
    }

    unhideThisProject() {
        this.props.onUnhideProject(this.state.project["id"]);
    }

    render() {
        const project = this.state.project;
        const description = project["description"] == null ? '' : project["description"];
        return (
            <div className="card">
                <span className="annotation">Hidden</span>
                <span className="title">{project["name"]}</span>
                <span className="subtitle">{project["created_at"].split("T")[0]}</span>
                <p>{description}</p>
                <div className="footer">
                    <a href={project["html_url"]}>Repository Link</a>
                    <button className="card-button" onClick={this.unhideThisProject}>
                        <IconContext.Provider value={{ className: "eye-icon" }}>
                            <FaEye />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        );
    }
}
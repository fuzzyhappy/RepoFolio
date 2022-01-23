import React from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        // we "own" props.project so we ignore changes from the parent about props.project, i.e.
        // we don't refresh every time props.project is changed (actually, props.project is changed every time we type a character into the text box!)
        // but we maintain that we update the parents project with handleDescChange.
        // whenever Card is rerendered, it will correctly carry the most recent changes we made since we update the parent's project.
        this.state = { project: props.project, fileDownloadUrl: null }  

        this.hideThisProject = this.hideThisProject.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    hideThisProject() {
        this.props.onHideProject(this.state.project["id"]);
    }

    handleDescChange(e) {
        this.props.updateProjectField("description", e.target.value, this.state.project["id"])
    }

    render() {
        const editable = this.props.editable;
        const project = this.state.project;
        const description = project["description"] == null ? '' : project["description"];
        return (
            <div className="card">
                <span className="title">{project["name"]}</span>
                <span className="subtitle">{project["created_at"].split("T")[0]}</span>
                {editable
                    ? <textarea defaultValue={description} onChange={this.handleDescChange} spellCheck="false"></textarea>
                    : <p>{description}</p>}
                <div className="footer">
                    <a href={project["html_url"]}>Repository Link</a>
                    {editable && <button className="hide-project-button" onClick={this.hideThisProject}>
                        <IconContext.Provider value={{ className: "eye-icon" }}>
                            <FaEyeSlash />
                        </IconContext.Provider>
                    </button>}
                </div>
            </div>
        );
    }
}
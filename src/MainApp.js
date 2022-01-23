import React from 'react';
import './MainApp.css'
import { FaEyeSlash, FaSave, FaPencilRuler } from 'react-icons/fa';
import { IconContext } from "react-icons";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editable: props.editable, project: props.project, fileDownloadUrl: null }

        this.hideThisProject = this.hideThisProject.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    hideThisProject() {
        this.props.onHideProject(this.state.project["id"]);
    }

    handleDescChange(e) {
        this.props.updateField("description", e.target.value, this.state.project["id"])
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

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.userData,
            visibleProjects: props.repoData.map(project => {
                var newProject = project;
                newProject['refreshDecider'] = newProject["id"] + Date.now();
                console.log(newProject["created_at"]);
                return newProject;}),
            hiddenProjects: [],
            editMode: true
        };

        this.exportPage = this.exportPage.bind(this);
        this.hideProject = this.hideProject.bind(this);
        this.updateField = this.updateField.bind(this);
        this.doPreviewMode = this.doPreviewMode.bind(this);
        this.doEditMode = this.doEditMode.bind(this);
    }

    // We need onChange from the textareas to update data inside MainApp (basically, every keystroke)
    // this setState doesn't refresh the cards because their refreshDecider doesn't change! 
    updateField(fieldname, content, id) {
        const newList = this.state.visibleProjects.map(project => {
            if (project["id"] === id) {
                var newProject = project;
                newProject[fieldname] = content;
                return newProject;
            } else {
                return project;
            }
        })
        this.setState({visibleProjects: newList});
    }

    exportPage(e) {
        e.preventDefault();
        const output = new XMLSerializer().serializeToString(document);
        const blob = new Blob([output]);
        const fileDownloadUrl = URL.createObjectURL(blob);
        this.setState({ fileDownloadUrl: fileDownloadUrl },
            () => {
                this.dofileDownload.click();
                URL.revokeObjectURL(fileDownloadUrl);
                this.setState({ fileDownloadUrl: "" })
            })
    }

    hideProject(id) {
        const idx = this.state.visibleProjects.findIndex(project => project["id"] === id)
        this.setState({ hiddenProjects: [...this.state.hiddenProjects, this.state.visibleProjects[idx]] });
        this.setState({ visibleProjects: this.state.visibleProjects.filter((project, index) => index !== idx) });
    }

    // by updating the refreshDecider of the whole visibleProjects, we force a refresh since .map assigns key based on refreshDecider
    doPreviewMode() { 
        this.setState({ editMode: false });
        this.setState({ visibleProjects: this.state.visibleProjects.map(project => {
            var newProject = project;
            newProject["refreshDecider"] = newProject["id"] + Date.now();
            return newProject;
        })});
    }
    doEditMode() { 
        this.setState({ editMode: true });
        this.setState({ visibleProjects: this.state.visibleProjects.map(project => {
            var newProject = project;
            newProject["refreshDecider"] = newProject["id"] + Date.now();
            return newProject;
        })});
    }

    render() {
        var userData = this.state.userData;
        var visibleProjects = this.state.visibleProjects;
        var editMode = this.state.editMode;

        return (
            <div>
                <a style={{ display: "none" }}
                    download="index.html"
                    href={this.state.fileDownloadUrl}
                    ref={e => this.dofileDownload = e} />

                <div className="header">
                    <div className="pfp"></div>
                    <h1>{userData["name"]}</h1>
                    <button onClick={this.exportPage} className="export-button">
                        <IconContext.Provider value={{ className: "export-icon" }}>
                            <FaSave />
                        </IconContext.Provider>
                        <span>Export</span></button>
                    <button className="work-button" onClick={editMode ? this.doPreviewMode : this.doEditMode}>
                    <IconContext.Provider value={{ className: "work-icon" }}>
                            <FaPencilRuler />
                    </IconContext.Provider>
                        {editMode ? "Edit Mode" : "View Mode"} 
                    </button>
                    <ul className="navbar">
                        <li><a href="https://google.com">About</a></li>
                        <li><a href="https://google.com">Projects</a></li>
                    </ul>
                </div>
                <div className="container">
                    {visibleProjects.map((project, index) =>
                        <Card
                            project={project}
                            key={project["refreshDecider"]}
                            editable={editMode}
                            onHideProject={this.hideProject}
                            updateField={this.updateField} />)}
                </div>
            </div>
        );
    }
}
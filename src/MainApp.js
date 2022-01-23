import React from 'react';
import './MainApp.css'
import { FaSave, FaPencilRuler } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Card from './Card.js';
import HiddenCard from './HiddenCard.js';
import BioEditor from './BioEditor.js';
import FooterEditor from './FooterEditor';

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.userData,
            visibleProjects: props.repoData,
            hiddenProjects: [],
            editMode: true
        };

        this.exportPage = this.exportPage.bind(this);
        this.hideProject = this.hideProject.bind(this);
        this.unhideProject = this.unhideProject.bind(this);
        this.updateProjectField = this.updateProjectField.bind(this);
        this.updateUserField = this.updateUserField.bind(this);
        this.doPreviewMode = this.doPreviewMode.bind(this);
        this.doEditMode = this.doEditMode.bind(this);
    }

    // We need onChange from the textareas to update data inside MainApp (basically, every keystroke)
    // this setState doesn't refresh the cards because Card ignores it (see Card.js for details)
    updateProjectField(fieldname, content, id) {
        const newList = this.state.visibleProjects.map(project => {
            if (project["id"] === id) {
                var newProject = project;
                newProject[fieldname] = content;
                return newProject;
            } else {
                return project;
            }
        })
        this.setState({ visibleProjects: newList });
    }

    updateUserField(fieldname, content) {
        const newUserData = this.state.userData;
        newUserData[fieldname] = content;
        this.setState({ userData: newUserData });
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

    unhideProject(id){
        const idx = this.state.hiddenProjects.findIndex(project => project["id"] === id)
        this.setState({ visibleProjects: [...this.state.visibleProjects, this.state.hiddenProjects[idx]] });
        this.setState({ hiddenProjects: this.state.hiddenProjects.filter((project, index) => index !== idx) });
    }

    doPreviewMode() {
        this.setState({ editMode: false });
    }

    doEditMode() {
        this.setState({ editMode: true });
    }

    render() {
        var userData = this.state.userData;
        var visibleProjects = this.state.visibleProjects;
        var hiddenProjects = this.state.hiddenProjects;
        var editMode = this.state.editMode;

        return (
            <div>
                <a style={{ display: "none" }}
                    download="index.html"
                    href={this.state.fileDownloadUrl}
                    ref={e => this.dofileDownload = e} />

                <div className="header">
                    <img src={userData["avatar_url"]} className="pfp"/>
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
                        <li><a href="#about-section">About</a></li>
                        <li><a href="#contact-section">Contact</a></li>
                    </ul>
                </div>

                <div className='filler'></div>

                <div className="container">
                    {visibleProjects.map((project, index) =>
                        <Card
                            project={project}
                            key={project["id"]}
                            editable={editMode}
                            onHideProject={this.hideProject}
                            updateProjectField={this.updateProjectField} />)}
                </div>
                {hiddenProjects.length > 0 && editMode && <div className="hidden container">
                    {hiddenProjects.map((project, index) =>
                        <HiddenCard
                            project={project}
                            key={project["id"]}
                            onUnhideProject={this.unhideProject}/>)}
                </div>}

                <div className='filler'></div>
                <div className="about" id="about-section">
                    <div className="about-me">
                    <a id="about-section"></a>About Me
                    </div>
                    <BioEditor editable={editMode} userData={userData} updateUserField={this.updateUserField}/>
                </div>

                <FooterEditor editable={editMode} userData={userData} updateUserField={this.updateUserField}/>
            </div>
        );
    }
}
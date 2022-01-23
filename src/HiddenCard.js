import React from 'react';

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
                    <a href="https://github.com">Repository Link</a>
                    <button className="reveal-button" onClick={this.unhideThisProject}>Unhide</button>
                </div>
            </div>
        );
    }
}
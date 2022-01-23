import React from 'react';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: props.userData};

        this.handleBioChange = this.handleBioChange.bind(this);
    }

    handleBioChange(e) {
        this.props.updateUserField("bio", e.target.value)
    }

    render() {
        const editable = this.props.editable;
        const userData = this.state.userData;
        return (
            <div className="about-me-text">
            {editable
                ? <textarea defaultValue={userData["bio"]} onChange={this.handleBioChange} spellCheck="false"></textarea>
                : <p>{userData["bio"]}</p>}
            </div>
        );
    }
}
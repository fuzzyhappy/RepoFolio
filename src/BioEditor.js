import React from 'react';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: props.userData};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field, e) {
        this.props.updateUserField(field, e.target.value)
    }

    render() {
        const editable = this.props.editable;
        const userData = this.state.userData;
        return (
            <div className="about-me-text">
            {editable
                ? <textarea defaultValue={userData["bio"]} onChange={e => this.handleChange("bio", e)} spellCheck="false"></textarea>
                : <p>{userData["bio"]}</p>}
            </div>
        );
    }
}
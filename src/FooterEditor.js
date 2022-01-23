import React from 'react';

export default class FooterEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userData: props.userData };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field, e) {
        this.props.updateUserField(field, e.target.value)
    }

    render() {
        const editable = this.props.editable;
        const userData = this.state.userData;
        if (editable) {
            return (
                <div className="contact">
                    <a id="contact-section"></a>
                    <ul>
                        <li><label>Email</label></li>
                        <li>
                            <textarea className='footer-textarea' defaultValue={userData["email"] == null ? '' : userData["email"]} 
                                onChange={e => this.handleChange("email", e)} 
                                spellCheck="false"></textarea></li>
                        <li><a href={("https://www.github.com/" + userData["login"])}>GitHub</a></li>
                        <li><label>Twitter Handle</label></li>
                        <li>
                            <textarea className='footer-textarea' defaultValue={userData["twitter_username"] == null ? '' : userData["twitter_username"]} 
                                onChange={e => this.handleChange("twitter_username", e)} 
                                spellCheck="false"></textarea></li>
                        <li><label>LinkedIn</label></li>
                        <li><textarea className='footer-textarea' defaultValue={userData["linkedin_url"] == null ? '' : userData["linkedin_url"]} 
                                onChange={e => this.handleChange("linkedin_url", e)} 
                                spellCheck="false"></textarea></li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="contact">
                    <a id="contact-section"></a>
                    <ul>
                        {(userData["email"] != null && userData["email"] != '') && 
                            <li><a onClick={e => navigator.clipboard.writeText(userData["email"])}>Email</a></li>}
                        <li><a href={("https://www.github.com/" + userData["login"])}>GitHub</a></li>
                        {(userData["twitter_username"] != null && userData["twitter_username"] != '') && 
                            <li><a href={("https://www.twitter.com/" + userData["twitter_username"])}>Twitter</a></li>}
                        {(userData["linkedin_url"] != null && userData["linkedin_url"] != '') && 
                            <li><a href={userData["linkedin_url"]}>LinkedIn</a></li>}
                    </ul>
                </div>
            );
        }
    }
}
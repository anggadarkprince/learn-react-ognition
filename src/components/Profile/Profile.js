import React from 'react';
import './Profile.css';
import variables from "../../variables";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            password: '',
        }
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case 'name':
                this.setState({name: event.target.value});
                break;
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        const options = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        }
        fetch(`${variables.API_URL}/profile/${this.props.user.id}`, options)
            .then((resp) => {
                if (resp.status === 200) {
                    this.props.toggleModal();
                    this.props.loadUser({...this.props.user, ...data});
                }
            })
            .catch(err => console.log(err.message));
    }

    render() {
        const {user} = this.props;
        const {name, email, password} = this.state;
        return (
            <div className='profile-modal'>
                <article className="ma3">
                    <main
                        className="ml-auto mr-auto pa4 black-80 br3 shadow-5 bg-white ba b--black-10 mv4 w-100 w-50-m w-25-l">
                        <div className={'modal-close'} onClick={this.props.toggleModal}>&times;</div>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 mb0">Profile</legend>
                            <p className='mb0'>Images submitted: {user.entries}</p>
                            <small className='gray'>Since {(new Date(user.joined)).toDateString()}</small>
                            <hr/>
                            <div className="mb3">
                                <label className="db fw6 lh-copy f6 mb1" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                       placeholder='Full name' type="text" name="name" id="name"
                                       onChange={this.onFormChange} value={this.state.name}/>
                            </div>
                            <div className="mb3">
                                <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                       placeholder='Email address' type="email" name="email" id="email-address"
                                       onChange={this.onFormChange} value={this.state.email}/>
                            </div>
                            <div className="mb3">
                                <label className="db fw6 lh-copy f6 mb1" htmlFor="password">Change Password</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                       placeholder='Change password' type="password" name="password" id="password"
                                       onChange={this.onFormChange}/>
                            </div>
                        </fieldset>
                        <button onClick={() => this.onProfileUpdate({name, email, password})}
                                className="b ph3 pv2 input-reset ba white bg-blue grow pointer f6 dib"
                                type="button">Save
                        </button>
                        <button onClick={this.props.toggleModal}
                                className="b ph3 pv2 input-reset ba white bg-red grow pointer f6 dib">Cancel
                        </button>
                    </main>
                </article>
            </div>
        );
    }
}

export default Profile;
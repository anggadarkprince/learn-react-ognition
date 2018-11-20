import React from 'react';
import variables from "../../variables";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch(variables.API_URL + '/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    if (data.user.id) {
                        this.props.loadUser(data.user);
                        this.props.onRouteChange('home');
                    }
                } else {
                    alert(data.status);
                    console.log(data.status);
                }
            });
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="ma3">
                <main
                    className="ml-auto mr-auto pa4 black-80 br3 shadow-5 bg-white ba b--black-10 mv4 w-50-m w-25-l">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 mb0">Sign In</legend>
                        <p className='mt0 black-30'>Login to your dashboard</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray" placeholder='Your email address'
                                   onChange={this.onEmailChange} type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray" placeholder='Secret password'
                                   onChange={this.onPasswordChange} type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignIn}
                               className="b ph3 pv2 input-reset ba white bg-blue grow pointer f6 dib"
                               type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <strong>Need account? </strong>
                        <a onClick={(e) => {
                            e.preventDefault();
                            onRouteChange('register')
                        }}
                           className="f6 link dim black cursor-pointer">Register here</a>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;
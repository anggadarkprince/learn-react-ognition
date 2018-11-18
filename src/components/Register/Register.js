import React from 'react';
import variables from "../../variables";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        fetch(variables.API_URL + '/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    alert(user);
                    console.log(user);
                }
            });
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="ma3">
                <main
                    className="ml-auto mr-auto pa4 black-80 br3 shadow-5 bg-white ba b--black-10 mv4 w-100 w-50-m w-25-l">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 mb0">Register</legend>
                        <p className='mt0 black-30'>Register new account</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray" placeholder='Full name'
                                   onChange={this.onNameChange} type="text" name="name" id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray" placeholder='Email address'
                                   onChange={this.onEmailChange} type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray" placeholder='Secret password'
                                   onChange={this.onPasswordChange} type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitRegister}
                               className="b ph3 pv2 input-reset ba white bg-blue grow pointer f6 dib"
                               type="submit" value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a onClick={(e) => {
                            e.preventDefault();
                            onRouteChange('signin');
                        }} className="f6 link dim black cursor-pointer">Back to login page</a>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;
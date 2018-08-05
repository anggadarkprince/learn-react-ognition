import React from 'react';

const SignIn = ({onRouteChange}) => {
    return (
        <article className="ma3">
            <main className="ml-auto mr-auto pa4 black-80 br3 shadow-5 bg-white ba b--black-10 mv4 w-100 w-50-m w-25-l">
                <form>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 mb0">Sign In</legend>
                        <p className='mt0 black-30'>Login to your dashboard</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                   type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                   type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={() => onRouteChange('home')}
                            className="b ph3 pv2 input-reset ba white bg-blue grow pointer f6 dib"
                            type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <strong>Need account?</strong> <a href="javascript:void(0)" onClick={() => onRouteChange('register')} className="f6 link dim black">Register here</a>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default SignIn;
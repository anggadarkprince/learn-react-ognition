import React from 'react';

const Register = ({onRouteChange}) => {
    return (
        <article className="ma3">
            <main className="ml-auto mr-auto pa4 black-80 br3 shadow-5 bg-white ba b--black-10 mv4 w-100 w-50-m w-25-l">
                <form>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 mb0">Register</legend>
                        <p className='mt0 black-30'>Register new account</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 mb1" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent w-100 b--moon-gray"
                                   type="text" name="name" id="name"/>
                        </div>
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
                            type="submit" value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="javascript:void(0)" onClick={() => onRouteChange('signin')} className="f6 link dim black">Back to login page</a>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Register;
import React from 'react';

const Navigation = ({page, onRouteChange, isSignedIn}) => {
    var renderNavigation = () => {
        if(isSignedIn) {
            return (
                <div style={{display: 'flex', justifyContent: 'flex-right'}}>
                    <p onClick={() => onRouteChange('home')} className={'f5 dim white pa2 ma2 pointer' + (page === 'home' ? ' b' : '')}>Home</p>
                    <p onClick={() => onRouteChange('about')} className={'f5 link dim white pa2 ma2 pointer' + (page === 'about' ? ' b' : '')}>About</p>
                    <p onClick={() => onRouteChange('signout')} className='f5 link dim white pa2 ma2 pointer'>Sign Out</p>
                </div>
            )
        }

        return (
            <div style={{display: 'flex', justifyContent: 'flex-right'}}>
                <p onClick={() => onRouteChange('signin')} className={'f5 link dim white pa2 ma2 pointer' + ((page === 'signin' || page === 'signout') ? ' b' : '')}>Sign In</p>
                <p onClick={() => onRouteChange('register')} className={'f5 link dim white pa2 ma2 pointer' + (page === 'register' ? ' b' : '')}>Register</p>
            </div>
        )

    }

    return (
        <nav className='mb3' style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 className='f4 b white pa2 ma2'>React-Ognition</h3>
            {renderNavigation()}
        </nav>
    )
}

export default Navigation;
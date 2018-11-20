import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({page, onRouteChange, isSignedIn, toggleModal}) => {
    var renderNavigation = () => {
        if(isSignedIn) {
            return (
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('home')} className={'f5 dim white pa2 ma2 pointer' + (page === 'home' ? ' b' : '')}>Home</p>
                    <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
                </div>
            )
        }

        return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
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
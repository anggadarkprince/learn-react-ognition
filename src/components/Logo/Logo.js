import React from 'react';
import Tilt from 'react-tilt';
import icon from './icons8-brain-100.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='mb3 center'>
            <Tilt className='Tilt br4 shadow-2' options={{max: 55}} style={{height: 135, width: 135}}>
                <div className='Tilt-inner'>
                    <img src={icon} className='pa3' alt='Logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
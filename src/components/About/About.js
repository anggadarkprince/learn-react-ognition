import React from 'react';
import Logo from '../Logo/Logo'

const About = () => {
    return (
        <div className='tc pa3'>
            <Logo/>
            <h3 className='f4'>React-Cognition v1.0</h3>
            <p className='f5 mb0'>Created by Angga Ari Wijaya</p>
            <p className='mt2'>Powered By <strong>ReactJS</strong> and <strong>Clarifai</strong></p>
        </div>
    )
}

export default About;
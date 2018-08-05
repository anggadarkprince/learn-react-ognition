import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className='center mt4 mb3 pa2'>
            <div className='relative'>
                <img src={imageUrl} id={'input-image'} alt={'Face to be recognized'} width='480px' height='auto'/>
                <div className='bounding-box' style={{top: box.leftCol, right: box.topRow, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;
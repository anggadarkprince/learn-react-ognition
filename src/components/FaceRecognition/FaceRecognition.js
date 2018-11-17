import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center mt4 mb3 pa2'>
            <div className='relative'>
                <img src={imageUrl} id={'input-image'} alt={'Face to be recognized'} width='480px' height='auto'/>
                {
                    boxes.map(box => {
                        return <div key={box.topRow} className='bounding-box' style={
                            {
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCol
                            }
                        }></div>
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;
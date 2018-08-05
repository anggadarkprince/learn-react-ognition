import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3 mb0'>
                {'This Magic Brain will detect faces in your picture, give it a try'}
            </p>
            <p className='mb4 dark-gray'>Input direct url below to check the image</p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input type="text" className='f4 ba-ns br1 pa2 w-70 center' placeholder='Put image url' onChange={onInputChange}/>
                    <button className='w-30 grow f4 b--none br1 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f4'>
                <strong>{name + ', your current entry count is... '}</strong>
                <span className='white f2'>
                    {'#' + entries}
                </span>
            </div>
        </div>
    )
}

export default Rank;
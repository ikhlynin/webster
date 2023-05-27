import React from 'react';
import "./style.css"

export const Instrument = ({ name, source }) => {
    return (
        <div className='sidebar_instrument'>
            <img className='instrument_img' src={source} alt="..." />
        </div>
    )
}
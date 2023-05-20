import React from 'react';
import "./style.css"

export const Instrument = ({ name }) => {
    return (
        <div className='sidebar_instrument'>
            <img className='instrument_img' src={`./assets/${name}.png`} alt="aboba" />
        </div>
    )
}
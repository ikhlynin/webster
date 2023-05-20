import React from 'react';
import { Instrument } from './components/';
import "./style.css"

export const SideBar = () => {
    const instruments = ['text', 'filter', 'crop']

    return (
        <div className='sidebar_box'>
            {instruments.map((item, index) =>
                <Instrument name={item} />
            )}
        </div>
    )
}
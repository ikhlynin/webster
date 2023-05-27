import React from 'react';
import { Instrument } from './components/';
import move from './assets/move.png'
import select from './assets/select.png'
import crop from './assets/crop.png'
import pipette from './assets/pipette.png'
import pen from './assets/pen.png'
import eraser from './assets/eraser.png'
import text from './assets/text.png'
import redo from './assets/redo.png'
import undo from './assets/undo.png'
import "./style.css"

export const SideBar = () => {
    const instruments = [
        { name: 'move', source: `${move}` },
        { name: 'select', source: `${select}` },
        { name: 'crop', source: `${crop}` },
        { name: 'pipette', source: `${pipette}` },
        { name: 'pen', source: `${pen}` },
        { name: 'eraser', source: `${eraser}` },
        { name: 'text', source: `${text}` },
        { name: 'redo', source: `${redo}` },
        { name: 'undo', source: `${undo}` }
    ]

    return (
        <div className='sidebar_box'>
            {instruments.map((item, index) =>
                <Instrument name={item} source={item.source} key={index} />
            )}
        </div>
    )
}
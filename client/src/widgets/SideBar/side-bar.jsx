import React, { useState } from 'react';
import { Instrument } from './components/';
import move from './assets/move.png'
import select from './assets/select.png'
import crop from './assets/crop.png'
import rectangle from './assets/rectangle.png'
import circle from './assets/circle.png'
import line from './assets/line.png'
import pipette from './assets/pipette.png'
import pen from './assets/pen.png'
import eraser from './assets/eraser.png'
import text from './assets/text.png'
import trash from './assets/trash.png'
import redo from './assets/redo.png'
import undo from './assets/undo.png'
import "./style.css"

export const SideBar = ({ setDrawMode, onAddRectangle, onAddCircle, onAddEllipse, onDeleteObjects }) => {
    const [activeName, setActive] = useState("move")

    const instruments = [
        { name: 'move', source: `${move}` },
        { name: 'select', source: `${select}` },
        { name: 'crop', source: `${crop}` },
        { name: 'rectangle', source: `${rectangle}` },
        { name: 'line', source: `${line}` },
        { name: 'pipette', source: `${pipette}` },
        { name: 'pen', source: `${pen}` },
        { name: 'eraser', source: `${eraser}` },
        { name: 'text', source: `${text}` },
        { name: 'trash', source: `${trash}` },
        { name: 'redo', source: `${redo}` },
        { name: 'undo', source: `${undo}` }
    ]

    return (
        <div className='sidebar_box'>
            {instruments.map((item, index) =>
                <Instrument setDrawMode={setDrawMode} name={item.name} source={item.source} key={index} active={activeName} setActive1={setActive}
                    onAddRectangle={onAddRectangle} onAddCircle={onAddCircle} onAddEllipse={onAddEllipse} onDeleteObjects={onDeleteObjects} />
            )}
            <input className='color_box_sd' type='color' />
        </div>
    )
}
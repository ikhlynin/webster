import React, { useState } from 'react';
import "./style.css"

export const UpperBar = () => {
    const [fileShow, setFileShow] = useState(-1);
    const [selectionShow, setSelectionShow] = useState(-1);
    const [settingsShow, setSettingsShow] = useState(-1);

    function setAllToFalse() {
        setFileShow(-1);
        setSelectionShow(-1);
        setSettingsShow(-1);
    }

    return (
        <div className='upperbar_box'>
            <div className='upperbar_item' onClick={() => { setAllToFalse(); setFileShow(fileShow * -1) }}> File </div>
            <div className={fileShow === 1 ? 'upperbar_menu_file' : 'upperbar_menu_file hidden'}>
                <div className='upperbar_menu_item'>Create new</div>
                <div className='upperbar_menu_item'>Choose a sample</div>
                <div className='upperbar_menu_item'>Close</div>
            </div>

            {/* <div className='upperbar_item' onClick={() => { setAllToFalse(); setSelectionShow(selectionShow * -1) }}> Select </div>
            <div className={selectionShow === 1 ? 'upperbar_menu_selection' : 'upperbar_menu_selection hidden'}>
                <div className='upperbar_menu_item'>Invert</div>
                <div className='upperbar_menu_item'>Diselect</div>
            </div> */}

            <div className='upperbar_item' onClick={() => { setAllToFalse(); setSettingsShow(settingsShow * -1) }}> Edit canvas </div>
            <div className={settingsShow === 1 ? 'upperbar_menu_settings' : 'upperbar_menu_settings hidden'}>
                <div className='upperbar_menu_item'>Edit size</div>
                <div className='upperbar_menu_item'>Filters</div>
                <div className='upperbar_menu_item'>Vingette</div>
            </div>
        </div>
    )
}
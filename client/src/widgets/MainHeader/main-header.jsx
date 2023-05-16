import React from 'react';
import layerBase from "./assets/layer-base.png"
import layerMiddle from "./assets/layer-middle.png"
import layerFront from "./assets/layer-front.png"
import "./style.css"

export const MainHeader = () => {
    return (
        <header className="main-header">
            <div className="layers">
                <div className="layer__header">
                    <div className="layers__caption">Welcome to</div>
                    <div className="layers__title">Boloto Design</div>
                </div>
                <div className="layer layers__base" style={{ backgroundImage: `url(${layerBase})` }}></div>
                <div className="layer layers__middle" style={{ backgroundImage: `url(${layerMiddle})` }}></div>
                <div className="layer layers__front" style={{ backgroundImage: `url(${layerFront})` }}></div>
            </div>
        </header>
    )
}
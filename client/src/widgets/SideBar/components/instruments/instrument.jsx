import React, { useState } from 'react';
import "./style.css"
import { Modal } from '../../../PopUp';
import pencil from './assets/pencil.png'
import chalk from './assets/chalk.png'
import brush from './assets/brush.png'

import circle from './assets/circle.png'
import rectangle from './assets/rectangle.png'
import ellipse from './assets/ellipse.png'
import square from './assets/square.png'

export const Instrument = ({ setDrawMode, name, source, active, setActive1, onAddRectangle, onAddCircle, onAddEllipse, onDeleteObjects }) => {

    const [modalActive, setModalActive] = useState(false)

    //PEN
    const [modelPen, setModelPen] = useState(false)
    const [penOpacity, setPenOpacity] = useState(100)
    const [penSize, setPenSize] = useState(3)
    const [penColor, setPenColor] = useState("#000000")
    //FIGURE
    const [figureModel, setfigureModel] = useState(false)
    const [figureBorderColor, setFigureBorderColor] = useState("#000000")
    const [figureColor, setFigureColor] = useState("#000000")
    const classSeeFigureRectangle = {
        rectangle: {
            width: "130px",
            height: "80px",
            margin: " 50px 40px 30px 20px  ",
            backgroundColor: figureColor,
            border: `solid 5px ${figureBorderColor}`
        },
        square: {
            width: "80px",
            height: "80px",
            margin: " 50px 40px 30px 20px  ",
            backgroundColor: figureColor,
            border: `solid 5px ${figureBorderColor}`
        },
        circle: {
            width: "90px",
            height: "90px",
            margin: " 50px 40px 30px 20px",
            backgroundColor: figureColor,
            border: `solid 5px ${figureBorderColor}`,
            borderRadius: '70px',
        },
        ellipse: {
            width: "130px",
            height: "90px",
            margin: " 50px 40px 30px 20px",
            backgroundColor: figureColor,
            border: `solid 5px ${figureBorderColor}`,
            borderRadius: '100px/80px',
        },
        none: { width: "100px", }

    }
    function clickHandle() {
        setActive1(name);
        switch (name) {
            case 'pen':
                setDrawMode(false);
                setModalActive(true);
                break;
            case 'rectangle':
                setModalActive(true);
                break;
            case 'trash':
                onDeleteObjects();
                setActive1("move");
                break;
            default: setDrawMode(false); break;
        }
    }

    const setDataPen = (event) => {
        event.preventDefault();
        localStorage.setItem('penOpacity', penOpacity)
        localStorage.setItem('penSize', penSize)
        localStorage.setItem('penColor', penColor)
        localStorage.setItem('modelPen', modelPen)
        setDrawMode(true);
        setModalActive(false);
    }

    const setDataFigure = (event) => {
        switch (figureModel) {
            case "rectangle":
                onAddRectangle(figureColor, figureBorderColor, 1)
                break;
            case 'circle':
                onAddCircle(figureColor, figureBorderColor);
                break;
            case 'ellipse':
                onAddEllipse(figureColor, figureBorderColor);
                break;
            case 'square':
                onAddRectangle(figureColor, figureBorderColor, 2);
                break;
            default: break;
        }
        event.preventDefault();
        setDrawMode(false);
        setModalActive(false);
        setActive1("move");
    }

    return (
        <div>
            <div className={active !== name ? 'sidebar_instrument' : 'sidebar_instrument active_instrument'} onClick={() => { clickHandle() }} >
                <img className='instrument_img' src={source} alt="..." />
            </div >
            <Modal active={modalActive} setActive={setModalActive} >
                {name === "pen" ?
                    <form className="box_from_tp">
                        <p className="hader_text_form_tp">CHOOSE A PEN</p>
                        <div className="box_flex_row_tp">
                            <div className='box_flex_col_instr'>
                                <div className="box_samples_tp">
                                    <label>
                                        <input type="radio" name="modelPen" value="pencil" onChange={(e) => { setModelPen(e.target.value); setPenSize(3); setPenOpacity(100) }} />
                                        <img className='img_pen_instr' src={pencil} alt="Option 1" />
                                    </label>

                                    <label>
                                        <input type="radio" name="modelPen" value="chalk" onChange={(e) => { setModelPen(e.target.value); setPenSize(3); setPenOpacity(100) }} />
                                        <img className='img_pen_instr' src={chalk} alt="Option 1" />
                                    </label>

                                    <label>
                                        <input type="radio" name="modelPen" value="brush" onChange={(e) => { setModelPen(e.target.value); setPenSize(3); setPenOpacity(100) }} />
                                        <img className='img_pen_instr' src={brush} alt="Option 1" />
                                    </label>
                                </div>
                                <div className='sample'> ffff</div>
                            </div>

                            <div>
                                <div className="flex_row_tp">
                                    <label>Color:</label>
                                    <input className='color_box_sd' type='color' value={penColor} onChange={(e) => { setPenColor(e.target.value) }} />
                                </div>
                                <div className="flex_row_tp">
                                    <label>Size:</label>
                                    <input type="range" name="size" min="0" max="1000" value={penSize} onChange={(e) => { setPenSize(e.target.value) }} />
                                    <label className='data_inpt_instr'>{penSize}</label>
                                </div>
                                <div className="flex_row_tp">
                                    <label>Opacity:</label>
                                    <input type="range" name="opacity" min="1" max="100" value={penOpacity} onChange={(e) => { setPenOpacity(e.target.value) }} />
                                    <label className='data_inpt_instr'>{penOpacity}</label>
                                </div>
                            </div>
                        </div>
                        <button className="button_instr " onClick={setDataPen} >Choose</button>
                    </form>
                    : name === "rectangle" ?
                        <form className="box_from_tp">
                            <p className="hader_text_form_tp">CHOOSE A FIGURE</p>
                            <div className="box_flex_row_tp">
                                <div className='box_flex_col_instr'>
                                    <div className="box_samples_tp">
                                        <label>
                                            <input type="radio" name="typeFigure" value="circle" onChange={(e) => { setfigureModel(e.target.value) }} />
                                            <img className='img_pen_instr' src={circle} alt="Figure circle" />
                                        </label>

                                        <label>
                                            <input type="radio" name="typeFigure" value="rectangle" onChange={(e) => { setfigureModel(e.target.value) }} />
                                            <img className='img_pen_instr' src={rectangle} alt="Figure rectangle" />
                                        </label>
                                        <label>
                                            <input type="radio" name="typeFigure" value="ellipse" onChange={(e) => { setfigureModel(e.target.value) }} />
                                            <img className='img_pen_instr' src={ellipse} alt="Figure ellipse" />
                                        </label>
                                        <label>
                                            <input type="radio" name="typeFigure" value="square" onChange={(e) => { setfigureModel(e.target.value) }} />
                                            <img className='img_pen_instr' src={square} alt="Figure square" />
                                        </label>
                                    </div>
                                    <div className='sample'>
                                        Type of figure:<div style={figureModel === 'circle' ? classSeeFigureRectangle.circle :
                                            figureModel === 'rectangle' ? classSeeFigureRectangle.rectangle : figureModel === 'square' ? classSeeFigureRectangle.square : classSeeFigureRectangle.ellipse}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex_row_tp">
                                        <label>Color border:</label>
                                        <input className='color_box_sd' type='color' value={figureBorderColor} onChange={(e) => { setFigureBorderColor(e.target.value) }} />
                                    </div>
                                    <div className="flex_row_tp">
                                        <label>Color:</label>
                                        <input className='color_box_sd' type='color' value={figureColor} onChange={(e) => { setFigureColor(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <button className="button_instr " onClick={setDataFigure} >Choose</button>
                        </form>
                        :
                        ''}

            </Modal>
        </div>

    )
}
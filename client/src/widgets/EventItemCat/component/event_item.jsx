import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../'

const EventItem = ({ idProject, name, img }) => {
    let navigate = useNavigate();
    const { store } = useContext(Context);
    const getDataOnePr = async () => {
        const dataPr = await store.getOneProject(idProject)

        if (localStorage.getItem("canvasState")) {
            localStorage.removeItem("canvasState");
        }


        navigate(`/editor/${idProject}`, {
            state: {
                canvasName: dataPr.title,
                canvasState: dataPr.state,
                canvasWidth: dataPr.canvasWidth,
                canvasHeight: dataPr.canvasHeight,
                // canvasBackColor: backColor,
                mode: 3,
            },
        });
    }

    return (
        <div className='item_card'>
            <div className='card_white'>
                <img className='eventimg' src={img} alt="aboba" />

                <p className='event-name-text'>{name}</p>

                <div className='card_dark'>

                    <span className='event_button' onClick={() => { getDataOnePr() }}>OPEN</span>

                </div>
            </div>
        </div>
    )
}
export default EventItem;
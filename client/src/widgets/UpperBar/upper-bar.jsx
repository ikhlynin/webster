import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { saveAs } from "file-saver";
import { Context } from "../..";
import { fabric } from "fabric";
import "./style.css";

export const UpperBar = ({ saveProject, setCanvasName, canvasName, handleImageUpload, setFilter }) => {
  const { store } = useContext(Context);
  const params = useParams()
  const [fileShow, setFileShow] = useState(-1);
  const [settingsShow, setSettingsShow] = useState(-1);
  const [filtersShow, setFiltersShow] = useState(-1);
  const navigate = useNavigate()

  function setAllToFalse() {
    setFileShow(-1);
    setSettingsShow(-1);
    setFiltersShow(-1);
  }

  const saveCanvas = () => {
    var canvas = document.getElementById("canvas");
    canvas.toBlob(function (blob) {
      saveAs(blob, `${canvasName}.png`);
    });
  };
  const dellPr = async () => {
    await store.deleteProject(params.id)
    navigate(`/createproject`)
  };

  return (
    <div className="upperbar_box">
      <div className="upperbar_item">
        <label>Name:</label>
        <input type="text" onChange={(e) => setCanvasName(e.target.value)} value={canvasName} />
      </div>
      <div className="upperbar_item" onClick={() => { setAllToFalse(); setFileShow(fileShow * -1); }} > File </div>

      <div className={fileShow === 1 ? "upperbar_menu_file" : "upperbar_menu_file hidden"} >
        <div className="upperbar_menu_item">Create new</div>
        <div className="upperbar_menu_item">Choose a sample</div>
        <div className="upperbar_menu_item">
          <label for="file_out" className=" feedback__label1"> Add image </label>
          <input type="file" id="file_out" className="feedback__file" onChange={handleImageUpload} />
        </div>


        <div className="upperbar_menu_item" onClick={() => { saveCanvas(); }} >  Download image </div>
        {store.isAuth === true ?
          <div className="upperbar_menu_item" onClick={() => { saveProject(); }} >Save project </div> : ''}
        {store.isAuth === true ?
          <div className="upperbar_menu_item" onClick={() => { dellPr(); }} >Delete project </div> : ''}
        <div className="upperbar_menu_item">Close</div>
      </div>

      <div className="upperbar_item" onClick={() => { setAllToFalse(); setSettingsShow(settingsShow * -1); }}> Editing </div>
      <div className={settingsShow === 1 ? "upperbar_menu_settings" : "upperbar_menu_settings hidden"} >
        <div className="upperbar_menu_item">Edit canvas size</div>
        <div className="upperbar_menu_item filters" onClick={() => { setFiltersShow(filtersShow * -1); }} > Filters </div>
        <div className="upperbar_menu_item">Vingette</div>
      </div>

      <div className={filtersShow === 1 ? "filters_box" : "filters_box hidden"}>
        {/* <div className="upperbar_menu_item" > Edit image </div> */}
        <div className="upperbar_menu_item" onClick={() => { setFilter("BlackWhite"); setFiltersShow(-1); setSettingsShow(-1); }} > BlackWhite </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("BlendColor"); setFiltersShow(-1); setSettingsShow(-1); }} > BlendColor </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Brownie"); setFiltersShow(-1); setSettingsShow(-1); }} > Brownie </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Invert"); setFiltersShow(-1); setSettingsShow(-1); }} > Invert </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Kodachrome"); setFiltersShow(-1); setSettingsShow(-1); }} > Kodachrome </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Grayscale"); setFiltersShow(-1); setSettingsShow(-1); }} > Grayscale </div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Sepia"); setFiltersShow(-1); setSettingsShow(-1); }} >Sepia</div>
        <div className="upperbar_menu_item" onClick={() => { setFilter("Remove"); setFiltersShow(-1); setSettingsShow(-1); }} > Remove filters </div>
      </div>
    </div>
  );
};

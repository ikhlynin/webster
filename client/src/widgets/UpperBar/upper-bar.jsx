import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./style.css";

export const UpperBar = ({ canvasName, handleImageUpload }) => {
  const [fileShow, setFileShow] = useState(-1);
  const [selectionShow, setSelectionShow] = useState(-1);
  const [settingsShow, setSettingsShow] = useState(-1);

  //   const tempName = localStorage.getItem("canvasName");
  const [name, setName] = useState(canvasName);
  function setAllToFalse() {
    setFileShow(-1);
    setSelectionShow(-1);
    setSettingsShow(-1);
  }
  const saveCanvas = () => {
    var canvas = document.getElementById("canvas");
    canvas.toBlob(function (blob) {
      saveAs(blob, `${name}.png`);
    });
  };
  return (
    <div className="upperbar_box">
      <div className="upperbar_item">
        <label>Name:</label>
        <input type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div
        className="upperbar_item"
        onClick={() => {
          setAllToFalse();
          setFileShow(fileShow * -1);
        }}
      >
        {" "}
        File{" "}
      </div>

      <div
        className={
          fileShow === 1 ? "upperbar_menu_file" : "upperbar_menu_file hidden"
        }
      >
        <div className="upperbar_menu_item">Create new</div>
        <div className="upperbar_menu_item">Choose a sample</div>
        <div className="upperbar_menu_item">
          <label for="file_out" className=" feedback__label1">Add image </label>
          <input type="file" id="file_out" className="feedback__file" onChange={handleImageUpload} /></div>
        <div
          className="upperbar_menu_item"
          onClick={() => {
            saveCanvas();
          }}
        >
          Save image
        </div>
        <div className="upperbar_menu_item">Close</div>
      </div>

      <div
        className="upperbar_item"
        onClick={() => {
          setAllToFalse();
          setSelectionShow(selectionShow * -1);
        }}
      >
        {" "}
        Select{" "}
      </div>
      <div
        className={
          selectionShow === 1
            ? "upperbar_menu_selection"
            : "upperbar_menu_selection hidden"
        }
      >
        <div className="upperbar_menu_item">Invert</div>
        <div className="upperbar_menu_item">Diselect</div>
      </div>

      <div
        className="upperbar_item"
        onClick={() => {
          setAllToFalse();
          setSettingsShow(settingsShow * -1);
        }}
      >
        {" "}
        Edit canvas{" "}
      </div>
      <div
        className={
          settingsShow === 1
            ? "upperbar_menu_settings"
            : "upperbar_menu_settings hidden"
        }
      >
        <div className="upperbar_menu_item">Edit size</div>
        <div className="upperbar_menu_item">Filters</div>
        <div className="upperbar_menu_item">Vingette</div>
      </div>
    </div>
  );
};

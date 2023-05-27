import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Modal } from "../PopUp";

import { Context } from "../../index.js";

import "./style.css";
import a3 from "./assets/a3.png";
import a4 from "./assets/a4.png";
import a5 from "./assets/a5.png";
import b3 from "./assets/b3.png";
import b4 from "./assets/b4.png";
import b5 from "./assets/b5.png";

////!!!!!!!! 0 = new project, 1 = download, 2 = templates, 3 = existing project

export const Types = () => {
  const [modalActive, setModalActive] = useState(false);
  const [typesProject, setTypesProject] = useState(70);
  const [name, setName] = useState("New Project");
  const [width, setWidth] = useState(70);
  const [height, setHeight] = useState(70);
  const [backColor, setBackColor] = useState(null);
  let navigate = useNavigate();
  const setDataProject = (event, mode) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/editor", {
      state: {
        canvasName: name,
        canvasWidth: width,
        canvasHeight: height,
        canvasBackColor: backColor,
        mode: mode,
        image: selectedImage,
      },
    });

  };

  const [selectedImage, setSelectedImage] = useState(null);
  const imageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="box_cr_p">
      <button className="button_cr_p " onClick={() => { setModalActive(true); setTypesProject("newPr") }}>
        New project
      </button>
      <Link>
        <button className="button_cr_p " onClick={() => { setModalActive(true); setTypesProject("openPr") }}>Download from computer</button>
      </Link>
      <Link>
        <button className="button_cr_p " onClick={() => { setModalActive(true); setTypesProject("templPr") }}>Templates</button>
      </Link>
      <Modal active={modalActive} setActive={setModalActive}>
        {typesProject === 'newPr' ?
          <form className="box_from_tp">
            <p className="hader_text_form_tp">NEW PROJECT</p>
            <div className="box_flex_row_tp">
              <div>
                <div className="flex_row_tp">
                  <label>Name:</label>
                  <input
                    className="input_name_tp" type="text" onChange={(e) => setName(e.target.value)} required="required" value={name}
                  />
                </div>
                <div className="flex_row_tp">
                  <label>Width:</label>
                  <input className="input_size_tp" type="number" onChange={(e) => setWidth(e.target.value)} value={width}
                  />
                </div>
                <div className="flex_row_tp">
                  <label>Height:</label>
                  <input className="input_size_tp" type="number" onChange={(e) => setHeight(e.target.value)} value={height}
                  />
                </div>
                <div className="flex_row_tp">
                  <label>Background:</label>
                  <input className="input_color_tp" type="color" onChange={(e) => setBackColor(e.target.value)} value={backColor}
                  />
                </div>
              </div>

              <div className="box_samples_tp">
                <label>
                  <input type="radio" name="test" value="small1" onChange={(e) => { setWidth(842); setHeight(1191); }}
                  />
                  <img src={a3} alt="Option 1" className="img_cr_p" />
                </label>

                <label>
                  <input type="radio" name="test" value="small2" onChange={(e) => { setWidth(595); setHeight(842) }}
                  />
                  <img src={a4} alt="Option 1" className="img_cr_p" />
                </label>

                <label>
                  <input type="radio" name="test" value="small3" onChange={(e) => { setWidth(420); setHeight(595); }}
                  />
                  <img src={a5} alt="Option 1" className="img_cr_p" />
                </label>
                <label>
                  <input type="radio" name="test" value="small3" onChange={(e) => { setWidth(1001); setHeight(1417); }}
                  />
                  <img src={b3} alt="Option 1" className="img_cr_p" />
                </label>
                <label>
                  <input type="radio" name="test" value="small3" onChange={(e) => { setWidth(709); setHeight(1001) }}
                  />
                  <img src={b4} alt="Option 1" className="img_cr_p" />
                </label>
                <label>
                  <input type="radio" name="test" value="small3" onChange={(e) => { setWidth(499); setHeight(709) }}
                  />
                  <img src={b5} alt="Option 1" className="img_cr_p" />
                </label>
              </div>
            </div>
            <button className="button_instr " onClick={(e) => { setDataProject(e, 0) }}>
              Create
            </button>
          </form> :
          typesProject === 'openPr' ?
            <form className="box_from_tp">
              <p className="hader_text_form_tp">OPEN PROJECT</p>

              <div className="flex_row_tp">
                <label>File:</label>
                <label for="file_out" class="feedback__label">download file </label>
                <input type="file" id="file_out" class="feedback__file" onChange={imageUpload} />
              </div>
              <button className="button_instr " onClick={(e) => { setDataProject(e, 1) }}>
                Create
              </button>
            </form> : ''

        }
      </Modal>
    </div>
  );
};

export default Types;



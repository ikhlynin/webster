import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "./components";

import "./style.css";

export const Types = () => {
  const [modalActive, setModalActive] = useState(true)
  return (
    <div className="box_cr_p">
      <button className="button_cr_p " onClick={() => setModalActive(true)}>New project</button>
      <Link><button className="button_cr_p ">Download from computer</button></Link>
      <Link><button className="button_cr_p ">Templates</button></Link>
      <Modal active={modalActive} setActive={setModalActive} >
        <form>
          <div>
            <div>
              <label>Name:</label>
              <input type="text" />
            </div>
            <div>
              <label>Width:</label>
              <input type="number" />
            </div>
            <div>
              <label>Height:</label>
              <input type="number" />
            </div>
            <div>
              <label>Background:</label>
              <input type="color" />
            </div>
          </div>
          <div>
            <label>
              <input type="radio" name="test" value="small" />
              <img src="https://via.placeholder.com/40x60/0bf/fff&text=A" alt="Option 1" />
            </label>

            <label>
              <input type="radio" name="test" value="small" />
              <img src="https://via.placeholder.com/40x60/0bf/fff&text=A" alt="Option 1" />
            </label>

            <label>
              <input type="radio" name="test" value="small" />
              <img src="https://via.placeholder.com/40x60/0bf/fff&text=A" alt="Option 1" />
            </label>
          </div>
          <button>Create</button>
        </form>

      </Modal>
    </div>
  );
};

export default Types;

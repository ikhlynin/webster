// import { Link } from "react-router-dom";

import "./style.css";

export const Modal = ({ active, setActive, children }) => {

    return (
        <div className={active ? 'modal_pr_t active' : 'modal_pr_t'} onClick={() => { setActive(false) }}>
            <div className="modal_content_pr_t" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

import React, { useContext, useState } from "react";
import logo from "./assets/bandatra.png";
import { Context } from "../..";
import { Modal } from "../PopUp";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const NavBar = () => {
  let navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [typeActiveForm, setTypeActiveForm] = useState();
  const { store } = useContext(Context);
  const [isError, setIsError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassw] = useState("");

  const [isErrorReg, setIsErrorReg] = useState(false);

  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswReg] = useState("");

  const login = async (event) => {
    event.preventDefault();
    setIsError(false);
    const bandatra = await store.login(email, password);
    if (bandatra !== true) {
      setIsError(true);
    } else {
      navigate("/");
      setModalActive(false);
    }
  };
  const signup = async (event) => {
    event.preventDefault();
    setIsErrorReg(false);
    const bandatra = await store.registration(nameReg, emailReg, passwordReg);

    if (bandatra !== true) {
      setIsError(true);
    } else {
      navigate("/");
      setModalActive(false);
    }
  };

  const exit = async () => {
    await store.logout();
    navigate("/");
  };
  return (
    <div className="navbar_box">
      <div
        className="navbar_logo_box"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="navbar_logo" src={logo} alt="logo" />
        <h2 className="navbar_logo_text">BOLOTO DESIGN</h2>
      </div>

      {store.isAuth === false ? (
        <div>
          <div className="navbar_button_box">
            <span
              className="navbar_button"
              onClick={() => {
                setModalActive(true);
                setTypeActiveForm("auth");
              }}
            >
              Log in
            </span>
            <span
              className="navbar_button"
              onClick={() => {
                setModalActive(true);
                setTypeActiveForm("reg");
              }}
            >
              Sign up
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar_button_box">
            <span
              className="navbar_button"
              onClick={() => {
                exit();
              }}
            >
              Exit
            </span>
          </div>
        </div>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        {typeActiveForm === "auth" ? (
          <form className="login_box" onSubmit={login}>
            <div className="title_form_us_act">Authorization</div>
            <div className="box_imp_us_act">
              <div className="ab">
                <label>Enter Login:</label>
                <input
                  className="auth_input"
                  type="text"
                  placeholder="enter your login..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="ab">
                <label>Enter Password:</label>
                <input
                  className="auth_input"
                  type="password"
                  placeholder="your password..."
                  onChange={(e) => setPassw(e.target.value)}
                />
              </div>
            </div>

            <p className={isError ? "auth_error" : "hidden"}>
              Entered info is incorrect
            </p>
            <button className="button_active_us">Log in</button>
          </form>
        ) : (
          <form className="login_box" onSubmit={signup}>
            <div className="title_form_us_act">Registration</div>
            <div className="box_imp_us_act">
              <div className="ab">
                <label>Enter Name:</label>
                <input
                  className="auth_input"
                  type="text"
                  placeholder="enter your name..."
                  onChange={(e) => setNameReg(e.target.value)}
                />
              </div>
              <div className="ab">
                <label>Enter Email:</label>
                <input
                  className="auth_input"
                  type="text"
                  placeholder="enter your email..."
                  onChange={(e) => setEmailReg(e.target.value)}
                />
              </div>
              <div className="ab">
                <label>Enter Password:</label>
                <input
                  className="auth_input"
                  type="password"
                  placeholder="your password..."
                  onChange={(e) => setPasswReg(e.target.value)}
                />
              </div>
            </div>

            <p className={isErrorReg ? "auth_error" : "hidden"}>
              Entered email is incorrect
            </p>
            <button className="button_active_us">Sign up</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

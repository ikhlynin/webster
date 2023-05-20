import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index.js";
import "./style.css";

export const SignupWindow = ({ isSignup }) => {
  const [isError, setIsError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassw] = useState("");

  const { store } = useContext(Context);
  const navigate = useNavigate();

  const signup = async (event) => {
    // console.log("name: ", name, "email: ", email, "password: ", password);
    event.preventDefault();
    setIsError(false);
    const bandatra = await store.registration(name, email, password);

    if (bandatra !== true) {
      setIsError(true);
    } else {
      navigate("/");
    }
  };
  console.log("is auth:", store.isAuth, store.user);

  return (
    <form
      onSubmit={signup}
      className={
        isSignup === false
          ? "signup_window_box auth_window_hiding_class"
          : "signup_window_box auth_window_popup_class"
      }
    >
      <input
        className="auth_input"
        type="text"
        placeholder="enter your name..."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="auth_input"
        type="text"
        placeholder="enter your email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth_input"
        type="password"
        placeholder="your password..."
        onChange={(e) => setPassw(e.target.value)}
      />
      <p className={isError ? "auth_error" : "hidden"}>
        Entered email is incorrect
      </p>
      <button className="auth_button">Sign up</button>
    </form>
  );
};

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index.js";

import "./style.css";

export const LoginWindow = ({ isLogin }) => {
    const [isError, setIsError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassw] = useState("");

    const { store } = useContext(Context);
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        setIsError(false);
        const bandatra = await store.login(email, password);

        if (bandatra !== true) {
            setIsError(true);
        } else {
            navigate("/");
        }
    };

    return (
        <form
            onSubmit={login}
            className={
                isLogin === false
                    ? "login_window_box auth_window_hiding_class"
                    : "login_window_box auth_window_popup_class"
            }
        >
            <input
                className="auth_input"
                type="text"
                placeholder="enter your login..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="auth_input"
                type="password"
                placeholder="your password..."
                onChange={(e) => setPassw(e.target.value)}
            />
            <p className={isError ? "auth_error" : "hidden"}>
                Entered info is incorrect
            </p>
            <button className="auth_button">Log in</button>
        </form>
    );
};

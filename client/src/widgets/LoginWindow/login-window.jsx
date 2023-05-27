import React, { useState } from 'react';
import "./style.css"

export const LoginWindow = ({ isLogin }) => {
    const [isError, setIsError] = useState(false);

    const login = async event => {
        event.preventDefault();
        isError ? setIsError(false) : setIsError(true);
    }

    return (
        <form onSubmit={login} className={isLogin === false ? 'login_window_box auth_window_hiding_class' : 'login_window_box auth_window_popup_class'}>
            <input className='auth_input' type="text" placeholder='enter your login...' />
            <input className='auth_input' type="password" placeholder='your password...' />
            <p className={isError ? 'auth_error' : 'hidden'}>Entered info is incorrect</p>
            <button className='auth_button'>Log in</button>
        </form>
    )
}
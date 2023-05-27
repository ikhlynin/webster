import React, { useState } from 'react';
import "./style.css"

export const SignupWindow = ({ isSignup }) => {
    const [isError, setIsError] = useState(false);

    const signup = async event => {
        event.preventDefault();
        isError ? setIsError(false) : setIsError(true);
    }

    return (
        <form onSubmit={signup} className={isSignup === false ? 'signup_window_box auth_window_hiding_class' : 'signup_window_box auth_window_popup_class'}>
            <input className='auth_input' type="text" placeholder='enter your name...' />
            <input className='auth_input' type="text" placeholder='enter your email...' />
            <input className='auth_input' type="password" placeholder='your password...' />
            <p className={isError ? 'auth_error' : 'hidden'}>Entered email is incorrect</p>
            <button className='auth_button'>Sign up</button>
        </form>
    )
}
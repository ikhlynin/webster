import React from 'react';
import logo from "./assets/logo.png"
import { useNavigate } from 'react-router-dom';
import "./style.css"

export const NavBar = ({ isLogin, setIsLogin, isSignup, setIsSignup }) => {
    let navigate = useNavigate();

    function setLoginFunc() {
        if (isLogin)
            setIsLogin(false)
        else {
            setIsLogin(true)
            setIsSignup(false)
        }
    }

    function setSignupFunc() {
        if (isSignup)
            setIsSignup(false)
        else {
            setIsSignup(true)
            setIsLogin(false)
        }
    }

    return (
        <div className='navbar_box'>
            <div className='navbar_logo_box' onClick={() => { navigate("/") }}>
                <img className='navbar_logo' src={logo} alt="logo" />
                <h2 className='navbar_logo_text'>BOLOTO DESIGN</h2>
            </div>
            <div className='navbar_button_box'>
                <span className='navbar_button' onClick={() => { setLoginFunc() }}>Log in</span>
                <span className='navbar_button' onClick={() => { setSignupFunc() }}>Sign up</span>
            </div>
        </div>
    )
}
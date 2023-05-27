import React/*, { useState }*/ from 'react';
import { MainHeader } from "../../widgets/MainHeader"
import { MainArticle } from "../../widgets/MainArticle"
import "./css/main.css"

const Homepage = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <MainHeader />
                <MainArticle />
            </div >
        </div >
    )
}
export default Homepage;
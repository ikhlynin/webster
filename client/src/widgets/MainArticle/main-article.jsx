import React from 'react';
import dungeon from "./assets/dungeon.jpg"
import "./style.css"

export const MainArticle = () => {
    return (
        <article className="main-article" style={{ backgroundImage: `url(${dungeon})` }}>
            <div className="main-article__content">
                <h2 className="main-article__header">To be continued</h2>
                <p className="main-article__paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis error provident dignissimos facere. Repellendus tempore autem qui! Quia magnam tempora esse id necessitatibus corrupti mollitia expedita sapiente cum rerum, ut dicta laboriosam!</p>
            </div>
            <div className="copy">© Ucode connect</div>
        </article >
    )
}
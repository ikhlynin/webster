import React from 'react';
import dungeon from "./assets/dungeon.jpg"
import github from "./assets/github.png"
import inst from "./assets/inst.png"
import twi from "./assets/twi.png"
import linkedin from "./assets/linkedin.png"
import "./style.css"

export const MainArticle = () => {
    return (
        <article className="main-article" style={{ backgroundImage: `url(${dungeon})` }}>
            <div className="main-article__content">
                <h2 className="main-article__header">About our service</h2>
                <p className="main-article__paragraph">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            </div>

            <div className='smlinks_box'>
                <img className='smlinks_img' src={github} alt="aboba" />
                <img className='smlinks_img' src={inst} alt="aboba" />
                <img className='smlinks_img' src={twi} alt="aboba" />
                <img className='smlinks_img' src={linkedin} alt="aboba" />
            </div>

            <div className="copy">© 2023 Aboba company incorporated.</div>
        </article >
    )
}
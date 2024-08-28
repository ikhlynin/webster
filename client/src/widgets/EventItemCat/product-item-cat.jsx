import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Pagination from '../Pagination/pagination';
import EventItem from './component/event_item';

import lufi from './assets/luffy.jpg'
import "./style.css"

export const ProductItemsCat = ({ dataAllPr }) => {
    const [page, setPage] = useState([0]);
    return (
        <div className='box_one_category_product_aboba'>
            <div className="text_centr_list_pr ">Recent project</div>

            <div className='box_one_category_product_c'>
                {dataAllPr.slice(page * 12, page * 12 + 12).map((item, index) =>
                    <EventItem key={index} img={item.image} name={item.title} idProject={item._id} />
                )}
            </div>

            <Pagination quantity={dataAllPr.length} numberForPage={12} current={page} change={setPage} />
        </div>
    )
}
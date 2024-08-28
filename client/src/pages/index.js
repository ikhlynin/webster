import { Routes, Route } from "react-router";
import React from 'react';
import CreatePage from "./CreatePage/create-page";
import Homepage from "./HomePage/home-page"
import EditorPage from "./EditorPage/editor-page"
import Layout from "../widgets/Layout/Layout.jsx"

export const Routing = () => {
    // const { store } = useContext(Context)

    return (

        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/createproject" element={<CreatePage />} />
                <Route path="/editor/:id" element={<EditorPage />} />

            </Route>
        </Routes>

    );
};
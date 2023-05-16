// import { useContext } from 'react';
import { Routes, Route } from "react-router";
// import { Context } from "../";
import Homepage from "./HomePage/home-page";
import Layout from "../widgets/Layout/Layout.jsx"

export const Routing = () => {
  // const { store } = useContext(Context)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Routes>
  );
};

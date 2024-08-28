import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../";

import { Routing } from "../pages";
// import "./style.css"

const App = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  return (
    <div className="app">
      {store.isLoading ? null : <Routing />}
      {/* <Routing /> */}
    </div>
  );
};
export default observer(App);

import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
const Layout = () => {
  return (
    <div className="wrapper">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;

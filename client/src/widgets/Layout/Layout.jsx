import { Outlet } from "react-router-dom";
import { useState } from "react";

import { NavBar } from "../NavBar";
import { LoginWindow } from "../LoginWindow";
import { SignupWindow } from "../SignupWindow";

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="wrapper">
      <NavBar
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
      />
      <LoginWindow isLogin={isLogin} />
      <SignupWindow isSignup={isSignup} />
      <Outlet />
    </div>
  );
};

export default Layout;

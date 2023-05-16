// import { useContext } from 'react';
// import { Context } from "../../";
import { MainHeader } from "../../widgets/MainHeader";
import { MainArticle } from "../../widgets/MainArticle";
import "./css/main.css";

const Homepage = () => {
  // const { store } = useContext(Context)

  return (
    <div className="content">
      <MainHeader />
      <MainArticle />
    </div>
  );
};
export default Homepage;

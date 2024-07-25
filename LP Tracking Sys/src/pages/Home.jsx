// import Stats from '../components/Stats';
// import Testimony from '../components/Testimony';
// import Hero from '../components/Hero';
// import Footer from '../components/Footer';

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
   return ( 
      <>
         <div className="w-full m-auto bg-black">
            <Navbar/>
         </div>
         {<Outlet/>}
      </>
    );
}
 
export default Home;
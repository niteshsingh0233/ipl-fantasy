import Navbar from "../pages/v2/Navbar"
import Footer from "../pages/v2/Footer"
// import Footer from "./Footer"
// import Header from "./Header"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Layout({children}){

    const location = useLocation();

   let isLoggedIn = false;

   
         isLoggedIn = 
            localStorage.getItem("token") &&
            localStorage.getItem("token") != "undefined"

return <>
{/* <Header/> */}
{location.pathname != "/" && <Navbar isLoggedIn={isLoggedIn}/>}
<main className="main-body">{children}</main>
{location.pathname != "/" && <Footer/>}
{/* <Footer/> */}
</>
}

export default Layout
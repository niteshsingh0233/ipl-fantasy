import Footer from "./Footer"
import Header from "./Header"

function Layout({children}){
return <>
{/* <Header/> */}
<main className="main-body">{children}</main>
{/* <Footer/> */}
</>
}

export default Layout
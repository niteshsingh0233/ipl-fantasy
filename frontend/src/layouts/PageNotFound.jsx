import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FadeInWrapper from "../pages/v2/FadeInWrapper";

function PageNotFound() {
    const navigate = useNavigate()


    useEffect(() => {
        NavigateURL()
    }, [])

    function NavigateURL(){
        navigate('/404', { replace: true });
    }

    return (
      // <>
      //   <div>PageNotFound</div>
      //   <Link to="/">Redirect to home page</Link>
      //   {/* <button onClick={NavigateURL}>click to navigate</button> */}
      // </>
      <FadeInWrapper>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist. Go back <Link to="/" style={{ color: "#6366f1" }}>home</Link>.</p>
    </FadeInWrapper>
    );
  }
  
  export default PageNotFound;
  
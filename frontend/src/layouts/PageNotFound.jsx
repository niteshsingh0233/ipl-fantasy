import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageNotFound() {
    const navigate = useNavigate()


    useEffect(() => {
        NavigateURL()
    }, [])

    function NavigateURL(){
        navigate('/404', { replace: true });
    }

    return (
      <>
        <div>PageNotFound</div>
        <Link to="/">Redirect to home page</Link>
        {/* <button onClick={NavigateURL}>click to navigate</button> */}
      </>
    );
  }
  
  export default PageNotFound;
  
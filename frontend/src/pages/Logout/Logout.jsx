import { useNavigate } from "react-router-dom";
import APIBASEURL from "../../data/baseURL";

function Logout() {
    let navigate = useNavigate();
  console.log(location.search.substring(3) === localStorage.getItem("token"));

  let logoutSuccess = false;

    if (location.search.substring(3) === localStorage.getItem("token")) {
      localStorage.removeItem("token");
      logoutSuccess = true;
      navigate("/");
    }else{
        navigate("/login");
    }

    function handleButtonClick(){
        localStorage.removeItem("token");
        navigate("/");
    }

  return (
    <>
      <div className="Logout-container-div">
        <div>{logoutSuccess ? <>Logout Success</> : <>Logging Out</>}</div>
        <button onClick={handleButtonClick}>Logout Success!</button>
      </div>
    </>
  );
}

export default Logout;

import { useState } from "react";
import axios from "axios";
import APIBASEURL from "../data/baseURL";
import { useNavigate } from "react-router-dom";


function GameData() {

    let navigate = useNavigate()
    const [ownerTeamName, setOwnerTeamName] = useState('')
    const [owner, setOwner] = useState({})
    async function HandleCreateOwnerButtonClick(){
        await axios
      .post(
        `${APIBASEURL()}/api/v1/owner/create-owner`,
        { ownerTeamName : ownerTeamName  },
        {  withCredentials: true,  headers: {'authorization' : localStorage.getItem('token')}}
      )
      .then(async (res) => {
        console.log(res)
        if(res.data.success && res.data.owner){
            setOwner(res.data.owner)

            await axios
      .get(
        `${APIBASEURL()}/api/v1/game/join-game/${location.pathname.split('/')[location.pathname.split('/').length-1]}/${res.data.owner._id}`,
        {  withCredentials: true,  headers: {'authorization' : localStorage.getItem('token')}}
      )
      .then((res) => {
        console.log(res)
        navigate(`/owners/${location.pathname.split('/')[location.pathname.split('/').length-1]}`)
        
      })
      .catch((error) => {console.log(error, 'hi');
        
      });

        }
        
      })
      .catch((error) => {console.log(error, 'hi');
        
      });
    }
  return (
    <>
      <div>Create Owner -: </div>
      <div>
        <p><input onChange={(e) => {
            setOwnerTeamName(e.target.value);
            console.log(e);
          }}
          value={ownerTeamName} type="text" placeholder="Create Owner Name"/>
        <br/></p>
        <button onClick={HandleCreateOwnerButtonClick}>Create Owner</button>
      </div>
    </>
  );
}

export default GameData;

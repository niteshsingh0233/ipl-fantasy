import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home(){
    const [UI, setUI] = useState("")

    async function handleEventAxios(){
        if(UI !== ""){
            setUI("")

        }else{
            await axios.get(`https://fantasy-app-cricbuzz-api.vercel.app/`)
            .then(res => {
              const persons = res.data;
              console.log(persons)
              setUI(persons)
            })
        }
        
    }

    
    
    return <>Home Page
    <Link to="/players">Redirect to players page</Link>
    <button onClick={handleEventAxios}>Get Data</button>
    {
        UI === "" ? null : <div>
            {UI}
        </div>
    }
    </>
}

export default Home
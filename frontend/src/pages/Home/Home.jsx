import axios from 'axios'
import { useState } from 'react';

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
    <button onClick={handleEventAxios}>Get Data</button>
    {
        UI === "" ? null : <div>
            {UI}
        </div>
    }
    </>
}

export default Home
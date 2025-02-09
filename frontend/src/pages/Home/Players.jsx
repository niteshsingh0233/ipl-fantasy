import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Players() {
  const [UI, setUI] = useState(0);
  const [playersList, setPlayersList] = useState([]);

  async function handleEventAxios() {
    if (playersList != []) {
        setPlayersList("");
    } else {
      await axios
        .get(
          `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-squad/9237`
        )
        .then((res) => {
          const persons = res.data;
          console.log(persons, persons.response.seriesId);
          setPlayersList(persons.response.squads);
        });
    }
  }

  return (
    <>
      Players Page
      <Link to="/">Redirect to home page</Link>
      <button onClick={handleEventAxios}>Get Players</button>
      {playersList == [] ? null : (
        <div>
            <div>hi</div>
          {playersList.map((element) => {
            console.log(element)
            if (element.squadId) {
              return (<div>
                <p>{element.squadType}</p>
                <p>{element.squadId}</p>
              </div>);
            }
          })}
        </div>
      )}
    </>
  );
}

export default Players;

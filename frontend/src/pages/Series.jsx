import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Series() {
  const [games, setGames] = useState([]);
  const [seriesData, setSeriesData] = useState({});
  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(
        "https://fantasy-app-chi.vercel.app/api/v1/series/getSeriesDetails/9237",
        { method: "GET" }
      )
      .then((res) => {
        //console.log(res)
        if (res.data.isSuccess) {
          setSeriesData(res.data.series);
          setGames(res.data.series.games);
        }
      })
      .catch((error) => {});
  }, []);

  console.log(games, seriesData);


  async function HandleCreateGame(){
    await axios
    .get(
      `https://fantasy-app-chi.vercel.app/api/v1/game/create-game/${seriesData.seriesId}`,
      { method: "GET", headers : { 'Cookie': `token=${localStorage.getItem('token')}` } }
    )
    .then((res) => {
      //console.log(res)
      if (res.data.isSuccess) {
        navigate(`/games/series/${seriesData.seriesId}`)
      }
    })
    .catch((error) => {});


  }

  return (
    <>
      <div className="series-class">
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src="/ipl_2025.jpg"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{seriesData.name}</h5>
            <p className="card-text">{seriesData.name}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Series Held in -: {seriesData.date}</li>
            <li className="list-group-item">Series Id -: {seriesData.seriesId}</li>
          </ul>
          <div className="card-body">
            <a onClick={HandleCreateGame} className="card-link">
              Create Game
               {/* href={`/games/${seriesData._id}` */}
            </a>
            <a href={`/games/series/${seriesData.seriesId}`} className="card-link">
              Get All Games
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Series;

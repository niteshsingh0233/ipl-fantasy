import axios from "axios";
import { useState, useEffect } from "react";
import APIBASEURL from "../data/baseURL";

function Game() {
  const [games, setGames] = useState([]);
  const [seriesData, setSeriesData] = useState({});

  useEffect(() => {
    console.log(location.href);
    axios
      .get(
        `${APIBASEURL()}/api/v1/series/getSeriesDetails/${
          location.pathname.split("/")[location.pathname.split("/").length - 1]
        }`,
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
      `${APIBASEURL()}/api/v1/game/create-game/${seriesData.seriesId}`,
      { withCredentials: true,  headers: {'authorization' : localStorage.getItem('token')}}
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
    <p>Games Created for {seriesData.name}  -: </p>
      <div className="game-class">
        
        {games.length > 0 ? (
          games.map((element) => {
            return (
              <>
                <div key={element._id} className="game-class">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src="/ipl_2025.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{seriesData.name}</h5>
                      <p className="card-text">{element.gameName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Series Held in -: {seriesData.date}
                      </li>
                      <li className="list-group-item">
                        Series Id -: {seriesData.seriesId}
                      </li>
                    </ul>
                    <div className="card-body">
                      <a
                        href={`/owners/${element._id}`}
                        className="card-link"
                      >
                        Owners
                      </a>
                      <a
                        href={`/games/${element._id}`}
                        className="card-link"
                      >
                        Join Game
                      </a>

                      <a
                        href={`/auction/${element._id}`}
                        className="card-link"
                      >
                        Visit Auction 
                      </a>

                      <a
                        href={`/match-points/${seriesData.seriesId}/${element._id}`}
                        className="card-link"
                      >
                        Calculate Match Point
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <><p>
          There aren't any games tagged with this series.
          </p>
          <button onClick={HandleCreateGame}>Create Game for Series</button></>
        )}
      </div>
    </>
  );
}

export default Game;

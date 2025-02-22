import axios from "axios";
import { useState, useEffect } from "react";

function Game() {
  const [games, setGames] = useState([]);
  const [seriesData, setSeriesData] = useState({});

  useEffect(() => {
    console.log(location.href);
    axios
      .get(
        `https://fantasy-app-chi.vercel.app/api/v1/series/getSeriesDetails/${
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
                      <p className="card-text">{seriesData.name}</p>
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
                        View Owners
                      </a>
                      <a
                        href={`/games/${seriesData._id}`}
                        className="card-link"
                      >
                        Join Game
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Game;

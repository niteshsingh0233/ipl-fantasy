import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIBASEURL from "../data/baseURL";

function Series() {
  const [games, setGames] = useState([]);
  const [seriesData, setSeriesData] = useState({});
  let navigate = useNavigate();
  const [createGameSuccessful, setCreateGameSuccessful] = useState(false);
  const [cratedGame, setCreatedGame] = useState({});
  const [maximumPlayers, setMaximumPlayers] = useState();
  const [maximumPoints, setMaximumPoints] = useState();
  const [maximumEntryAmount, setMaximumEntryAmount] = useState();
  const [foreignPlayerList, setForeignPlayerList] = useState();
  const [gameName, setGameName] = useState();

  useEffect(() => {
    axios
      .get(`${APIBASEURL()}/api/v1/series/getSeriesDetails/9237`, {
        method: "GET",
      })
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

  async function HandleCreateGame() {
    await axios
      .get(
        `${APIBASEURL()}/api/v1/game/create-game/${seriesData.seriesId}`,
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        //console.log(res)
        if (res.data.isSuccess) {
          setCreateGameSuccessful(true);
          setCreatedGame(res.data.out[0]);
          // navigate(`/games/series/${seriesData.seriesId}`)
        }
      })
      .catch((error) => {});
  }

  async function HandleUpdateGameDetails() {
    await axios
      .post(
        `${APIBASEURL()}/api/v1/game/updateMaximumOwners/${cratedGame._id}/${maximumPlayers}/${maximumPoints}/${maximumEntryAmount}/`,
        { notForeignTeamList: [foreignPlayerList], gameName: gameName },
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        //console.log(res)
        if (res.data.isSuccess) {
          navigate(`/games/series/${seriesData.seriesId}`);
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
            <li className="list-group-item">
              Series Held in -: {seriesData.date}
            </li>
            <li className="list-group-item">
              Series Id -: {seriesData.seriesId}
            </li>
          </ul>
          <div className="card-body">
            <a onClick={HandleCreateGame} className="card-link">
              Create Game
              {/* href={`/games/${seriesData._id}` */}
            </a>
            <a
              href={`/games/series/${seriesData.seriesId}`}
              className="card-link"
            >
              Get All Games
            </a>
            {createGameSuccessful ? (
              <>
                <div>
                  <input
                    onChange={(e) => {
                      setMaximumPlayers(e.target.value);
                      console.log(e);
                    }}
                    value={maximumPlayers}
                    type="number"
                    placeholder="maximum players"
                  />
                  <br />
                  <input
                    onChange={(e) => {
                      setMaximumPoints(e.target.value);
                      console.log(e);
                    }}
                    value={maximumPoints}
                    type="number"
                    placeholder="maximum points"
                  />
                  <br />
                  <input
                    onChange={(e) => {
                      setMaximumEntryAmount(e.target.value);
                      console.log(e);
                    }}
                    value={maximumEntryAmount}
                    type="number"
                    placeholder="game of maximum amount"
                  />
                  <br />
                  <input
                    onChange={(e) => {
                      setForeignPlayerList(e.target.value.toUpperCase());
                      console.log(e);
                    }}
                    value={foreignPlayerList}
                    type="text"
                    placeholder="Foreign Player List"
                  />
                  <br />
                  <input
                    onChange={(e) => {
                      setGameName(e.target.value);
                      console.log(e);
                    }}
                    value={gameName}
                    type="text"
                    placeholder="please enter game name"
                  />
                  <br />
                </div>
                <div>
                  <button onClick={HandleUpdateGameDetails}>Create Game</button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Series;

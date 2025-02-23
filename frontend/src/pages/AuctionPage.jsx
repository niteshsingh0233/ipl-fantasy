import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIBASEURL from "../data/baseURL";

function AuctionPage() {
  let navigate = useNavigate();
  const [gameDetail, setGameDetail] = useState({});
  const [seriesDetail, setSeriesDetail] = useState({});
  const [pointTableClick, setPointTableClick] = useState(false);
  const [randomNumberGenerator, setRandomNumberGenerator] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [showFilterPlayer, setShowFilterPlayer] = useState(false);
  const [filterPlayersList, setFilterPlayersList] = useState([]);
  const [randomNumberList, setRandomNumberList] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  const [playerDetail, setPlayerDetail] = useState({});
  const [playerImageDetail, setPlayerImageDetail] = useState("");
  const [randomPlayerListForFilter, setRandomPlayerListForFilter] = useState(
    []
  );
  const [currentPlayerData, setCurrentPlayerData] = useState([]);
  const [sellPlayerButtonClick, setSellPlayerButtonClick] = useState(false);
  const [sellButtonText, setSellButtonText] = useState("Sell Player");
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [dropDownValue, setDropDownValue] = useState();
  const [playerBoughtForMoney, setPlayerBoughtForMoney] = useState();

  useEffect(() => {
    axios
      .get(
        `${APIBASEURL()}/api/v1/game/me/getSingleGame/${
          location.pathname.split("/")[location.pathname.split("/").length - 1]
        }`,
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        //console.log(res);
        if (res.data && res.data.game) {
          setOwnerDetails(res.data.game.ownerId);
          setGameDetail(res.data.game);
          setRandomNumberList(
            res.data.game.unsoldPlayersList.map((ele) => {
              return Number(ele.playerId);
            })
          );

          axios
            .get(
              `${APIBASEURL()}/api/v1/series/getSeriesDetails/${
                res.data.game.seriesId
              }`,
              {
                withCredentials: true,
                headers: { authorization: localStorage.getItem("token") },
              }
            )
            .then((response) => {
              //console.log(response);
              if (response.data && response.data.series) {
                setSeriesDetail(response.data.series);
              }
            })
            .catch((error) => {
              console.log(error, "hi");
            });
        }
      })
      .catch((error) => {
        console.log(error, "hi");
      });
  }, []);

  // console.log(randomNumber); //seriesDetail, gameDetail, randomNumberList,

  function HandlePointTableClick() {
    setPointTableClick(!pointTableClick);
  }

  function HandleGetAllPlayerClick() {
    setShowAllPlayers(!showAllPlayers);
  }

  async function GetPlayerDetailsAndImageDetails(playerId) {
    await axios
      .get(`${APIBASEURL()}/api/v1/player/playerDetails/${playerId}`, {
        withCredentials: true,
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res)
        if (res && res.data && res.data.playerDetails) {
          setPlayerDetail(res.data.playerDetails);
        }
      })
      .catch((error) => {});

    await axios
      .get(`${APIBASEURL()}/api/v1/player/playerImageDetails/${playerId}`, {
        withCredentials: true,
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res)
        if (res && res.data && res.data.playerImageDetails) {
          setPlayerImageDetail(res.data.playerImageDetails);
        }
      })
      .catch((error) => {});
  }

  async function RandomNumberGenerator(randomPlayerListForFilter) {
    if (randomNumberGenerator) {
      let randomIndex = getRandomNumber(
        0,
        randomPlayerListForFilter.length - 1
      );
      // console.log(
      //   randomPlayerListForFilter,
      //   randomPlayerListForFilter[randomIndex],
      //   randomIndex,
      //   randomPlayerListForFilter.length
      // );
      setRandomNumber(randomPlayerListForFilter[randomIndex]);

      setCurrentPlayerData(
        gameDetail.playersList.filter((ele) => {
          if (
            ele.playerId === randomPlayerListForFilter[randomIndex].playerId
          ) {
            return (
              <>
                <td>{ele.soldTo}</td>
                <td>{ele.soldFor}</td>
                <td>{ele.isSold}</td>
              </>
            );
          }
        })
      );

      await GetPlayerDetailsAndImageDetails(
        randomPlayerListForFilter[randomIndex].playerId
      );
    } else {
      setRandomNumber();
    }
  }

  async function HandleRandomNumberGeneratorClick() {
    setRandomNumberGenerator(!randomNumberGenerator);

    /*
    if(!randomNumberGenerator){
        let randomIndex = getRandomNumber(0, randomNumberList.length -1)
        console.log(randomNumberList, randomNumberList[randomIndex], randomIndex, randomNumberList.length)
        setRandomNumber(randomNumberList[randomIndex])

        
        await axios
        .get(
          `${APIBASEURL()}/api/v1/player/playerDetails/${randomNumberList[randomIndex]}`,
          {  withCredentials: true,  headers: {'authorization' : localStorage.getItem('token')}}
        )
        .then((res) => {
          console.log(res)
          if(res && res.data && res.data.playerDetails){
            setPlayerDetail(res.data.playerDetails)
          }
          
        })
        .catch((error) => {});

        await axios
        .get(
          `${APIBASEURL()}/api/v1/player/playerImageDetails/${randomNumberList[randomIndex]}`,
          {  withCredentials: true,  headers: {'authorization' : localStorage.getItem('token')}}
        )
        .then((res) => {
          console.log(res)
          if(res && res.data && res.data.playerImageDetails){
            setPlayerImageDetail(res.data.playerImageDetails)
          }
          
        })
        .catch((error) => {});
       

    }else{
        setRandomNumber()
    }
    */
  }

  console.log(playerDetail);

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  function HandleGetFilterPlayerClick() {
    setShowFilterPlayer(!showFilterPlayer);
  }

  function handleBatsmanClick() {
    setFilterPlayersList(
      gameDetail.playersList.filter((ele) => ele.playingStyle === "BATSMAN")
    );
  }

  async function handleRandomBatsmanClick() {
    setRandomPlayerListForFilter(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "BATSMAN"
      )
    );
    await RandomNumberGenerator(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "BATSMAN"
      )
    );
  }

  function handleBowlerClick() {
    setFilterPlayersList(
      gameDetail.playersList.filter((ele) => ele.playingStyle === "BOWLER")
    );
  }

  async function handleRandomBowlerClick() {
    setRandomPlayerListForFilter(
      gameDetail.unsoldPlayersList.filter((ele) => ele.playerStyle === "BOWLER")
    );
    await RandomNumberGenerator(
      gameDetail.unsoldPlayersList.filter((ele) => ele.playerStyle === "BOWLER")
    );
  }

  function handleAllRounderClick() {
    setFilterPlayersList(
      gameDetail.playersList.filter((ele) => ele.playingStyle === "ALLROUNDER")
    );
  }

  async function handleRandomAllRounderClick() {
    setRandomPlayerListForFilter(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "ALLROUNDER"
      )
    );
    await RandomNumberGenerator(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "ALLROUNDER"
      )
    );
  }

  async function handleRandomWicketKeeperClick() {
    setRandomPlayerListForFilter(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "WICKETKEEPER"
      )
    );
    await RandomNumberGenerator(
      gameDetail.unsoldPlayersList.filter(
        (ele) => ele.playerStyle === "WICKETKEEPER"
      )
    );
  }

  function handleWicketKeeperClick() {
    setFilterPlayersList(
      gameDetail.playersList.filter(
        (ele) => ele.playingStyle === "WICKETKEEPER"
      )
    );
  }

  function handleUnsoldPlayersClick() {
    setFilterPlayersList(gameDetail.playersList.filter((ele) => !ele.isSold));
  }

  function handleSoldPlayersClick() {
    setFilterPlayersList(gameDetail.playersList.filter((ele) => ele.isSold));
  }

  function HandleSoldPlayerButtonClick() {
    setSellPlayerButtonClick(!sellPlayerButtonClick);
    setSellButtonText("Select owner to sell the Player!");
  }

  async function handleSellConfirmButtonClick() {
    console.log(dropDownValue);
    await axios
      .post(
        `${APIBASEURL()}/api/v1/owner/admin/sold-players/${dropDownValue}`,
        {
          playerId: playerDetail.id,
          playerBoughtForAmount: playerBoughtForMoney,
        },
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res)
        setRandomNumberGenerator(false)
        setSellPlayerButtonClick(false)
        setSellButtonText("Sell Player")
        setPlayerDetail({})
        setPlayerImageDetail('')

      })
      .catch((error) => {});
  }

  return (
    <div className="auction-page-css">
      <div>
        <p>Series Name -: {seriesDetail.name}</p>
        <p>Game Name -: {gameDetail.gameName}</p>
      </div>

      <div>
        <button className="btn-cls-auction" onClick={HandlePointTableClick}>
          Check Point Table
        </button>
        <button className="btn-cls-auction" onClick={HandleGetAllPlayerClick}>
          Get All Players
        </button>
        <button
          className="btn-cls-auction"
          onClick={HandleGetFilterPlayerClick}
        >
          Get Filters Player
        </button>
        <button
          className="btn-cls-auction"
          onClick={HandleRandomNumberGeneratorClick}
        >
          Generate Random Number
        </button>
      </div>

      <div>
        {pointTableClick ? (
          <div>
            <table border={"solid"} key={1} id="auction-point-table">
              <thead>
                <tr>
                  <th>Owner Name</th>
                  <th>Owner Team Name</th>
                  <th>Points Remaining</th>
                </tr>
              </thead>
              {gameDetail.ownerPoints.map((ele) => {
                return (
                  <tr>
                    <td>{ele.ownerName}</td>
                    <td>{ele.ownerTeamName}</td>
                    <td>{ele.pointsRemaining}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
        {showAllPlayers ? (
          <div>
            <table border={"solid"} key={1} id="auction-point-table">
              <thead>
                <tr>
                  <th>Player Id</th>
                  <th>Player Name</th>
                  <th>Playing Style</th>
                  <th>sold To</th>
                  <th>Sold For</th>
                  <th>Player Sold</th>
                  <th>Player Profile Link</th>
                </tr>
              </thead>
              {gameDetail.playersList.map((ele) => {
                return (
                  <tr>
                    <td>{ele.playerId}</td>
                    <td>{ele.playerName}</td>
                    <td>{ele.playingStyle}</td>
                    <td>{ele.soldTo}</td>
                    <td>{ele.soldFor}</td>
                    <td>{ele.isSold}</td>
                    <td>
                      <button class="button button2">Click Here!</button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="filter-list-labels">
        {showFilterPlayer ? (
          <div>
            <input
              onClickCapture={handleBatsmanClick}
              type="radio"
              id="batsman"
              name="show_all_players"
              value="batsman"
            />
            <label className="radio-label" for="batsman">
              BATSMAN
            </label>

            <input
              onClickCapture={handleBowlerClick}
              type="radio"
              id="bowler"
              name="show_all_players"
              value="bowler"
            />
            <label className="radio-label" for="bowler">
              BOWLER
            </label>

            <input
              onClickCapture={handleAllRounderClick}
              type="radio"
              id="allRounder"
              name="show_all_players"
              value="allRounder"
            />
            <label className="radio-label" for="allRounder">
              ALL ROUNDER
            </label>

            <input
              onClickCapture={handleWicketKeeperClick}
              type="radio"
              id="wicketKeeper"
              name="show_all_players"
              value="wicketKeeper"
            />
            <label className="radio-label" for="wicketKeeper">
              WICKET KEEPER
            </label>

            <input
              onClickCapture={handleUnsoldPlayersClick}
              type="radio"
              id="unsoldPlayers"
              name="show_all_players"
              value="unsoldPlayers"
            />
            <label className="radio-label" for="unsoldPlayers">
              Unsold Players
            </label>

            <input
              onClickCapture={handleSoldPlayersClick}
              type="radio"
              id="soldPlayers"
              name="show_all_players"
              value="soldPlayers"
            />
            <label className="radio-label" for="soldPlayers">
              Sold Players
            </label>

            {/* <input type="search" onClick={console.log('hi')} placeholder="search By Player Name" name="show_all_players"/> */}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
        {showFilterPlayer ? (
          <div>
            <table border={"solid"} key={1} id="auction-point-table">
              <thead>
                <tr>
                  <th>Player Id</th>
                  <th>Player Name</th>
                  <th>Playing Style</th>
                  <th>sold To</th>
                  <th>Sold For</th>
                  <th>Player Sold</th>
                  <th>Player Profile Link</th>
                </tr>
              </thead>
              {filterPlayersList.map((ele) => {
                return (
                  <tr>
                    <td>{ele.playerId}</td>
                    <td>{ele.playerName}</td>
                    <td>{ele.playingStyle}</td>
                    <td>{ele.soldTo}</td>
                    <td>{ele.soldFor}</td>
                    <td>{ele.isSold}</td>
                    <td>
                      <button class="button button2">Click Here!</button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="filter-list-labels">
        {randomNumberGenerator ? (
          <div>
            <input
              onClickCapture={handleRandomBatsmanClick}
              type="radio"
              id="batsman"
              name="show_all_players"
              value="batsman"
            />
            <label className="radio-label" for="batsman">
              BATSMAN
            </label>

            <input
              onClickCapture={handleRandomBowlerClick}
              type="radio"
              id="bowler"
              name="show_all_players"
              value="bowler"
            />
            <label className="radio-label" for="bowler">
              BOWLER
            </label>

            <input
              onClickCapture={handleRandomAllRounderClick}
              type="radio"
              id="allRounder"
              name="show_all_players"
              value="allRounder"
            />
            <label className="radio-label" for="allRounder">
              ALL ROUNDER
            </label>

            <input
              onClickCapture={handleRandomWicketKeeperClick}
              type="radio"
              id="wicketKeeper"
              name="show_all_players"
              value="wicketKeeper"
            />
            <label className="radio-label" for="wicketKeeper">
              WICKET KEEPER
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
        {randomNumberGenerator && playerDetail && playerImageDetail !== "" ? (
          <div>
            <div random-photo-div>
              <img src="../assets/download.png" />
              <div>
                <table border={"solid"} key={1} id="auction-point-table">
                  <thead>
                    <tr>
                      <th>Player Id</th>
                      <th>Player Name</th>
                      <th>Playing Style</th>
                      {/* <th>sold To</th>
                        <th>Sold For</th>
                        <th>Player Sold</th> */}
                    </tr>
                  </thead>

                  <tr>
                    <td>{randomNumber.playerId}</td>
                    <td>{randomNumber.playerName}</td>
                    <td>{randomNumber.playerStyle}</td>
                    {/* <td>{currentPlayerData.soldTo}</td>
                              <td>{currentPlayerData.soldFor}</td>
                              <td>{currentPlayerData.isSold}</td> */}
                  </tr>
                </table>
              </div>
            </div>
            <div>
              <button
                className="player-sold-button button button1"
                onClick={HandleSoldPlayerButtonClick}
              >
                {sellButtonText}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
      {sellPlayerButtonClick ? (
        <div className="owner-select-div">
          {/* <h1>{dropDownValue}</h1> */}
          <label className="owner-select-label">
            Pick Owner Name:
            <select
              value={dropDownValue}
              onChange={(e) => setDropDownValue(e.target.value)}
            >
              <option value={ownerDetails[0]._id}>
                {ownerDetails[0].ownerTeamName}
              </option>
              <option value={ownerDetails[1]._id}>
                {ownerDetails[1].ownerTeamName}
              </option>
              {/* <option value={ownerDetails[2]._id}>{ownerDetails[2].ownerTeamName}</option>
                      <option value={ownerDetails[3]._id}>{ownerDetails[3].ownerTeamName}</option>
                      <option value={ownerDetails[4]._id}>{ownerDetails[4].ownerTeamName}</option>
                      <option value={ownerDetails[5]._id}>{ownerDetails[5].ownerTeamName}</option>
                      <option value={ownerDetails[6]._id}>{ownerDetails[6].ownerTeamName}</option>
                      <option value={ownerDetails[7]._id}>{ownerDetails[7].ownerTeamName}</option>
                      <option value={ownerDetails[8]._id}>{ownerDetails[8].ownerTeamName}</option>
                      <option value={ownerDetails[9]._id}>{ownerDetails[9].ownerTeamName}</option> */}
            </select>
          </label>
          <div>
            <label className="owner-select-label">Enter the selling Amount! </label>
            <input className="owner-select-input"
              type="number"
              onChange={(e) => {
                setPlayerBoughtForMoney(e.target.value);
                console.log(e);
              }}
              value={playerBoughtForMoney}
            />

<button
            className="player-sold-button button button3"
            onClick={handleSellConfirmButtonClick}
          >
            Pakka sell kardu?!!
          </button>
          </div>
          
        </div>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
}

export default AuctionPage;

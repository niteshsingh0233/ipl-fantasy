import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIBASEURL from "../data/baseURL";

function AuctionPage() {
  let navigate = useNavigate();
  const [gameDetail, setGameDetail] = useState({});
  const [seriesDetail, setSeriesDetail] = useState({});
  const [pointTableClick, setPointTableClick] = useState(false);
  const [randomNumberGenerator, setRandomNumberGenerator] = useState(false)
  const [showAllPlayers, setShowAllPlayers] = useState(false)
  const [showFilterPlayer, setShowFilterPlayer] = useState(false)
  const [filterPlayersList, setFilterPlayersList] = useState([])
  const [randomNumberList, setRandomNumberList] = useState([])
  const [randomNumber, setRandomNumber] = useState()
  const [playerDetail, setPlayerDetail] = useState({})

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
          setGameDetail(res.data.game);
          setRandomNumberList(res.data.game.unsoldPlayersList.map((ele) => {
            return Number(ele.playerId)
          }))

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

  console.log(randomNumber); //seriesDetail, gameDetail, randomNumberList,

  function HandlePointTableClick() {
    setPointTableClick(!pointTableClick);
  }

  function HandleGetAllPlayerClick(){
    setShowAllPlayers(!showAllPlayers)
  }

  async function HandleRandomNumberGeneratorClick(){
    setRandomNumberGenerator(!randomNumberGenerator)
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
          
        })
        .catch((error) => {});
    }else{
        setRandomNumber()
    }
    
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
  
    return Math.floor(Math.random() * (max - min)) + min
  }

  function HandleGetFilterPlayerClick(){
    setShowFilterPlayer(!showFilterPlayer)
  }


  function handleBatsmanClick(){

    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => ele.playingStyle === "BATSMAN")
    )
  }

  function handleBowlerClick(){
    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => ele.playingStyle === "BOWLER")
    )
  }

  function handleAllRounderClick(){
    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => ele.playingStyle === "ALLROUNDER")
    )
  }

  function handleWicketKeeperClick(){
    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => ele.playingStyle === "WICKETKEEPER")
    )
  }

  function handleUnsoldPlayersClick(){
    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => !ele.isSold)
    )
  }

  function handleSoldPlayersClick(){
    setFilterPlayersList(
        gameDetail.playersList.filter((ele) => ele.isSold)
    )
  }

  return (
    <div className="auction-page-css">

      <div >
        <p>Series Name -: {seriesDetail.name}</p>
        <p>Game Name -: {gameDetail.gameName}</p>
      </div>

      <div>
      <button className="btn-cls-auction" onClick={HandlePointTableClick}>Check Point Table</button>
      <button className="btn-cls-auction" onClick={HandleGetAllPlayerClick}>Get All Players</button>
      <button className="btn-cls-auction" onClick={HandleGetFilterPlayerClick}>Get Filters Player</button>
      <button className="btn-cls-auction" onClick={HandleRandomNumberGeneratorClick}>Generate Random Number</button>
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
        {showAllPlayers ? (<div>
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
                      <td><button class="button button2">Click Here!</button></td>
                    </tr>
                  
                );
              })}
            </table>
        </div>) : <></>}
      </div>

      <div className="filter-list-labels">
        {
            showFilterPlayer ? (<div>
                
                <input onClickCapture={handleBatsmanClick} type="radio" id="batsman" name="show_all_players" value="batsman"/>
                <label className="radio-label" for="batsman">BATSMAN</label>

                <input onClickCapture={handleBowlerClick} type="radio" id="bowler" name="show_all_players" value="bowler"/>
                <label className="radio-label" for="bowler">BOWLER</label>

                <input onClickCapture={handleAllRounderClick} type="radio" id="allRounder" name="show_all_players" value="allRounder"/>
                <label className="radio-label" for="allRounder">ALL ROUNDER</label>

                <input onClickCapture={handleWicketKeeperClick} type="radio" id="wicketKeeper" name="show_all_players" value="wicketKeeper"/>
                <label className="radio-label" for="wicketKeeper">WICKET KEEPER</label>

                <input onClickCapture={handleUnsoldPlayersClick} type="radio" id="unsoldPlayers" name="show_all_players" value="unsoldPlayers"/>
                <label className="radio-label" for="unsoldPlayers">Unsold Players</label>

                <input onClickCapture={handleSoldPlayersClick} type="radio" id="soldPlayers" name="show_all_players" value="soldPlayers"/>
                <label className="radio-label" for="soldPlayers">Sold Players</label>

                {/* <input type="search" onClick={console.log('hi')} placeholder="search By Player Name" name="show_all_players"/> */}

            </div>) : <></>
        }
      </div>

      <div>
        {showFilterPlayer ? (<div>
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
                      <td><button class="button button2">Click Here!</button></td>
                    </tr>
                  
                );
              })}
            </table>
        </div>) : <></>}
      </div>

      <div>
        {
            randomNumberGenerator ? (
            <div>
                <button>Click To Generate Random Number</button>
            </div>
        ) : <></>
        }
      </div>
    </div>
  );
}

export default AuctionPage;

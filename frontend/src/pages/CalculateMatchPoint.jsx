import axios from "axios";
import { useState, useEffect } from "react";
import APIBASEURL from "../data/baseURL";

function CalculateMatchPoint() {
  const [matchesList, setMatchesList] = useState([]);
  const [calculatePointButtonClick, setCalculatePointButtonClick] =
    useState(false);
  const [pointsCalculated, setPointsCalculated] = useState([]);
  const [goBackToPreviosPage, setGoBackToPreviosPage] = useState(false);

  useEffect(() => {
    axios
      .get(`${APIBASEURL()}/api/v1/series/getSeriesDetails/9237`, {
        method: "GET",
      })
      .then((res) => {
        //console.log(res)
        if (res.data.isSuccess) {
          let matchDetails = [];
          res.data.series.matches.forEach((element) => {
            matchDetails.push({
              team1: element.team1.teamName,
              team2: element.team2.teamName,
              matchId: element.matchId,
              matchDesc: element.matchDesc,
            });
          });
          setMatchesList(matchDetails);
        }
      })
      .catch((error) => {});
  }, []);

  async function handleSubmitEvent(e) {
    axios
      .post(
        `${APIBASEURL()}/api/v1/point/calculate-player-points-v2`,
        {
          matchId: e.target.id,
        },
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        //console.log(res)
        if (res.data.isSuccess) {
        //   console.log(res.data.pointsForMatchV2.pointsCalculated)
          setPointsCalculated(res.data.pointsForMatchV2.pointsCalculated);
          setCalculatePointButtonClick(true);
          setGoBackToPreviosPage(true);
        }
      })
      .catch((error) => {});
  }

  function handleBackToPreviousPageClick() {
    setCalculatePointButtonClick(false);
    setGoBackToPreviosPage(false);
  }

  // console.log(matchesList)
  // console.log(pointsCalculated)
  return (
    <>
      {pointsCalculated && calculatePointButtonClick && goBackToPreviosPage ? (
        <div>
          <button
            onClick={handleBackToPreviousPageClick}
            className="button button2"
          >
            Go back To Previous Page!
          </button>
          <table border={"solid"} key={1} id="auction-point-table">
            <thead>
              <tr>
                <th>teamName</th>
                <th>playerName</th>
                <th>playerId</th>
                <th>totalPoints</th>
              </tr>
            </thead>
            {pointsCalculated.map((ele) => {
              return (
                <tr>
                  <td>{ele.teamName}</td>
                  <td>{ele.playerName}</td>
                  <td>{ele.playerId}</td>
                  <td>{ele.totalPoints}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <></>
      )}
      {matchesList && !calculatePointButtonClick && !goBackToPreviosPage ? (
        <div>
          <table border={"solid"} key={1} id="auction-point-table">
            <thead>
              <tr>
                <th>team1</th>
                <th>team2</th>
                <th>matchId</th>
                <th>matchDesc</th>
                <th>Button For Point Calculation</th>
              </tr>
            </thead>
            {matchesList.map((ele) => {
              return (
                <tr>
                  <td>{ele.team1}</td>
                  <td>{ele.team2}</td>
                  <td>{ele.matchId}</td>
                  <td>{ele.matchDesc}</td>
                  <td>
                    <button
                      onClick={handleSubmitEvent}
                      id={ele.matchId}
                      className="button button2"
                    >
                      Calculate Match Point!
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CalculateMatchPoint;

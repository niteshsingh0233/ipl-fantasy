import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIBASEURL from "../data/baseURL";

function GameOwners() {
  let navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${APIBASEURL()}/api/v1/owner/admin/getAllOwnerDetails/${
          location.pathname.split("/")[location.pathname.split("/").length - 1]
        }`,
        {
          withCredentials: true,
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success && res.data.owners && res.data.owners.length > 0) {
          setOwners(res.data.owners);
        }
      })
      .catch((error) => {
        console.log(error, "hi");
      });
  }, []);

  return (
    <>
      <p>
        Owner Details for Game -:{" "}
        {location.pathname.split("/")[location.pathname.split("/").length - 1]}
      </p>

      <div className="owner-class-card">
        {owners && owners.length > 0 ? (
          <>
            {owners.map((element) => {
              return (
                <div className="owner-class">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src="/ipl_2025.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{element.ownerId.name}</h5>
                      <p className="card-text">{element.ownerTeamName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Points Left -: {element.pointsLeft}
                      </li>
                      <li className="list-group-item">
                        Entry Amount Paid -: {element.totalEntryAmountPaid}
                      </li>
                    </ul>
                    <div className="card-body">
                      <a href={`/owner/`}  className="card-link">
                        Owner Details
                        {/* href={`/games/${seriesData._id}` */}
                      </a>
                      <a
                        href={`/owner/update/${location.pathname.split("/")[location.pathname.split("/").length - 1]}`}
                        className="card-link"
                      >
                        Update Owner
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default GameOwners;

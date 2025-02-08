const axios = require("axios");

exports.CreateGameFromSeriesId = async (seriesId) => {
  console.log(seriesId);
  const options = {
    method: "GET",
    url: `http://localhost:4000/api/v1/get-series-matches-list/${seriesId}`,
  };
  let response = await axios.request(options);
  console.log(response.data)
  if (response.data && response.data.response.matchDetails.length > 0) {
    let output = [];
    let count = 0;
    console.log(response.data)
    response.data.response.matchDetails.forEach((element) => {
        let dataObject = {
            id : count++
        };

        output.push(dataObject);
    });
    //return response.data
    return output;
  }
  return false;
};
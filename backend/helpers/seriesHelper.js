const axios = require("axios");

exports.CreateSeriesFromSeriesId = async (seriesType) => {
  console.log(seriesType);
  const options = {
    method: "GET",
    url: `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-series-list/${seriesType}`,
  };
  let response = await axios.request(options);
  console.log(response.data)
  if (response.data && response.data.response.seriesMapProto.length > 0) {
    let output = [];
    let count = 0;
    console.log(response.data)
    response.data.response.seriesMapProto.forEach((element) => {
        element.series.forEach((series) => {
            let dataObject = {
                id : series.id,
                name : series.name,
                date : element.date
            };
    
            output.push(dataObject);
        })
    });
    //return response.data
    return output;
  }
  return false;
};
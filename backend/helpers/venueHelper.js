const axios = require("axios");

exports.VenueHelper = async (seriesId) => {
  console.log(seriesId);
  const options = {
    method: "GET",
    url: `http://localhost:4000/api/v1/get-series-venues-list/${seriesId}`,
  };
  let response = await axios.request(options);
  console.log(response.data)
  if (response.data && response.data.response.seriesVenue.length > 0) {
    let output = [];
    let count = 0;
    console.log(response.data)
    response.data.response.seriesVenue.forEach((element) => {
        let dataObject = {
            id: element.id,
            ground: element.ground,
            city: element.city,
            country: element.country,
        };

        output.push(dataObject);
    });
    //return response.data
    return output;
  }
  return false;
};

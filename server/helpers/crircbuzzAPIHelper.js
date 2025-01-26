const axios = require("axios");

exports.cricbuzzAPIHelper = async (url) => {
  const options = {
    method: "GET",
    url: url,
    headers: {
      "x-rapidapi-key": "0f8816f6a3msh904dd1653581039p1a48d8jsnba7150df49a5",
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (!response) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
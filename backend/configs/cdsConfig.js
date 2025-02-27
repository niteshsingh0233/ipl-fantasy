const axios = require("axios");
const CDSSchema = require("../models/cdsModel.js");

async function CDSServiceAPI(
  cdsName = "",
  url = "",
  method = "GET",
  params = [],
  payload = {}
) {
  try {
    var responseObject = {};
    if (url !== "") {
        responseObject = await HttpAsyncHelper(url, method, params, payload)
    } else if (cdsName !== "") {
        console.log(cdsName)
      let cdsData = await CDSSchema.findOne({ cdsName: cdsName });
      console.log(cdsData)
      if (cdsData) {
        responseObject = await HttpAsyncHelper(cdsData.cdsName, cdsData.method, cdsData.queryParams, payload)
      }
    }
    return responseObject
  } catch (error) {}
}

async function HttpAsyncHelper(url, method = "GET", params, payload) {
  try {
    let options = {}
console.log(url, method, params, payload)
    if (method === "GET") {
      options = {
        method,
        url,
      };
    } else if (method === "POST") {
      options = {
        method,
        url,
      };
    }
    let response = await axios.request(options);
    console.log(response)
    return response;
  } catch (error) {}
}

module.exports = CDSServiceAPI;

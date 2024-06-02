const mongoose = require("mongoose");

async function mongoConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://niteshsingh0233:2xT3nDb8SiJMtnwV@ipl-fantasy-cluster-1.fskpkqe.mongodb.net/"
    );
    console.log(`db connected successfully.`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = mongoConnection;

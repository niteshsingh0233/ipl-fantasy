//enum contsant //team // batsmbowler // batsman // bowler
const express = require("express");
const {
    numberGeneratorHelper
} = require("../helpers/numberGeneratorHelper.js");

exports.NumberGenerator = async (req, res) => {
  try {
    const { type } = req.body
    const number = await numberGeneratorHelper(type);
    res.status(200).json({
        message : number
    })
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error,
    });
  }
};
const express = require("express");
const OwnerSchema = require("../models/ownerModel.js");
const Games = require("../models/gameModel.js");
const Players = require("../models/playerModel.js");
const User = require("../models/userModel.js");
const teamList = require("../constants/enumConstants.js");
const httpHelper = require("../helpers/httpHelper.js");

exports.CreateOwner = async (req, res) => {
  try {
    const {
      ownerTeamName,
      // teamName,
      // ownerId,
      // playersList,
      // totalPlayerCount,
      // totalBatsmanCount,
      // totalBowlerCount,
      // totalAllRounderCount,
      // totalWicketKeeperCount,
      // playingXIList,
      // playingXICount,
      // playingXIBatsmanCount,
      // playingXIBowlerCount,
      // playingXIAllRounderCount,
      // playingXIWicketKeeperCount,
      // captainSwapCount,
      // playerSwapCount,
      // captainSwaps,
      // playerSwaps,
      // captain,
      // viceCaptain,
      // matchScoreList,
    } = req.body;

    console.log(req.body);

    const owners = await OwnerSchema.find();
    // if (owners.length >= 10) {
    //   res.status(500).json({
    //     message: "owner limit exceeds.",
    //   });
    //   return;
    // }

    // const ownerData = await OwnerSchema.findOne({ ownerId }).populate('ownerId');
    // console.log(ownerData)
    // if (ownerData) {
    //   res.status(500).json({
    //     message: "owner already exists.",
    //   });
    //   return;
    // }

    const owner = OwnerSchema({
      ownerTeamName,
      // teamName,
      ownerId: req.user._id,
      // playersList,
      // totalPlayerCount,
      // totalBatsmanCount,
      // totalBowlerCount,
      // totalAllRounderCount,
      // totalWicketKeeperCount,
      // playingXIList,
      // playingXICount,
      // playingXIBatsmanCount,
      // playingXIBowlerCount,
      // playingXIAllRounderCount,
      // playingXIWicketKeeperCount,
      // captainSwapCount,
      // playerSwapCount,
      // captainSwaps,
      // playerSwaps,
      // captain,
      // viceCaptain,
      // matchScoreList,
    });

    ownerOutput = await owner.save();

    res.status(200).json({
      message: "Owner Data successfully created.",
      owner: ownerOutput,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating owner.",
      error,
      success: false,
    });
  }
};

exports.AddRetainedPlayer = async (req, res, next) => {
  try {
    const owner = await OwnerSchema.findById(req.params.ownerId);
    const game = await Games.findById(owner.games);

    let { playerId, playerBoughtForAmount } = req.body;
    const players = await Players.findOne({ playerId });

    const user = await User.findById(owner.ownerId);

    let originalAmount = playerBoughtForAmount;
    /*
    playerBoughtForAmount = Math.floor(
      (playerBoughtForAmount * 10) / 100 + playerBoughtForAmount
    )
      .toString()
      .split("");
    if (playerBoughtForAmount[playerBoughtForAmount.length - 1] != 0) {
      let test = 10 - playerBoughtForAmount[playerBoughtForAmount.length - 1];
      originalAmount =
        test + Math.floor((originalAmount * 10) / 100 + originalAmount);
    } else {
      originalAmount = Math.floor((originalAmount * 10) / 100 + originalAmount);
    }
    */

    console.log(game.unsoldPlayersList)

    let playerAlreadySold = false

    game.soldPlayerList.forEach((ele) => {
      if (ele.playerDocumentCode == players.documentCode) {
        playerAlreadySold = true
      }
    })

    if(playerAlreadySold){
      res.status(200).json({
        message: "Player is already retained and sold.",
        success: true,
      });
      return;
    }

    game.unsoldPlayersList.forEach((element) => {
      if (element.playerDocumentCode == players.documentCode) {
        console.log(true);
        game.soldPlayerList.push(element);
      }
    });

    game.unsoldPlayersList = game.unsoldPlayersList.filter(
      (ele) => ele.playerDocumentCode != players.documentCode
    );

    game.ownerPoints.forEach((ele) => {
      if (ele.documentCode == owner.documentCode) {
        ele.pointsRemaining = ele.pointsRemaining - originalAmount;
      }
    });

    game.playersList.forEach((ele) => {
      if (ele.playerId == playerId) {
        (ele.soldFor = originalAmount),
          (ele.soldTo = user.name),
          (ele.isSold = true);
      }
    });

    let isPlayerAlreadyRetained = false
    
    owner.retainedPlayer.forEach((ele) => {
if(ele.playerId ==players.playerId ){
  isPlayerAlreadyRetained = true
}

    })

    if(isPlayerAlreadyRetained){
      res.status(200).json({
        message: "Player is already retained .",
        success: true,
      });
      return;
    }

    owner.retainedPlayer.push({
      playerId: players.playerId,
      playerName: players.playerName,
      playerDocumentCode: players.documentCode,
      playingStyle: players.playerRoleType.toUpperCase(),
    });

    owner.pointsLeft = owner.pointsLeft - originalAmount;
    owner.totalPlayerCount = ++owner.totalPlayerCount;
    if (players.playerRoleType.toUpperCase() == "BATSMAN") {
      owner.totalBatsmanCount = ++owner.totalBatsmanCount;
    } else if (players.playerRoleType.toUpperCase() == "BOWLER") {
      owner.totalBowlerCount = ++owner.totalBowlerCount;
    } else if (players.playerRoleType.toUpperCase() == "ALLROUNDER") {
      owner.totalAllRounderCount = ++owner.totalAllRounderCount;
    } else if (players.playerRoleType.toUpperCase() == "WICKETKEEPER") {
      owner.totalWicketKeeperCount = ++owner.totalWicketKeeperCount;
    }

    let foreignPlayer = false;
    let isForeignerPlayer = await httpHelper.GetAsync(
      `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-player-info-details/${players.playerId}`
    );
    // console.log(isForeignerPlayer);
    console.log(isForeignerPlayer.data.response.intlTeam.toUpperCase(), game.notForeignTeamList)
    if (
      isForeignerPlayer.data &&
      !game.notForeignTeamList.includes(
        isForeignerPlayer.data.response.intlTeam.toUpperCase()
      )
    ) {
      foreignPlayer = true;
      owner.totalForeignPlayerCount = ++owner.totalForeignPlayerCount
    }
    if(!foreignPlayer){
      owner.totalIndianPlayerCount = ++owner.totalIndianPlayerCount
    }
    owner.playersList.push({
      playerId: players.playerId,
      playerName: players.playerName,
      playerCountry: '',
      playerType: players.playerRoleType.toUpperCase(),
      isInPlayingXI: false,
      boughtFor: originalAmount,
      isForeigner : foreignPlayer
    });

    await owner.save()
    await game.save()

    res.status(200).json({
      message: "AddRetainedPlayer created.",
      owner,
      game,
      players,
      playerBoughtForAmount,
      originalAmount,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in AddRetainedPlayer.",
      error,
      success: false,
    });
  }
};

exports.PayEntryFee = async (req, res, next) => {
  try {
    const owner = await OwnerSchema.findById(req.params.ownerId);
    const game = await Games.findById(owner.games);

    const entryAmountPaid = req.params.entryAmountPaid;

    const user = await User.findById(owner.ownerId);

    if (owner.totalEntryAmount === owner.totalEntryAmountPaid) {
      res.status(200).json({
        message: "You have already paid the entry fees.",
        success: false,
      });
      return;
    }

    if (entryAmountPaid > owner.totalEntryAmount) {
      res.status(200).json({
        message: "entry amount can't be greater than entry fees.",
        success: false,
      });
      return;
    }

    if (owner.totalEntryAmountPaid > owner.totalEntryAmount) {
      res.status(200).json({
        message: "you have already paid greater than entry fees.",
        success: false,
      });
      return;
    }

    owner.totalEntryAmountPaid =
      Number(owner.totalEntryAmountPaid) + Number(entryAmountPaid);
    if (owner.totalEntryAmount == owner.totalEntryAmountPaid) {
      owner.entryFeePaid = true;
    } else if (owner.totalEntryAmountPaid > owner.totalEntryAmount) {
      res.status(200).json({
        message: "you can't pay greater than entry fees.",
        success: false,
      });
      return;
    }

    await owner.save();

    res.status(200).json({
      message: "Pay Entry Fee created.",
      owner,
      entryAmountPaid,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in PayEntryFee.",
      error,
      success: false,
    });
  }
};

exports.UpdateTeamOwnerCountry = async (req, res) => {
  try {
    const { ownerId, teamName, gameId } = req.body;
    console.log(teamList, ownerId, teamName);
    const updateOwner = await OwnerSchema.findById(ownerId);
    const game = await Games.findById(gameId);

    if (!teamList.includes(teamName)) {
      res.status(200).json({
        message: "Please provide correct teamName.",
        success: true,
      });
      return;
    }

    if (updateOwner.teamName) {
      res.status(200).json({
        message: "team already exist for given owner created.",
        success: true,
      });
      return;
    }

    const owners = await OwnerSchema.find({ _id: { $in: game.ownerId } });

    console.log(owners.length);

    let teamNameExists = false;

    owners.forEach((element) => {
      if (element.teamName == teamName) {
        teamNameExists = true;
      }
    });

    if (teamNameExists) {
      res.status(200).json({
        message: "teamNameExist already created.",
        success: true,
      });
      return;
    }

    updateOwner.teamName = teamName;

    await updateOwner.save();

    // const user = await User.findById(owner.ownerId);
    res.status(200).json({
      message: "UpdateTeamOwnerCountry created.",
      updateOwner,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in UpdateTeamOwnerCountry.",
      error,
      success: false,
    });
  }
};

exports.AddPlayerInOwnerDetails = async (req, res) => {
  try {
    const owner = await OwnerSchema.findById(req.params.ownerId);
    const game = await Games.findById(owner.games);

    let { playerId, playerBoughtForAmount } = req.body;
    const players = await Players.findOne({ playerId });

    const user = await User.findById(owner.ownerId);

    let originalAmount = playerBoughtForAmount;

    console.log(game.unsoldPlayersList)

    let playerAlreadySold = false

    game.soldPlayerList.forEach((ele) => {
      if (ele.playerDocumentCode == players.documentCode) {
        playerAlreadySold = true
      }
    })

    if(playerAlreadySold){
      res.status(200).json({
        message: "Player is already retained and sold.",
        success: true,
      });
      return;
    }

    game.unsoldPlayersList.forEach((element) => {
      if (element.playerDocumentCode == players.documentCode) {
        console.log(true);
        game.soldPlayerList.push(element);
      }
    });

    game.unsoldPlayersList = game.unsoldPlayersList.filter(
      (ele) => ele.playerDocumentCode != players.documentCode
    );

    game.ownerPoints.forEach((ele) => {
      if (ele.documentCode == owner.documentCode) {
        let pointsRemaining = ele.pointsRemaining
        ele.pointsRemaining = pointsRemaining - originalAmount;
      }
    });

    game.playersList.forEach((ele) => {
      if (ele.playerId == playerId) {
        (ele.soldFor = originalAmount),
          (ele.soldTo = user.name),
          (ele.isSold = true);
      }
    });

    let isPlayerAlreadyRetained = false
    
    owner.retainedPlayer.forEach((ele) => {
if(ele.playerId ==players.playerId ){
  isPlayerAlreadyRetained = true
}

    })

    if(isPlayerAlreadyRetained){
      res.status(200).json({
        message: "Player is already retained .",
        success: true,
      });
      return;
    }

    

    owner.pointsLeft = owner.pointsLeft - originalAmount;
    owner.totalPlayerCount = ++owner.totalPlayerCount;
    if (players.playerRoleType.toUpperCase() == "BATSMAN") {
      owner.totalBatsmanCount = ++owner.totalBatsmanCount;
    } else if (players.playerRoleType.toUpperCase() == "BOWLER") {
      owner.totalBowlerCount = ++owner.totalBowlerCount;
    } else if (players.playerRoleType.toUpperCase() == "ALLROUNDER") {
      owner.totalAllRounderCount = ++owner.totalAllRounderCount;
    } else if (players.playerRoleType.toUpperCase() == "WICKETKEEPER") {
      owner.totalWicketKeeperCount = ++owner.totalWicketKeeperCount;
    }

    let foreignPlayer = false;
    let isForeignerPlayer = await httpHelper.GetAsync(
      `https://fantasy-app-cricbuzz-api.vercel.app/api/v1/get-player-info-details/${players.playerId}`
    );
    // console.log(isForeignerPlayer);
    console.log(isForeignerPlayer.data.response.intlTeam.toUpperCase(), game.notForeignTeamList)
    if (
      isForeignerPlayer.data &&
      !game.notForeignTeamList.includes(
        isForeignerPlayer.data.response.intlTeam.toUpperCase()
      )
    ) {
      foreignPlayer = true;
      owner.totalForeignPlayerCount = ++owner.totalForeignPlayerCount
    }
    if(!foreignPlayer){
      owner.totalIndianPlayerCount = ++owner.totalIndianPlayerCount
    }
    owner.playersList.push({
      playerId: players.playerId,
      playerName: players.playerName,
      playerCountry: '',
      playerType: players.playerRoleType.toUpperCase(),
      isInPlayingXI: false,
      boughtFor: originalAmount,
      isForeigner : foreignPlayer
    });

    await owner.save()
    await game.save()

    res.status(200).json({
      message: "AddRetainedPlayer created.",
      owner,
      game,
      players,
      playerBoughtForAmount,
      originalAmount,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in AddRetainedPlayer.",
      error,
      success: false,
    });
  }
};

exports.GetAllOwnersDetails = async (req, res) => {
  try {
    const owners = await OwnerSchema.find({
      games: req.params.gameId,
    }).populate(["games", "series", "ownerId"]);

    res.status(200).json({
      message: "GetAllOwnersDetails created.",
      owners,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in GetAllOwnersDetails.",
      error,
      success: false,
    });
  }
};

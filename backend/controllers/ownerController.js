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

    owner.pointsSpent.push({
      spentType : "RETAINEDPLAYER",
      spentAmount : originalAmount,
      pointsLeft : owner.pointsLeft,
      spentDetail : players.playerName
    })

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
    const { ownerId, teamName, gameId, teamBoughtForAmount } = req.body;
    console.log(teamList, ownerId, teamName);
    const updateOwner = await OwnerSchema.findById(ownerId);
    const game = await Games.findById(gameId);

    if(teamBoughtForAmount < 100){
      res.status(200).json({
        message: "you can't buy the team for less than 100 points.",
        success: true,
      });
      return;
    }

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
    updateOwner.pointsLeft = updateOwner.pointsLeft - teamBoughtForAmount
    // deduct points from owner's pointsLeft property
    // deduct points from game's ownerPoints property
    // owner pointsSpent array needs to create and then 
    // hit retained and sell player api and sell team api

    game.ownerPoints.forEach((ownerDetail) => {
      if(updateOwner.documentCode === ownerDetail.documentCode){
        ownerDetail.pointsRemaining = ownerDetail.pointsRemaining - teamBoughtForAmount
      }
    })

    updateOwner.pointsSpent.push({
      spentType : "TEAM",
      spentAmount : teamBoughtForAmount,
      pointsLeft : updateOwner.pointsLeft,
      spentDetail : teamName
    })
    
    await updateOwner.save();
    await game.save();

    // const user = await User.findById(owner.ownerId);
    res.status(200).json({
      message: "UpdateTeamOwnerCountry created.",
      updateOwner,
      game,
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

    if(playerBoughtForAmount > owner.pointsLeft){
      owner.totalFantasyPoint = owner.totalFantasyPoint - 300
      owner.fantasyPointDetails.push({
        pointType : "POINTOVERSPENT",
        point : -300,
        totalFantasyPoint : owner.totalFantasyPoint,
        matchNumber : ''
      })
      await owner.save();
      return res.status(200).json({
        message: "You have spent more points than you have, -300 will be deducted from your fantasy points.",
        success: true,
      });
    }

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

    owner.pointsSpent.push({
      spentType : "AUCTIONPLAYER",
      spentAmount : originalAmount,
      pointsLeft : owner.pointsLeft,
      spentDetail : players.playerName
    })

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

exports.DraftPlayingXI = async (req, res) => {
  try{
    const {playerId, ownerId, playingType} = req.body
    const owner = await OwnerSchema.findById(ownerId).populate("games");
    const game = await Games.findById(owner.games);

    const playerDetail = owner.playersList.filter(
      (ele) => ele.playerId == playerId
    )[0];

    owner.draftPlayerInPlayingXI.push({
      playerId: playerDetail.playerId,
      playerName: playerDetail.playerName,
      playerType: playerDetail.playerType,
      playingStyle : playingType,
      isForeigner: playerDetail.isForeigner,
      isCaptain: false,
      isViceCaptain: false,
    });

    await owner.save();

    res.status(200).json({
      message: "Player added to Draft Playing XI.",
      owner,
      success: true,
    });

  }catch(error){
    res.status(500).json({
      message: "Error in DraftPlayingXI.",
      error : error.message,
      success: false,
    })
  }
}

exports.DraftCaptainAndViceCaptainForPlayingXI = async (req, res) => {
  try{
    const {playerId, ownerId, isCaptain, isViceCaptain } = req.body
    const owner = await OwnerSchema.findById(ownerId).populate("games");
    const game = await Games.findById(owner.games);

    owner.draftPlayerInPlayingXI.forEach((ele) => {
      if(ele.playerId == playerId){
        ele.isCaptain = isCaptain
        ele.isViceCaptain = isViceCaptain
      }
    })

    await owner.save();

    res.status(200).json({
      message: "Captain and vice captain added for DraftCaptainAndViceCaptainForPlayingXI.",
      owner,
      success: true,
    });

  }catch(error){
    res.status(500).json({
      message: "Error in DraftCaptainAndViceCaptainForPlayingXI.",
      error : error.message,
      success: false,
    })
  }
}

exports.CreatePlayingXI = async (req, res) => {
  try {
    const { playerId, ownerId, playingType } = req.body;
    console.log(req.body);
    const owner = await OwnerSchema.findById(ownerId).populate("games");
    const game = await Games.findById(owner.games);

    if(owner.playingXICount == 11) {
      res.status(200).json({
        message: "You can't add more than 11 players in playing XI.",
        success: true,
      });
      return;
    }
    
    let player = owner.playersList.filter(
      (ele) => ele.playerId == playerId
    )[0];

    if(player.isInPlayingXI){
      res.status(200).json({
        message: "Player is already in playing XI.",
        success: true,
      });
      return;
    }

    // (property at game Level) maxBowlerCountInPlayingXI, maxBatsmanCountInPlayingXI, maxAllRounderCountInPlayingXI, maxWicketKeeperCountInPlayingXI
    // (property at game Level) maxPlayerSwapCount, maxCaptainSwapCount, maxViceCaptainSwapCount, maxForeignPlayerCountInPlayingXI, maxIndianPlayerCountInPlayingXI
    if(player.playerType == "BATSMAN"){
      if(owner.playingXIBatsmanCount == game.maxBatsmanCountInPlayingXI){
        res.status(200).json({
          message: "You can't add more than 5 batsman in playing XI.",
          success: true,
        });
        return;
      }
    }else if(player.playerType == "BOWLER"){
      if(owner.playingXIBowlerCount == game.maxBowlerCountInPlayingXI){
        res.status(200).json({
          message: "You can't add more than 5 bowler in playing XI.",
          success: true,
        });
        return;
      }
    }else if(player.playerType == "ALLROUNDER"){
      if(owner.playingXIAllRounderCount == game.maxAllRounderCountInPlayingXI){
        res.status(200).json({
          message: "You can't add more than 2 allrounder in playing XI.",
          success: true,
        });
        return;
      }
    }else if(player.playerType == "WICKETKEEPER"){
      if(owner.playingXIWicketKeeperCount == game.maxWicketKeeperCountInPlayingXI){
        res.status(200).json({
          message: "You can't add more than 1 wicketkeeper in playing XI.",
          success: true,
        });
        return;
      }
    }
    
    if(owner.playingXIForeignPlayerCount == game.maxForeignPlayerCountInPlayingXI){
      res.status(200).json({
        message: "You can't add more than 5 foreign players in playing XI.",
        success: true,
      });
      return;
    }

    if(player.isForeigner){
      owner.playingXIForeignPlayerCount = ++owner.playingXIForeignPlayerCount
    }
    if(player.playerType == "BATSMAN"){
      owner.playingXIBatsmanCount = ++owner.playingXIBatsmanCount;
    } else if(player.playerType == "BOWLER"){
      owner.playingXIBowlerCount = ++owner.playingXIBowlerCount;
    } else if(player.playerType == "ALLROUNDER"){
      owner.playingXIAllRounderCount = ++owner.playingXIAllRounderCount;
    } else if(player.playerType == "WICKETKEEPER"){
      owner.playingXIWicketKeeperCount = ++owner.playingXIWicketKeeperCount;
    }
    owner.playersList.forEach((ele) => {
      if(ele.playerId == playerId){
        ele.isInPlayingXI = true
      }
    })

    owner.playingXICount = ++owner.playingXICount;
    owner.playingXIList.push({
      playerId: player.playerId,
      playerName: player.playerName,
      playerCountry: player.playerCountry,
      playerType: player.playerType,
      isForeigner: player.isForeigner,
    });
    owner.playingXIPlayerId.push(playerId);


    await owner.save();

    res.status(200).json({
      message: "CreatePlayingXI created.",
      owner,
      game,
      success: true,
    });
  }
  catch(error){
    res.status(500).json({
      message: "Error in CreatePlayingXI.",
      error : error.message,
      success: false,
    });

  }
}

exports.SwapPlayer = async (req, res) => {
  try
  {
    const { playerId, ownerId, swapPlayerId } = req.body;
    console.log(req.body);

    const owner = await OwnerSchema.findById(ownerId).populate("games");
    const game = await Games.findById(owner.games);

    let playerIndex = owner.playingXIPlayerId.indexOf(playerId)
    // owner.playingXIPlayerId.remove(playerId)
    owner.playingXIPlayerId[playerIndex] = swapPlayerId
    // owner.playingXIPlayerId.push(swapPlayerId)

    let player = {}
    let swapPlayer = {}

    owner.playersList.forEach((ele) => {
      if(ele.playerId == playerId){
        ele.isInPlayingXI = false
        player = ele
      }
      else if (ele.playerId == swapPlayerId){
        ele.isInPlayingXI = true
        swapPlayer = ele
      }
    })

    const allowedPlayerTypeForWk = game.allowedPlayerTypeForSwap.allowedPlayerTypeForWk
    const allowedPlayerTypeForBowler = game.allowedPlayerTypeForSwap.allowedPlayerTypeForBowler
    const allowedPlayerTypeForBatsman = game.allowedPlayerTypeForSwap.allowedPlayerTypeForBatsman
    const allowedPlayerTypeForAllRounder = game.allowedPlayerTypeForSwap.allowedPlayerTypeForAllRounder

    // const allowedPlayerTypeForWk = ["WICKETKEEPER"]
    // const allowedPlayerTypeForBowler = ["BOWLER", "ALLROUNDER"]
    // const allowedPlayerTypeForBatsman = ["BATSMAN", "ALLROUNDER", "WICKETKEEPER"]
    // const allowedPlayerTypeForAllRounder = ["ALLROUNDER"]

    if(player.playerType == 'WICKETKEEPER' && !allowedPlayerTypeForWk.includes(swapPlayer.playerType))
    {  
      res.status(200).json({
        message: `Invalid swap: Wicketkeeper cannot swap with this player type. ${swapPlayer.playerType}`,
        success: false,
      });
      return;
    }else if(player.playerType == 'BATSMAN' && !allowedPlayerTypeForBatsman.includes(swapPlayer.playerType)){
      res.status(200).json({
        message: `Invalid swap: BATSMAN cannot swap with this player type. ${swapPlayer.playerType}`,
        success: false,
      });
      return;
    }
    else if(player.playerType == 'BOWLER' && !allowedPlayerTypeForBowler.includes(swapPlayer.playerType)){
      res.status(200).json({
        message: `Invalid swap: BOWLER cannot swap with this player type. ${swapPlayer.playerType}`,
        success: false,
      });
      return;
    }
    else if(player.playerType == 'ALLROUNDER' && !allowedPlayerTypeForAllRounder.includes(swapPlayer.playerType)){
      res.status(200).json({
        message: `Invalid swap: ALLROUNDER cannot swap with this player type. ${swapPlayer.playerType}`,
        success: false,
      });
      return;
    }

    if(player.playerType){
      if(allowedPlayerTypeForWk.includes(player.playerType)){
        if(owner.playingXIWicketKeeperCount == game.maxWicketKeeperCountInPlayingXI){
          res.status(200).json({
            message: "You can't add more than 1 wicketkeeper in playing XI.",
            success: true,
          });
          return;
        }
      } else if(allowedPlayerTypeForBowler.includes(player.playerType)){
        if(owner.playingXIBowlerCount == game.maxBowlerCountInPlayingXI){
          res.status(200).json({
            message: "You can't add more than 5 bowler in playing XI.",
            success: true,
          });
          return;
        }
      } else if(allowedPlayerTypeForBatsman.includes(player.playerType)){
        if(owner.playingXIBatsmanCount == game.maxBatsmanCountInPlayingXI){
          res.status(200).json({
            message: "You can't add more than 5 batsman in playing XI.",
            success: true,
          });
          return;
        }
      } else if(allowedPlayerTypeForAllRounder.includes(player.playerType)){
        if(owner.playingXIAllRounderCount == game.maxAllRounderCountInPlayingXI){
          res.status(200).json({
            message: "You can't add more than 2 allrounder in playing XI.",
            success: true,
          });
          return;
        }
      }
    }
    // need to add one code where player is a allRounder but playing as batter or bowler code in ownerdb
    // and swapPlayer is a allRounder but playing as batter or bowler code in ownerdb

    let index = -1
    owner.playingXIList.forEach((ele, idx) => {
      if(ele.playerId == playerId){
        index = idx
      }
    })


    if (index !== -1) {
      owner.playingXIList[index] = {
        playerId: swapPlayer.playerId,
        playerName: swapPlayer.playerName,
        playerCountry: swapPlayer.playerCountry,
        playerType: swapPlayer.playerType,
        isForeigner: swapPlayer.isForeigner,
      };
    }

    owner.playerSwaps.push({
      swapType : player.playerType + 'SWAP',
      swapNumber : owner.playerSwaps.length + 1,
      in : swapPlayer.playerName,
      out : player.playerName,
      playerIn : swapPlayer.playerId,
      playerOut : player.playerId,
    })

    await owner.save()

    res.status(200).json({
      message: "SwapPlayer created.",
      owner,
      game,
      success: true,
    });

  }catch(error){
    res.status(500).json({
      message: "Error in SwapPlayer.",
      error : error.message,
      success: false,
    });

  }
}

exports.SwapCaptain = async (req, res) => {
  try
  {

  }catch(error){
    res.status(500).json({
      message: "Error in SwapCaptain.",
      error : error.message,
      success: false,
    });
  }
}

exports.SwapViceCaptain = async (req, res) => {
  try
  {

  }catch(error){
    res.status(500).json({
      message: "Error in SwapCaptain.",
      error : error.message,
      success: false,
    });
  }
}
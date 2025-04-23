exports.createPlayingXIUsingDraftXIHelper = (owner, game) => {
    try {
        var message = []; 
        const draftPlayers = owner.draftPlayerInPlayingXI;

        if(!draftPlayers || draftPlayers.length === 0) {
            message.push('No players found in draft.');
        }

        if(draftPlayers.length < 11) {
            message.push('Not enough players in draft to create playing XI.');
        }

        for (let i = 0; i < draftPlayers.length; i++) {
            const draftPlayer = draftPlayers[i];
            if (!draftPlayer.playerId || !draftPlayer.playerName || !draftPlayer.playerType || !draftPlayer.playingStyle) {
                message.push('Invalid player data in draft.');
                continue;
            }
            if (draftPlayer.playingStyle !== 'BATSMAN' && draftPlayer.playingStyle !== 'BOWLER' && draftPlayer.playingStyle !== 'ALLROUNDER' && draftPlayer.playingStyle !== 'WICKETKEEPER') {
                message.push('Invalid playingStyle in draft.');
                continue;
            }

            const playerId = draftPlayer.playerId;

            let player = owner.playersList.filter(
                (ele) => ele.playerId == playerId
            )[0];

            if (!player) {
                message.push('Player not found in players list.');
                continue;
            }

            if(player.isInPlayingXI) {
                message.push('Player already in playing XI.');
                continue;
            }

            if(player.playerType == "BATSMAN"){
                if(owner.playingXIBatsmanCount == game.gameRules.maxBatsmanCountInPlayingXI && draftPlayer.playingStyle == "BATSMAN"){
                  message.push("You can't add more than 5 batsman in playing XI.");
                  continue;
                }
            }else if(player.playerType == "BOWLER"){
                if(owner.playingXIBowlerCount == game.gameRules.maxBowlerCountInPlayingXI && draftPlayer.playingStyle == "BOWLER"){
                  message.push("You can't add more than 5 bowler in playing XI.");
                  continue;
                }
            }else if(player.playerType == "ALLROUNDER"){
                if(owner.playingXIAllRounderCount == game.gameRules.maxAllRounderCountInPlayingXI && draftPlayer.playingStyle == "ALLROUNDER"){
                  message.push("You can't add more than 2 allrounder in playing XI.");
                  continue;
                }
            }else if(player.playerType == "WICKETKEEPER"){
                if(owner.playingXIWicketKeeperCount == game.gameRules.maxWicketKeeperCountInPlayingXI && draftPlayer.playingStyle == "WICKETKEEPER"){
                  message.push("You can't add more than 1 wicketkeeper in playing XI.");
                  continue;
                }
            }
              
            if(owner.playingXIForeignPlayerCount == game.gameRules.maxForeignPlayerCountInPlayingXI && player.isForeigner){
                message.push("You can't add more than 4 foreign players in playing XI.");
                continue;
            }
          
            if(player.isForeigner){
                owner.playingXIForeignPlayerCount = ++owner.playingXIForeignPlayerCount
            }else {
              owner.playingXIIndianPlayerCount = ++owner.playingXIIndianPlayerCount
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
                if(draftPlayer.isCaptain){
                  ele.isCaptain = true
                }
                if(draftPlayer.isViceCaptain){
                  ele.isViceCaptain = true
                }
                ele.playingType = draftPlayer.playingStyle
              }
            })
        
            owner.playingXICount = ++owner.playingXICount;
            owner.playingXIList.push({
              playerId: player.playerId,
              playerName: player.playerName,
              playerCountry: player.playerCountry,
              playerType: player.playerType,
              isForeigner: player.isForeigner,
              playingType : draftPlayer.playingStyle,
              isCaptain: draftPlayer.isCaptain,
              isViceCaptain: draftPlayer.isViceCaptain,
            });
            owner.playingXIPlayerId.push(playerId);

            if(draftPlayer.isCaptain) {
                owner.captain = {
                    captainId: playerId,
                    captainName: player.playerName,
                }
            }
            if(draftPlayer.isViceCaptain) {
                owner.viceCaptain = {
                    viceCaptainId: playerId,
                    viceCaptainName: player.playerName,
                };
            }

            message.push(`Player ${player.playerName} added to playing XI.`);
      }
        return message;
    } catch (error) {
        console.error(error);
        // throw new Error('Error in creating playing XI.');
        return 'Error in creating playing XI.';
    }
};
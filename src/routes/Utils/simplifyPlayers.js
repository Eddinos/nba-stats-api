const simplifyPlayers = function (playersList) {
  return playersList.map(player => {
    return {
      firstName: player.firstName,
      lastName: player.lastName,
      fullName: `${player.firstName} ${player.lastName}`,
      jersey: player.jersey,
      id: player.personId,
      teamTricode: player.teamData.tricode,
      isAllStar: player.isAllStar,
      position: player.posExpanded,
      heightFeet: parseFloat(player.heightFeet) || 0,
      heightInches: parseFloat(player.heightInches) || 0,
      weight: parseFloat(player.weightPounds) || 0,
      img: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`
    }
  })
}

export default simplifyPlayers;

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
      heightFeet: player.heightFeet,
      heightInches: player.heightInches,
      weight: player.weightPounds,
      img: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`
    }
  })
}

export default simplifyPlayers;

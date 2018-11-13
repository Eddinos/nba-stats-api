const simplifyPlayers = function (teamsList) {
  return teamsList.reduce((acc, curr) => {
	   return acc.concat(curr.teams.map(team => ({
       ...team.profile,
       tricode: team.profile.abbr,
       fullName: `${team.profile.city} ${team.profile.name}`,
       logo: `https://www.nba.com/assets/logos/teams/primary/web/${team.profile.abbr}.svg`
     })))
   }, [])
}

export default simplifyPlayers;

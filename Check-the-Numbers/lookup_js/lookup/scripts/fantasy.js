$(function () {
  $.ajax({
    type: 'GET',
    url: 'https://statsapi.web.nhl.com/api/v1/teams',
    success: function(copyrightAndTeams) {
      $.each(copyrightAndTeams, function (index, team) {
        if (index == "teams") {
          var teamsSelector = $('[name="teamsSelector"]');
          teamsSelector.append($('<option value="EMPTY">TEAM NAME</option>'));
          for (var i = 0; i < team.length; i++) {
            teamsSelector.append($('<option value="' + team[i].id + '">'+ team[i].name + '</option>'));
          }
        }
      });
    }
  });
});

function getRoster() {
  var selectedTeam = $('[name="teamsSelector"]').val();
  if (selectedTeam == "EMPTY") {
    return;
  }

  var playerSelector = $('[name="playerSelector"]');
  playerSelector.empty();
  $.ajax({
    type: 'GET',
    url: 'https://statsapi.web.nhl.com/api/v1/teams/' + selectedTeam + '/roster/',
    success: function(copyrightAndRoster) {
      $.each(copyrightAndRoster, function (index, player) {
        if (index == "roster") {
          playerSelector.append($('<option value="EMPTY">PLAYER NAME</option>'));
          for (var i = 0; i < player.length; i++) {
            playerSelector.append($('<option value="' + player[i].person.id + '">'+ player[i].person.fullName + '</option>'));
          }
        }
      });
    }
  });
}

function getStats() {
  var selectedPlayer = $('[name="playerSelector"]').val();
  if (selectedPlayer == "EMPTY") {
    return;
  }
  $.ajax({
    type: 'GET',
    url: 'https://statsapi.web.nhl.com/api/v1/people/' + selectedPlayer + '/stats?stats=statsSingleSeason',
    success: function(copyrightAndStats) {
      $.each(copyrightAndStats, function (index, stats) {
        if (index == "stats") {
          var playerStats = {};
          var headerText = "Fantasy Score: ";
          playerStats['goals'] = stats[0].splits[0].stat.goals;
          if (playerStats['goals'] != null) {
            playerStats['assists'] = stats[0].splits[0].stat.assists;
            playerStats['shots'] = stats[0].splits[0].stat.shots;
            playerStats['powerPlayPoints'] = stats[0].splits[0].stat.powerPlayPoints;
            playerStats['hits'] = stats[0].splits[0].stat.hits;
            playerStats['blocked'] = stats[0].splits[0].stat.blocked;
            headerText += calculateSkaterScore(playerStats);
          } else {
            playerStats['wins'] = stats[0].splits[0].stat.wins;
            playerStats['goalsAgainst'] = stats[0].splits[0].stat.goalsAgainst;
            playerStats['saves'] = stats[0].splits[0].stat.saves;
            playerStats['shutouts'] = stats[0].splits[0].stat.shutouts;
            headerText += calculateGoalieScore(playerStats);
          }

          $('[name="fantasyScore"]').text(headerText);
        }
      });
    }
  });
}

function calculateSkaterScore(playerStats) {
  var totalScore = 0;
  totalScore += playerStats['goals'] * 3;
  totalScore += playerStats['assists'] * 2;
  totalScore += playerStats['shots'] * 0.5;
  totalScore += playerStats['powerPlayPoints'] * 0.5;
  totalScore += playerStats['hits'] * 1;
  totalScore += playerStats['blocked'] * 0.5;
  return Math.round(totalScore * 100) / 100;
}

function calculateGoalieScore(playerStats) {
  var totalScore = 0;
  totalScore += playerStats['wins'] * 5;
  totalScore += -1 * (playerStats['goalsAgainst'] * 0.1);
  totalScore += playerStats['saves'] * 0.2;
  totalScore += playerStats['shutouts'] * 2;
  return Math.round(totalScore * 100) / 100;
}

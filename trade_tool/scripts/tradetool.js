var client = [8474068, 8478400, 8474884, 8475913, 8480801, 8478550, 8474578, 8478469, 8471679, 8476412];
var team1 = [8478402, 8475791, 8471685, 8477503, 8476539, 8470638, 8470612, 8466141, 8474034, 8474586];
var team2 ;
var addremove;
var tradeclient = [];
var tradeother = [];
var team;

$(function () {

  var teamsSelector = $('[name="teamsSelector"]');


  teamsSelector.append($('<option value="EMPTY">TEAM NAME</option>'));
  teamsSelector.append($('<option value="1">1</option>'));

  //teamsSelector.append($('<option value="EMPTY">2</option>'));
  //teamsSelector.append($('<option value="EMPTY">3</option>'));
  //teamsSelector.append($('<option value="EMPTY">4</option>'));
});

function addorremove(option){
  if (option == 0){
    addremove = 0;

    var element = $("#" + 'add');
    element.remove();

    $('.trade').append($('<div id = "add"><option>Add Player</option></div>'));

    var element1 = $("#" + 'remove');
    element1.remove();
  }
  if (option == 1){
    addremove = 1;

    var element = $("#" + 'remove');
    element.remove();

    $('.trade').append($('<div id = "remove"><option>Remove Player</option></div>'));

    var element1 = $("#" + 'add');
    element1.remove();
  }
}

function createUserList(){
  for (var i = 0; i < client.length; i++){
      $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+client[i],
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                  $('.userteam').append($('<div id="'+ player[0].id +'"><button Onclick="playerClicked('+player[0].id+', 0)">' + player[0].fullName + '</button></div>'))
              }
            });
          }
      });    
  }
}

function createList(team){
  for (var i = 0; i < team.length; i++){
      $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+team[i],
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                  $('.otherteam').append($('<div id="'+ player[0].id +'"><button Onclick="playerClicked('+player[0].id+', 1)">' + player[0].fullName + '</button></div>'))
              }
            });
          }
      });    
  }
}

function getTeam(){
  var selectedTeam = $('[name="teamsSelector"]').val();
  if (selectedTeam == "EMPTY") {
    return;
  }

  if (selectedTeam == '1'){
    team = team1;
    createList(team);
  }

}

function playerClicked(id, check){

  if (addremove == 0){ 

    if (check == 0){

      if (tradeclient.includes(id) == false){

        var element = $("#" + id);
        element.remove();

        tradeclient.push(id);

        $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                $('.usertrade').append($('<div id="'+ id +'" Onclick="playerClicked('+id+', 0)"><button>' + player[0].fullName + '</button></div>'));
              }
            });
          }
        });
      }
    }

    if (check == 1){

      if (tradeother.includes(id) == false){

        var element = $("#" + id);
        element.remove();

        tradeother.push(id);

        $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                $('.othertrade').append($('<div id="'+ id +'" Onclick="playerClicked('+id+', 1)"><button>' + player[0].fullName + '</button></div>'));
              }
            });
          }
        });
      }
    }

  }


  if (addremove == 1){ 

    if (check == 0){

      if (tradeclient.includes(id) == true){

        var element = $("#" + id);
        element.remove();

        tradeclient.splice(tradeclient.indexOf(id), 1); 

        $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                $('.userteam').append($('<div id="'+ id +'" Onclick="playerClicked('+id+', 0)"><button>' + player[0].fullName + '</button></div>'));
              }
            });
          }
        });
      }
    }

    if (check == 1){

      if (tradeother.includes(id) == true){

        var element = $("#" + id);
        element.remove();

        tradeother.splice(tradeother.indexOf(id), 1 ); 

        $.ajax({
          type: 'GET',
          url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
          success: function(copyrightAndStats) {
            $.each(copyrightAndStats, function (index, player) {
              if (index == "people") {
                $('.otherteam').append($('<div id="'+ id +'" Onclick="playerClicked('+id+', 1)"><button>' + player[0].fullName + '</button></div>'));
              }
            });
          }
        });
      }
    }

  }



}


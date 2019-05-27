var team = [8474068, 8478400, 8474884, 8475913, 8480801, 8478550, 8474578, 8478469, 8471679, 8476412];
var dress;
var dressed = [];
var benched = [];

function benchordress(option){
  if (option == 0){
    dress = 0;

    var element = $("#" + 'dress');
    element.remove();

    $('.option').append($('<div id = "dress"><option>Dress Player</option></div>'));

    var element1 = $("#" + 'bench');
    element1.remove();
  }
  if (option == 1){
    dress = 1;

    var element = $("#" + 'bench');
    element.remove();

    $('.option').append($('<div id = "bench"><option>Bench Player</option></div>'));

    var element1 = $("#" + 'dress');
    element1.remove();
  }
}

function createList(){
    for (var i = 0; i < team.length; i++){
        $.ajax({
            type: 'GET',
            url: 'https://statsapi.web.nhl.com/api/v1/people/'+team[i],
            success: function(copyrightAndStats) {
              $.each(copyrightAndStats, function (index, player) {
                if (index == "people") {
                    $('.playerList').append($('<div id="'+ player[0].id +'"><button Onclick="playerClicked('+player[0].id+')">' + player[0].fullName + '</button></div>'))
                }
              });
            }
        });    
    }
}

function playerClicked(id){

  if (dress==0){ // if dressed function is on


    if (dressed.includes(id) == false){

      var element = $("#" + id);
      element.remove();

      dressed.push(id);

      benched.splice(0, id);


      $.ajax({
        type: 'GET',
        url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
        success: function(copyrightAndStats) {
          $.each(copyrightAndStats, function (index, player) {
            if (index == "people") {
              $('.dressed').append($('<div id="'+ id +'" Onclick="playerClicked('+id+')"><button>' + player[0].fullName + '</button></div>'));
            }
          });
        }
      });
    }
  }

  if (dress == 1){ // if benched function is on
    if (benched.includes(id) == false){

      var element = $("#" + id);
      element.remove();


      benched.push(id);

      //if (dressed.includes(id) == true){
        dressed.splice(0, id);

      //}

      $.ajax({
        type: 'GET',
        url: 'https://statsapi.web.nhl.com/api/v1/people/'+id,
        success: function(copyrightAndStats) {
          $.each(copyrightAndStats, function (index, player) {
            if (index == "people") {
              $('.benched').append($('<div id="'+ id +'" Onclick="playerClicked('+id+')"><button>' + player[0].fullName + '</button></div>'));
            }
          });
        }
      });

    }
  }
}

function checklineup(){ //check if lineup is correct

  var defense = [];
  var wing = [];
  var center = [];
  var goalie = [];

  for (var i = 0; i < dressed.length; i++){

    $.ajax({
      type: 'GET',
      url: 'https://statsapi.web.nhl.com/api/v1/people/' + dressed[i],
      success: function(copyrightAndStats) {
        $.each(copyrightAndStats, function (index, player) {
          if (index == "people") {

            if(player[0].primaryPosition.code == "L")
            {
              $('.submit').append($('<div id>'+player[0].primaryPosition.code+'</div>'));
            }

            if(player[0].primaryPosition.code == "R")
            {
              $('.submit').append($('<div id>'+player[0].primaryPosition.code+'</div>'));
            }

            if(player[0].primaryPosition.code == "C")
            {
              $('.submit').append($('<div id>'+player[0].primaryPosition.code+'</div>'));
            }

            if(player[0].primaryPosition.code == "D")
            {
              $('.submit').append($('<div id>'+player[0].primaryPosition.code+'</div>'));
            }

            if(player[0].primaryPosition.code == "G")
            {
              $('.submit').append($('<div id>'+player[0].primaryPosition.code+'</div>'));
              goalie.push(1)
            }

            //$('.submit').append($('<div id>'+goalie[0]+'</div>'));
          }
        });
      }
    });
  }

  if (goalie[0] == 1){
    $('.submit').append($('<div id>'+goalie[0]+'</div>'));
  }
}

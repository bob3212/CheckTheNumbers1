//io.on('connection', function(socket){
//});

// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 


app.use(express.static(__dirname + '/public')); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});


let players = [];
let current_turn = 0;
let timeOut;
let _turn = 0;
const MAX_WAITING = 5000;
var drafted = [];
var teams = {};


function next_turn(){
   _turn = current_turn++ % players.length;
   players[_turn].emit('your_turn');
   console.log("next turn triggered " , _turn);
   triggerTimeout();
}

function triggerTimeout(){
  timeOut = setTimeout(()=>{
    next_turn();
  },MAX_WAITING);
}

function resetTimeOut(){
   if(typeof timeOut === 'object'){
     console.log("timeout reset");
     clearTimeout(timeOut);
   }
}

function string(){
  draftedjson = JSON.stringify(drafted);
  //
  console.log(draftedjson);
}

io.on('connection', function(client) {  
  var sessionid = client.id;
  console.log(sessionid);
  console.log('A player connected');
  var ids = [];

  teams[sessionid] = ids; //creates object array for client

  players.push(client);

  //sends list of drafted players to client on connection
//  io.emit('drafted', draftedjson);

  //sends client updated list upon connection
  client.on('list', function(data){
    for (var i = 0; i < drafted.length; i++){
      client.emit('buttonUpdate', drafted[i]);
    }
  });

  client.on('stupid', function(list){
    console.log(list)
  });

	//when the server receives clicked message, do this
  client.on('clicked', function(pick) {
    if(players[_turn] == client){
      //update all draft boards
      io.emit('buttonUpdate', pick);
      drafted.push(pick);

      ids.push(pick);
      teams[sessionid] = ids; //update object array

      client.emit('showteam', pick);
      console.log(teams);

      io.emit('displayPick', pick, sessionid);

      string();
      //adds ID to drafted player list
      console.log(pick);
      resetTimeOut();
      next_turn();
    }
    else{
      console.log("not players turn");
    }
  })

  client.on('disconnect', function(data){
    console.log('A player disconnected');
    players.splice(players.indexOf(client),1);
    _turn--;
    console.log("A number of players now ",players.length);
  });

});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 
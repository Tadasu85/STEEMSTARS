var io = require('socket.io').listen(5001),
    redis_global = require('redis').createClient();
    cookie = require("cookie");

io.configure(function (){
  io.set('authorization', function (data, callback) {
    console.log("CHECKING AUTHORIZATION")
    if (data.headers.cookie) {

      data.cookie = cookie.parse(data.headers.cookie);
      data.sessionID = data.cookie['_validation_token_key'];

      // retrieve session from redis using the unique key stored in cookies
      redis_global.hget(["mySessionStore", data.sessionID], function (err, session) {

        if (err || !session) {
          return callback('Unauthorized user', false);
        } else {
          // store session data in nodejs server for later use
          data.session = JSON.parse(session);
          return callback(null, true);
        }

      });

    } else {
      return callback('Unauthorized user', false);
    }
  });
});

var users = {};
var clients = {};

io.sockets.on('connection', function(socket){
  var hs = socket.handshake,
      user_id = hs.session['user_id'],
      redis_client = require('redis').createClient();
      
  users[hs.session.username] = socket.id;
  clients[socket.id] = socket;
      
  redis_client.subscribe('node-rails-change/'+user_id);
  console.log(user_id+" GOT A IO CONNECTION")
  redis_client.on('message', function(channel, message){
    console.log(user_id+" GOT A REDIS MESSAGE")
    console.log("CHANNEL = "+channel)
    console.log("MESSAGE = "+message)
    socket.emit('node-rails-change/'+user_id, JSON.parse(message));
  });
  
  redis_client.on('node-rails-change/'+user_id, function(channel, message){
    console.log(user_id+" GOT A node-rails-change EVENT")
    console.log("CHANNEL = "+channel)
    console.log("MESSAGE = "+message)
    // socket.send('node-rails-change', JSON.parse(message));
  });
  
  socket.on('message', function(channel, message){
    console.log(user_id+" GOT A SOCKET MESSAGE")
    console.log("CHANNEL = "+channel)
    console.log("MESSAGE = "+message)
  });
  
  socket.on('node-rails-change/'+user_id, function(data){
    console.log(user_id+" GOT A node-rails-change EVENT")
    console.log("data = ")
    console.log(data)
  });
  
  socket.on('disconnect', function(){
    delete clients[socket.id]; // remove the client from the array
    delete users[hs.session.username]; // remove connected user & socket.id
  });
  
  // we want at some point to send a message to user 'alex'
  // if (users['alex']) {
    // we get the socket.id for the user alex
    // and with that we can sent him a message using his socket (stored in clients)
    // clients[users['alex']].emit("Hello Alex, how've you been");
  // }
});
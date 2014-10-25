var actions = {
  '/name': "nameChange",
  '/room': "roomChange"
}

var getInput = function () {
  var message = $('.message').val(); 
  return message;
}

var submitMessage = function (chat) {
  var msg = getInput();
  var arr = msg.split(' ');
  if (msg[0]==='/') {
    chat.socket.emit(actions[arr[0]], {name:arr[1]});
  } else {
    chat.sendMessage(msg);
  }
}

$(document).ready(function() {
  var socket = io(); 
  var chat = chat || new window.Chat(socket);
  
  chat.socket.on('nameChangeResponse', function (data) {
    $('.display').append( "<p> name changed to: " + data.name +'</p>');   
  });
  
  chat.socket.on('msgSent',function(data){
    $('.display').append( "<p>" + data.name + ": " + data.text + '</p>');   
  });

  chat.socket.on('roomChangeRes', function(data){
    $('.display').append("<p>You have joined room: " + data.room + "</p>");
  })

  $('form').on('submit', function(event) {
    event.preventDefault();
    submitMessage(chat);
  });
});
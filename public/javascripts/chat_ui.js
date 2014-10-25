var getInput = function () {
  var message = $('.message').val(); 
  return message;
}

var submitMessage = function (chat) {
  var msg = getInput()
  var arr = msg.split(' ');
  if (arr[0]==='/nick') {
    chat.socket.emit('nameChange', {name:arr[1]});
  } else {
    chat.sendMessage(msg);
  }
}

$(document).ready(function() {
  var socket = io(); 
  var chat = chat || new window.Chat(socket);
  chat.socket.on('nameChangeResponse', function (data) {
    console.log(data.name);
  })
  chat.socket.on('msgSent',function(data){
    $('.display').append( "<p>" + data.name + ": " + data.text + '</p>');   
  })

  $('form').on('submit', function(event) {
    event.preventDefault();
    submitMessage(chat);
  });
});
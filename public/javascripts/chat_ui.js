

var getInput = function () {
  var message = $('.message').val(); 
  return message;
}

var submitMessage = function (chat) {
  var msg = getInput()
  chat.sendMessage(msg);
}

$(document).ready(function() {
  var socket = io(); 
  var chat = chat || new window.Chat(socket);
  chat.socket.on('msgSent',function(data){
    $('.display').append("<p>" + data.text + '</p>');   
  })
  $('form').on('submit', function(event) {
    event.preventDefault();
    submitMessage(chat);
  });
});
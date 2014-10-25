

var getInput = function () {
  var message = $('.message').val(); 
  return message;
}

var submitMessage = function (chat) {
  var msg = getInput()
  chat.sendMessage(msg);
  $('.display').append("<p>" + msg + '</p>');
}

$(document).ready(function() {
  var socket = io(); 
  var chat = chat || new window.Chat(socket);
  $('form').on('submit', function(event) {
    event.preventDefault();
    submitMessage(chat);
  });
});
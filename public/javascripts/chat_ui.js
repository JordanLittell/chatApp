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
  
  var logRoom = function(data) {
    $('.display').append("<div class='message-box'>A user joined room: " + data.room + "</div>");
    $('.room').html(data.room);  
  }

  chat.socket.on('nameChangeResponse', function (data) {
    $('.name').text(data.name);   
  });
  
  chat.socket.on('msgSent',function(data){
    $('.display').append( "<div class='message-box'>" + '<span class="username">'+data.name + "</span>: " + data.text + '</div>');   
  });

  chat.socket.on('roomChangeRes', function(data){
    var roomIncluded = false;
    logRoom(data);
    chat.chatRooms.forEach(function(room){
      if(room === data.room) {
        roomIncluded = true;
      }
    })

    if(!roomIncluded) {
      chat.chatRooms.push(data.room);
      $('#chat-rooms').append('<li data-room =' + data.room + ">" + data.room.toUpperCase() + '</li>');  
      $('li').click(function(event){
        var room = $(event.currentTarget).text();
        chat.socket.emit("switchRoom", { name: room.toLowerCase() });  
      })
    }
  });

  chat.socket.on('roomSwitchRes', function(data) {
    logRoom(data);
  })
  $('form').on('submit', function(event) {
    event.preventDefault();
    submitMessage(chat);
    $('.message').val("");
  });
});
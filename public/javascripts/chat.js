if (typeof window.Chat === 'undefined') {
  function Chat(socket) {
    this.socket = socket,
    this.sendMessage = function (message) {
      this.socket.emit('message',{text: message});
    }
    this.chatRooms = [];
  }  
}

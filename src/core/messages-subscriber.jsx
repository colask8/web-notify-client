import Listener from './message-listener';

class MessagesSubscriber {

  constructor(room) {
    this.room = room;
  }

  room = null;
  listeners = [];

  isRoom(room) {
    if (this.room === room) {
      return this;
    }
    return null;
  }

  // addMessage(msg) {
  //   this.messages.push(msg);
  //   broadcastMessage(msg);
  // }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  broadcastMessage(msg) {
    if(this.listeners.length > 0) {
      this.listeners.forEach( l => {
        l.readMessage(msg);
      });
    }
  }

}


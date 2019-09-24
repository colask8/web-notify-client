// import Listener from './message-listener';

export default class MessagesSubscriber {
  constructor(room) {
    this.room = room
  }

  // room;
  // listeners;
  room = null;
  listeners = [];

  isRoom(room) {
    if (this.room === room) {
      return this
    }
    return null
  }

  // addMessage(msg) {
  //   this.messages.push(msg);
  //   broadcastMessage(msg);
  // }

  subscribe(listener) {
    this.listeners.push(listener)
  }

  broadcastMessage(msg) {
    console.log(msg);
    if (this.listeners.length > 0) {
      this.listeners.forEach(l => {
        if (typeof l.onReadMessage === 'function') {
          l.onReadMessage(msg)
        }
      })
    }
  }
}

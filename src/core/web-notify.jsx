import io from 'socket.io-client'
// import {React} from 'react'
import MessageSubscriber from './messages-subscriber.jsx'

class WebNotify {
  static instance = null;
  static system = null;
  state = {};
  url = null;
  path = null;
  name = null;

  constructor() {
    this.state = {
      subscribers: {}
    };

    if (!WebNotify.instance) {
      WebNotify.instance = this;
    }

    return WebNotify.instance;
  }

  addSocket(url=null, path=null,name=null) {
    let self = this;
    this.name = name;
    this.broadcast.bind(this);
    if (!url) {
      // eslint-disable-next-line no-restricted-globals
      this.url = location.protocol + '//' + location.host + '/wsock';
      this.path = path || '/apps/stream';
    } else {
      this.url = url;
      this.path = path || '/apps/stream';
    }

    console.log(this.url);

    this.system = io.connect(this.url, { path });

    // Listen to push notifications
    this.system.on('push', function (msg) {
      self.broadcast(msg.data);
    });

    // Listen when push notification is sent and read/display data
    this.system.on('output', function (data) {
      const { room, message } = data;
      console.log(data['room']);
      console.log(data);
      self.broadcast(data.room, message);
    });
  }

  static getInstance() {
    if (WebNotify.instance == null) {
      console.log('havent found instance');
      WebNotify.instance = new WebNotify();
    }
    console.log('returning instance');
    return this.instance
  }

  broadcast(room, message) {
    console.log(this.print());
    if (room in this.state['subscribers']) {
      let subscriber = this.state['subscribers'][room]
      console.log(typeof subscriber);

      subscriber.broadcastMessage(message);
    }
    // const { messages } = this.state;
    // let temp = messages;
    // temp.prepend(data);
    // this.setState({
    //   messages: temp
    // });
  }

  print() {
    return (JSON.stringify(this.state) + ' ' + this.name)
  }

  joinRoom(room, listener = null) {
    console.log('joining room' + room);
    const {subscribers} = this.state
    let tempSubs = subscribers
    let newSub = new MessageSubscriber(room)

    if (listener) {
      newSub.subscribe(listener)
    }

    console.log(tempSubs);
    tempSubs = {
      ...tempSubs,
      [room]: newSub
    }
    console.log(tempSubs);
    this.state['subscribers'] = tempSubs;
    console.log('new state: ' + this.print());
    this.system.emit('join', {room: room});
  }

  subscribe(room, listener) {
    const { subscribers } = this.state;
    let tempSubs = subscribers
    console.log('subscribing ' + listener.room + ' ' + listener);
    if (!(room in tempSubs)) {
      this.joinRoom(room, listener);
    }
    if (room in tempSubs) {
      tempSubs[room].subscribe(listener)
      this.state['subscribers'] = tempSubs
    }

  }
}

const instance = new WebNotify()
// Object.freeze(instance)

export default instance

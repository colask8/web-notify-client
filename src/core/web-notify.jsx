import io from 'socket.io-client';
import {React} from 'react';
import MessageSubscriber from './messages-subscriber';

class WebNotify extends React.Component {

  constructor() {
    this.state({
      subscribers: []
    })

    if (!WebNotify.instance) {
      this.url = location.protocol + '//' + location.host + '/wsock';
      this.system = io.connect(this.url);
      WebNotify.instance = this;
    }

    return WebNotify.instance;
  }

  static instance = null;
  static system = null;
  url = null;

  static getInstance() {
    if (WebNotify.instance == null) {
      WebNotify.instance = new WebNotify();
    }

    return this.instance;
  }

  broadcast(room, message) {

    let subscriber = this.state.subscribers[room];

    subscriber.broadcastMessage(message);

    // const { messages } = this.state;
    // let temp = messages;
    // temp.prepend(data);
    // this.setState({
    //   messages: temp
    // });
  }

  joinRoom(room, listener=null) {
    const {subscribers} = this.state;
    let tempSubs = subscribers;
    let newSub = MessageSubscriber(room);
    
    if (listener) {
      newSub.subscribe(listener);
    }
    
    tempSubs = {
      ...tempSubs,
      [room]: newSub
    }
    
    this.setState({subscribers: tempSubs}, () => {
      this.system.emit('join', {room: room});
    });
  }

  subscribe(room, listener) {
    const { subscribers } = this.state;
    let tempSubs = subscribers;

    if (room in tempSubs) {
      tempSubs[room].subscribe(listener);
    }

    this.setState({subscribers: tempSubs});

  }

  componentDidMount() {
    
    this.system.on('push', function (msg) {
      broadcast(msg.data);
    });

    this.system.on('output', function (data) {
      const {room, message} = data;
      broadcast(room, message)
    });
  }

}

const instance = new WebNotify();
Object.freeze(instance);

export default instance;
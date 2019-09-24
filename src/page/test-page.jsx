import Listener from '../core/message-listener.jsx'
import React from 'react'
import WebNotify from '../core/web-notify.jsx'
import axios from 'axios';

class TestListener extends Listener {
  room = null;
  state = null;
  msgToState = null;

  constructor(room = null, state = null, msgToState = null) {
    super()
    this.messages = [];
    this.room = room;
    this.state = state;
    this.msgToState = msgToState;

    // console.log("state is: " + state);
  }

  onReadMessage(msg) {
    if (typeof msg !== 'undefined') {
      this.messages.push(msg)
      // console.log(msg)
      // console.log(JSON.stringify(this.state));
      // console.log(this.msgToState);
      if (
        this.msgToState && this.msgToState !== 'undefined'
      ) {
        this.msgToState(msg);
      }

      return msg
    }
  }
}

export default class TestPage extends React.Component {
  listener;// = null;

  constructor() {
    super()
    this.state = {
      messages: []
    }

    this.msgToState = this.msgToState.bind(this);
    this.listener = new TestListener('111', this.state, this.msgToState);
    console.log('listener: '+ this.listener)
  }

  msgToState(message) {
    // console.log(message);

    const { messages } = this.state;

    let msgs = messages;
    msgs.push(message);

    this.setState({messages: msgs});
  }

  componentWillMount() {
    let notifier = WebNotify;
    if (notifier && typeof notifier !== 'undefined') {
      notifier.subscribe(this.listener.room, this.listener)
    }
    axios.get('http://172.17.0.1/api/v1/apps/status-page/all/prod', {headers:{
      'STREAM': 'TRUE'
    }}).then((resp) => {
      // console.log(resp);

      this.msgToState = this.msgToState.bind(this);
      let listener = new TestListener(resp.data['STREAM_ROOM'], this.state, this.msgToState)
      notifier.subscribe(resp.data['STREAM_ROOM'], listener);
    })
    // console.log(notifier);
  }

  render() {
    console.log(this.state);
    const { messages} = this.state;
    return (
      <div>
        Messages: <br/>
        {this.state.messages}
        { messages && messages.length > 0 && messages.map((item, index) => <p key={index}>{item}</p>) }
      </div>
    )
  }
}

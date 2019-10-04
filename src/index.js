// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styles from './styles.css'

import WebNotify from './core/web-notify.jsx';
import MessagesSubscriber from './core/messages-subscriber.jsx';
import MessageListener from './core/message-listener.jsx';
import TestPage from './page/test-page.jsx';

// eslint-disable-next-line no-unused-vars
let notifier = WebNotify;
notifier.addSocket(null, null, "TEESTING");

// export default class ExampleComponent extends Component {
//   render() {
//     return (
//       <div className={styles.test}>
//         IN TEST PAGE
//         <TestPage />
//       </div>
//     )
//   }
// }

export {WebNotify, MessagesSubscriber, MessageListener};

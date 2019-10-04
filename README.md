
# Web Notify Client for Rest2CMD Stream and Portal-Pushify

React Front End Socket.IO modules to use for Rest2CMD and Portal-Pushify applications.

## Installation

    npm install --save web-notify-client

## Components

* WebNotify - Base module to create and open socket connection. *(singleton)*
* MessagesSubscriber - Listener Subscriber, push all messages to room.
* MessageListener - End client *interface* to listen to all messages pushed from server to subscriber. 

## WebNotify

|Property| Description  |
|--------|--------------|
| url    | If specified, it will use it to connect to socket, if not, it will use same hostname |
| path | socket connect path http://hostname/path |
<br/>
<br/>


| Methods| Parameters | Description|
|----|----|------|
|addSocket| <ul><li>url</li><li>path</li></ul> | create and instantiate a socket out of url and path|
| **static** getInstance | None | Returns instance of WebNotify (only one copy is made)
|broadcast | <ul><li>room</li><li>message</li></ul>| broadcast messages to message subscriber
| joinRoom | <ul><li>room</li><li>listener=None</li></ul> | join stream room and subscribe listener to channel|
|subscribe|<ul><li>room</li><li>listener</li></ul>| subscribe listener to channel|

## Message Listener
Interface for receiving stream/notifications.

| Methods| Parameters | Description|
|----|----|------|
|onReadMessage| message | Method invoked when message is received. <br/> Needs unique implementation.

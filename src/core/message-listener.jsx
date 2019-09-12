class Listener {

  constructor() {
    if (this === Listener) {
      throw new TypeError("Can't instantiate abstract class")
    }
  }

  messages = []

  readMessage(msg) {
    if (this === Listener) {
      throw new TypeError("Can't call abstact method!");
    } else if (this.readMessage === Listener.readMessage) {
      throw new TypeError("Implement this method!");
    } else {
      throw new TypeError("Don't call abstact method from child!");
    }
  }

}

export default Listener;
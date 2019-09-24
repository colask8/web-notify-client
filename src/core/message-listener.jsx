class Listener {
  constructor() {
    if (this === Listener) {
      throw new TypeError("Can't instantiate abstract class")
    }
  }

  // messages = []

  onReadMessage(msg) {
    if (this === Listener) {
      throw new TypeError("Can't call abstact method!")
    } else if (this.readMessage === Listener.readMessage) {
      throw new TypeError('Implement this method!')
    } else {
      throw new TypeError("Don't call abstact method from child!")
    }
  }
}

// let constructListener = (f) => {
//   return function(obj) {
//     if (typeof f === 'function') {
//       listener = new Listener();
//     }
//   }
// }

export default Listener

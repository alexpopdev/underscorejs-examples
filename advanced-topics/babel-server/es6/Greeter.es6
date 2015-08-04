/*jshint esnext: true */
export default class Greeter {
  constructor(message) {
    this.message = message;
  }
  getMessage() {
    return "An instance of class " + this.constructor.name + " says: " + this.message;
  }
}
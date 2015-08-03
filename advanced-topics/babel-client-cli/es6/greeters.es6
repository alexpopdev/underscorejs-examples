/*jshint esnext: true */

class Greeter {
  constructor(message) {
    this.message = message;
  }
  getMessage() {
    return "An instance of class " + this.constructor.name + " says: " + this.message;
  }
}

class DerivedGreeter extends Greeter {
  constructor(message) {
    super(message + " !");
  }
}
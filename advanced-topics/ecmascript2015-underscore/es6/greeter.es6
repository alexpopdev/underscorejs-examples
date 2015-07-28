export class Greeter {
  constructor(message) {
    this.name = "Greeter";
    this.message = message;
  }

  getMessage() {
    return "Class " + this.name + " says: " + this.message;
  }
}

export class DerivedGreeter extends Greeter{
  constructor(message) {
super(message);
  }
}

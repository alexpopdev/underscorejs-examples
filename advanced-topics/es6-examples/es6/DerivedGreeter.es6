/*jshint esnext: true */
import Greeter from './Greeter';

export default class DerivedGreeter extends Greeter {
  constructor(message) {
    super(message + " !");
  }
}
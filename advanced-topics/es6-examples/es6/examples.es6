/*jshint esnext: true */
import _ from "underscore";
import DerivedGreeter from './DerivedGreeter';

export function getDerivedGreeterMessage() {
  let aGreeter = new DerivedGreeter("Hello world");
  let message = aGreeter.getMessage();
  return message;
}

export function getSetSize() {
  let aSet = new Set([10, 20, 30, 40, 50, 10, 20, 30]);
  var arrayFromSet = Array.from(aSet);
  var size = _.size(arrayFromSet);
  return "The example set size is: " + aSet.size + ". The example set size calculated with underscore is: " + size;
}
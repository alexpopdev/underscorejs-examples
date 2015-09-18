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

export function functionUsingRestOperator(argsNo, ...otherArgs) {
  if (otherArgs.length + 1 !== argsNo) {
    return "Incorrect number of required arguments. Expected " + argsNo + " and " + arguments.length + " were supplied.";
  }

  if (arguments.length < 2) {
    return "Too few arguments were supplied.";
  }

  return arguments.length;
}
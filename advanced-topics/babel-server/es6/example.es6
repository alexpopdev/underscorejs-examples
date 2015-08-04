/*jshint esnext: true */
import DerivedGreeter from './DerivedGreeter';

import _ from "underscore";

export let name = "example";

export default function getExampleOutput() {
  let aGreeter = new DerivedGreeter("Hello world");
  let message = aGreeter.getMessage();

  let aSet = new Set([10, 20, 30, 40, 50, 10, 20, 30]);
  var arrayFromSet = Array.from(aSet);
  var size = _.size(arrayFromSet);
  return message + ". The example set size is: " + aSet.size + ". The example set size calculated with underscore is: " + size;
}
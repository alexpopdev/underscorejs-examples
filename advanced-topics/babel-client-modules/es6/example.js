/*jshint esnext: true */
import DerivedGreeter from 'DerivedGreeter';

export default function getExampleOutput() {
  let aGreeter = new DerivedGreeter("Hello world");
  let message = aGreeter.getMessage();

  let aSet = new Set([10, 20, 30, 40, 50, 10, 20, 30]);
  return message + "<br /> The example set size is " + aSet.size;
}
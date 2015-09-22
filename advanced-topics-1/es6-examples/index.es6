/*jshint esnext: true */
import _ from "underscore";
import ArrayAccumulator from './es6/ArrayAccumulator';
import * as examples from './es6/examples';

var arrayAccumulator = new ArrayAccumulator([0, 1, 2, 3, 4], 10);
arrayAccumulator.addToArray(6);
arrayAccumulator.addToArray(1);
arrayAccumulator.addToArray(1);
console.log("The last value stored by ArrayAccumulator is " + _.last(arrayAccumulator.values));

const message = examples.getDerivedGreeterMessage();
console.log("Calling getDerivedGreeterMessage() function returns: " + message);

const setSizeInfo = examples.getSetSize();
console.log("Calling getSetSize() function returns: " + setSizeInfo);
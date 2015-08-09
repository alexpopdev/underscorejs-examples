/*jshint esnext: true */
import _ from "underscore";
import ArrayAccumulator from '../es6/ArrayAccumulator';

describe('Calling addToArray() for ArrayAccumulator', function() {
  var arrayAccumulator = new ArrayAccumulator([0, 1, 2, 3, 4], 10);
  arrayAccumulator.addToArray(6);
  arrayAccumulator.addToArray(1);
  arrayAccumulator.addToArray(1);

  it('sets the correct value for the last element', function() {
    expect(_.last(arrayAccumulator.values)).toBe(10);
  });
});
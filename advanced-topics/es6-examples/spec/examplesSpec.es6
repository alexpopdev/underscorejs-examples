/*jshint esnext: true */

import install from 'jasmine-es6';
install();
import * as examples from '../es6/examples';

describe('examples', function() {
  it('getDerivedGreeterMessage() is correct', function() {
    const message = examples.getDerivedGreeterMessage();
    expect(message).toBe('An instance of class DerivedGreeter says: Hello world !');
  });

  it('getSetSize() is correct', function() {
    const setSizeInfo = examples.getSetSize();
    expect(setSizeInfo).toBe('The example set size is: 5. The example set size calculated with underscore is: 5');
  });
});
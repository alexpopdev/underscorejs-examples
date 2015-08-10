/*jshint esnext: true */
import * as examples from '../es6/examples';

describe('Given examples module', function() {
  it('when calling getDerivedGreeterMessage() then returns the correct result', () => {
    const message = examples.getDerivedGreeterMessage();
    expect(message).toBe('An instance of class DerivedGreeter says: Hello world !');
  });

  it('when calling getSetSize() then returns the correct result', () => {
    const setSizeInfo = examples.getSetSize();
    expect(setSizeInfo).toBe('The example set size is: 5. The example set size calculated with underscore is: 5');
  });

  describe('when calling functionUsingRestOperator()', () => {

    describe('with incorrect number of arguments', () => {
      let result = examples.functionUsingRestOperator(4, {});
      it('then returns the correct message', () => {
        expect(result).toBe("Incorrect number of required arguments. Expected 4 and 2 were supplied.");
      });
    });

    describe('with too few arguments', () => {
      let result = examples.functionUsingRestOperator(1);
      it('then returns the correct message', () => {
        expect(result).toBe("Too few arguments were supplied.");
      });
    });

    describe('with correct number of arguments', () => {
      let result = examples.functionUsingRestOperator(4, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      });

      it('then returns the argument length', () => {
        expect(result).toBe(4);
      });
    });

    describe('with the spread operator', () => {
      let argsArray = [4, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }];

      let result = examples.functionUsingRestOperator(...argsArray);

      it('should return the argument length', () => {
        expect(result).toBe(4);
      });
    });
  });
});
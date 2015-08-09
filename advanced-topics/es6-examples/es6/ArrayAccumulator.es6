/*jshint esnext: true */
export default class ArrayAccumulator {
  constructor(seedArray, maxValue) {
    this.values = seedArray;
    this.maxValue = maxValue;
  }
  addToArray(addedValue) {
    this.values.forEach((value, index) => {
      if (value >= this.maxValue) {
        return;
      }
      value += addedValue;
      this.values[index] = value;
    });
  }
}
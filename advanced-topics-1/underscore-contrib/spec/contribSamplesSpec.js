describe("Given contribSamples", function() {

  describe("when calling concatenateArrays()", function() {
    var result = contribSamples.concatenateArrays(1, [5, , 64], null, [5,6,7], [1, , 2, null, 3], 99);

    it("then it returns an array of the correct length", function() {
      expect(result.length).toEqual(8);
    });

    it("then it returns an array with the correct first and last element", function() {
      expect(_.first(result)).toEqual(1);
      expect(_.last(result)).toEqual(99);
    });
  });
});

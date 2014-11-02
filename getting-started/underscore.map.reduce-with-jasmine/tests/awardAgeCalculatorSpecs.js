describe("awardAgeCalculator", function() {

  describe("when calling getPeopleWithAwardAge()", function() {
    var peopleWithAwardAge;

    beforeEach(function() {
      peopleWithAwardAge = awardAgeCalculator.getPeopleWithAwardAge(awardAgeCalculator.getPeople);
    });

    it("should calculate the age of the first person correctly", function() {
      expect(peopleWithAwardAge[0].awardAge).toEqual(56);
    });

    it("should calculate the age of the last person correctly", function() {
      expect(peopleWithAwardAge[peopleWithAwardAge.length - 1].awardAge).toEqual(69);
    });
  });

  describe("when calling getAverageAwardAge()", function() {
    var aveargeAwardAge = awardAgeCalculator.getAverageAwardAge(awardAgeCalculator.getPeople);

    it("should calculate the average award age correctly", function() {
      expect(Math.floor(aveargeAwardAge)).toEqual(69);
    });
  });
});

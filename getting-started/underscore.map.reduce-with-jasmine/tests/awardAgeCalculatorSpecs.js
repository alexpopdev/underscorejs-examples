describe("awardAgeCalculator", function() {

  describe("when calling getPeopleWithAwardAge()", function() {
    var peopleWithAwardAge;

    beforeEach(function() {
      peopleWithAwardAge = awardAgeCalculator.getPeopleWithAwardAge(awardAgeCalculator.getPeople);
    });

    it("then the award age for the first person should be correct", function() {
      expect(peopleWithAwardAge[0].name).toEqual("Herta Muller");
      expect(peopleWithAwardAge[0].awardAge).toEqual(56);
    });

    it("then the award age of the last person should be correct", function() {
      expect(peopleWithAwardAge[peopleWithAwardAge.length - 1].name).toEqual("Patrick Modiano");
      expect(peopleWithAwardAge[peopleWithAwardAge.length - 1].awardAge).toEqual(69);
    });
  });

  describe("when calling getAverageAwardAge()", function() {
    var aveargeAwardAge = awardAgeCalculator.getAverageAwardAge(awardAgeCalculator.getPeople);

    it("then the average award age should be correct", function() {
      expect(Math.floor(aveargeAwardAge)).toEqual(69);
    });
  });
});

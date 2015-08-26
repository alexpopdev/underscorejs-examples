describe("Given awardAgeCalculator", function() {

  describe(
    "when calling calculateAwardAgeForPeople()",
    function() {
      var people;
      var peopleWithAwardAge;
      beforeEach(function() {
        people = awardAgeCalculator.getPeople();
        peopleWithAwardAge = awardAgeCalculator.calculateAwardAgeForPeople(people);
      });

      it(
        "then the award age for the first person should be correct",
        function() {
          expect(peopleWithAwardAge[0].name).toEqual("Herta Muller");
          expect(peopleWithAwardAge[0].awardAge).toEqual(56);
        });

      it(
        "then the award age of the last person should be correct",
        function() {
          expect(peopleWithAwardAge[peopleWithAwardAge.length - 1].name).toEqual("Patrick Modiano");
          expect(peopleWithAwardAge[peopleWithAwardAge.length - 1].awardAge).toEqual(69);
        });
    });

  describe(
    "when calling getAverageAwardAgeForPeople()",
    function() {
      var people;
      var aveargeAwardAge;
      beforeEach(function() {
        people = awardAgeCalculator.getPeople();
        aveargeAwardAge = awardAgeCalculator.getAverageAwardAgeForPeople(people);
      });

      it("then the average award age should be correct", function() {
        expect(Math.floor(aveargeAwardAge)).toEqual(69);
      });
    });
});
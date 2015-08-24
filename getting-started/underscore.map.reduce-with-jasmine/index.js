$(document).ready(function() {
  var outputContent = "<br />Award age for people:";
  var people = awardAgeCalculator.getPeople();
  _.each(awardAgeCalculator.calculateAwardAgeForPeople(people), function(person) {
    outputContent += "<br />";
    outputContent += " - " + person.name + " was " + person.awardAge + " years old";
  });

  var averageAwardAge = Math.floor(awardAgeCalculator.getAverageAwardAgeForPeople(people));
  outputContent += "<br /><br />" + "Average award age is " + averageAwardAge + " years old.";
  $("#output").html(outputContent);
});
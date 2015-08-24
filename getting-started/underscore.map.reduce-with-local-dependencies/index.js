$(document).ready(function() {
  var outputContent = "<br />Award age for people:";
  _.each(awardAgeCalculator.getPeopleWithAwardAge(), function(person) {
    outputContent += "<br />";
    outputContent += " - " + person.name + " was " + person.awardAge + " years old";
  });

  var averageAwardAge = Math.floor(awardAgeCalculator.getAverageAwardAge());
  outputContent += "<br /><br />" + "Average award age is " + averageAwardAge + " years old.";
  $("#output").html(outputContent);
});
$(document).ready(function() {
  $("#output").html("<br />Award age for people:");
  _.each(awardAgeCalculator.getPeopleWithAwardAge(awardAgeCalculator.getPeople), function(person) {
    var existingContent = $("#output").html();
    var newContent = " - " + person.name + " was " + person.awardAge + " years old";
    $("#output").html(existingContent + "<br />" + newContent);
  });

  $("#output").html($("#output").html() + "<br /><br />" + "Average award age is " + Math.floor(awardAgeCalculator.getAverageAwardAge(awardAgeCalculator.getPeople)) + " years old.");
});

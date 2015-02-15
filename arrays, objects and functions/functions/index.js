$(document).ready(function() {
  var source = {
    id: 2,
    name: "Blue lamp",
    description: null,
    ui: undefined,
    price: 10,
    purchasePrice: 6,
    purchaseDate: new Date(2014, 10, 1),
    isInUse: true,
    getProfit: function() {
      return this.price - this.purchasePrice;
    }
  };

  var extractPropertiesForDisplayWithFinalProperiesCount = _.wrap(
    propertyFormatter.extractPropertiesForDisplay,
    function(func) {
      return function() {
        var result = func.apply(this, arguments);
        result.push("Displayable property count is " + result.length + ".");
        return result;
      };
    })();

  var propertiesForDisplay = extractPropertiesForDisplayWithFinalProperiesCount(source);

  $("#output").html("<h2>Object properties using a _.wrap version of propertyFormatter.extractPropertiesForDisplay:</h2>");

  _.each(propertiesForDisplay, function(line) {
    var existingContent = $("#output").html();
    $("#output").html(existingContent + "<br />" + line);
  }, source);

  var allPropertiesForDisplay = propertyFormatter.extractAllPropertiesForDisplay(source);

  var outputContent = $("#output").html();
  $("#output").html(
    outputContent +
    "<h2>Object properties using propertyFormatter.extractAllPropertiesForDisplay:</h2>" +
    allPropertiesForDisplay);

});
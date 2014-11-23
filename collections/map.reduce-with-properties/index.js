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

  var propertiesForDisplay = propertyFormatter.extractPropertiesForDisplay(source);

  $("#output").html("<br />Object properties:");

  _.each(propertiesForDisplay, function(line){
    var existingContent = $("#output").html();
    $("#output").html(existingContent + "<br />" + line);
  }, source );
});

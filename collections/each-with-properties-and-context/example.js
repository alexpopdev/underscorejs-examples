var example = (function() {
  "use strict";

  var getItem = function() {
    return {
      name: "Blue lamp",
      purchasePrice: 8,
      price: 10,
      getProfit: function(){
        return this.price - this.purchasePrice;
      }
    };
  };

  return {
    inspectItem: function() {
      var item = getItem();
      _.each(item, function(value, key) {
        console.log("Property: " + key + " has value: " + value);
      });
    }
  };
}());

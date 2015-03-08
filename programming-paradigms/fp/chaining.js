(function() {
  "use strict";
  var exampleTitle = "Chaining using arrays";

  var bicycles = [{
    name: "A fast bike",
    type: "Road Bike"
  }, {
    name: "An even faster bike",
    type: "Road Bike"
  }, {
    name: "A springy bike",
    type: "Mountain Bike"
  }, {
    name: "A springier bike",
    type: "Mountain Bike"
  }, {
    name: "An all-terain bike",
    type: "Mountain Bike"
  }, {
    name: "A classy bike",
    type: "Urban Bike"
  }, {
    name: "A modern bike",
    type: "Urban Bike"
  }, {
    name: "A blue bike",
    type: "Children Bike"
  }, {
    name: "A pink bike",
    type: "Children Bike"
  }, {
    name: "A noisy bike",
    type: "Children Bike"
  }, {
    name: "A clown bike",
    type: "Children Bike"
  }];

  var bicycleTypeCountData = bicycles
    .map(function(bicycle) {
      return bicycle.type;
    })
    .filter(function(bicycleType) {
      return bicycleType !== 'Children Bike';
    })
    .reduce(function(bicycleTypeCount, bicycleType) {
      bicycleTypeCount[bicycleType] += 1;
      return bicycleTypeCount;
    }, {
      "Road Bike": 0,
      "Mountain Bike": 0,
      "Urban Bike": 0
    });

  console.log(exampleTitle + " : " + JSON.stringify(bicycleTypeCountData));

}());
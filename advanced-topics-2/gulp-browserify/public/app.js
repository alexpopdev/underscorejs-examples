(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _ = require("underscore");
var Contact = require("./contact.js");
var validations = require("./validations.js");

function Client(id, name, gender, company, email, phone, address, registered, preferredBike, bikePoints, notes) {
  var argsArray = _.toArray(arguments);

  validations.validateArgsLength(11, argsArray);

  validations.validateClientArgs(argsArray);

  Contact.call(this, id, name, gender, company, email, phone, address);
  this.type = 'client';
  this.registered = registered;
  this.preferredBike = preferredBike;
  this.bikePoints = bikePoints;
  this.notes = notes;
}

Client.prototype = Object.create(Contact.prototype);
Client.prototype.constructor = Client;

module.exports = Client;

},{"./contact.js":3,"./validations.js":7,"underscore":9}],2:[function(require,module,exports){
var _ = require("underscore");
var dataProvider = require("./dataProvider.js");
var Contact = require("./contact.js");
var Client = require("./client.js");

var getContacts = function() {
  var clientObjects = dataProvider.getClients();
  return _.map(clientObjects, function(clientObject) {
    if (!clientObject.isActive) {
      return new Contact(
        clientObject.id,
        clientObject.name,
        clientObject.gender,
        clientObject.company,
        clientObject.email,
        clientObject.phone,
        clientObject.address);
    }
    return new Client(
      clientObject.id,
      clientObject.name,
      clientObject.gender,
      clientObject.company,
      clientObject.email,
      clientObject.phone,
      clientObject.address,
      new Date(clientObject.registered),
      clientObject.preferredBike,
      clientObject.bikePoints,
      clientObject.notes
    );
  });
};

exports.getContacts = getContacts;
exports.getClients = function() {
  var contacts = getContacts();
  return _.filter(contacts, function(contact) {
    return contact instanceof Client;
  });
};
exports.getOldestClients = function(count) {
  return _.first(_.sortBy(this.getClients(), 'registered'), count);
};
exports.getBestClients = function(count) {
  return _.first(_.sortBy(this.getClients(), 'bikePoints'), count);
};
},{"./client.js":1,"./contact.js":3,"./dataProvider.js":4,"underscore":9}],3:[function(require,module,exports){
var _ = require("underscore");
var validations = require("./validations.js");

function Contact(id, name, gender, company, email, phone, address) {
  var argsArray = _.toArray(arguments);

  validations.validateArgsLength(7, argsArray);
  validations.validateContactArgs(argsArray);

  this.id = id;
  this.name = name;
  this.gender = gender;
  this.company = company;
  this.email = email;
  this.phone = phone;
  this.address = address;
  this.type = "contact";
}

module.exports = Contact;

},{"./validations.js":7,"underscore":9}],4:[function(require,module,exports){
var getBicycles = function() {
  return [{
    id: 1,
    name: "A fast bike",
    type: "Road Bike",
    quantity: 10,
    rentPrice: 20,
    dateAdded: new Date(2015, 1, 2)
  }, {
    id: 2,
    name: "An even faster bike",
    type: "Road Bike",
    quantity: 4,
    rentPrice: 25,
    dateAdded: new Date(2015, 2, 25)
  }, {
    id: 3,
    name: "A springy bike",
    type: "Mountain Bike",
    quantity: 20,
    rentPrice: 18,
    dateAdded: new Date(2014, 10, 1)
  }, {
    id: 4,
    name: "A springier bike",
    type: "Mountain Bike",
    quantity: 10,
    rentPrice: 22,
    dateAdded: new Date(2014, 4, 1)
  }, {
    id: 5,
    name: "An all-terain bike",
    type: "Mountain Bike",
    quantity: 5,
    rentPrice: 27,
    dateAdded: new Date(2014, 8, 14)
  }, {
    id: 6,
    name: "A classy bike",
    type: "Urban Bike",
    quantity: 30,
    rentPrice: 15,
    dateAdded: new Date(2014, 6, 27)
  }, {
    id: 7,
    name: "A modern bike",
    type: "Urban Bike",
    quantity: 20,
    rentPrice: 17,
    dateAdded: new Date(2015, 1, 19)
  }, {
    id: 8,
    name: "A commuter bike",
    type: "Urban Bike",
    quantity: 12,
    rentPrice: 14,
    dateAdded: new Date(2014, 8, 2)
  }, {
    id: 9,
    name: "A blue bike",
    type: "Children Bike",
    quantity: 25,
    rentPrice: 10,
    dateAdded: new Date(2014, 10, 20)
  }, {
    id: 10,
    name: "A pink bike",
    type: "Children Bike",
    quantity: 25,
    rentPrice: 10,
    dateAdded: new Date(2015, 2, 5)
  }, {
    id: 11,
    name: "A noisy bike",
    type: "Children Bike",
    quantity: 3,
    rentPrice: 12,
    dateAdded: new Date(2014, 8, 23)
  }, {
    id: 12,
    name: "A clown bike",
    type: "Children Bike",
    quantity: 2,
    rentPrice: 12,
    dateAdded: new Date(2014, 11, 1)
  }];
};

var getClients = function() {
  return [{
    "id": 1,
    "name": "Baxter Brooks",
    "gender": "male",
    "company": "DYMI",
    "email": "baxterbrooks@dymi.com",
    "phone": "+1 (820) 572-3418",
    "address": "264 Sharon Street, Hall, Idaho, 7116",
    "registered": "2014-03-15T10:52:05 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 3822,
    "isActive": false,
    "notes": "Sunt labore magna consequat fugiat. Cupidatat occaecat ea laborum officia deserunt sint officia do. Sint consequat commodo aute velit eiusmod quis aliqua aliqua deserunt duis nisi eu aliquip id. Occaecat enim ea minim consequat est et ad ut officia.\r\n"
  }, {
    "id": 2,
    "name": "Vega Gilliam",
    "gender": "male",
    "company": "TALKALOT",
    "email": "vegagilliam@talkalot.com",
    "phone": "+1 (921) 431-2501",
    "address": "103 Chester Court, Twilight, Northern Mariana Islands, 6162",
    "registered": "2014-12-26T21:33:09 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 2987,
    "isActive": true,
    "notes": "Ut aliqua esse ut ullamco officia veniam velit non eu adipisicing. Ex enim sit aliquip incididunt officia veniam anim fugiat pariatur culpa veniam. Aliquip tempor reprehenderit est elit id commodo aliquip ut irure eiusmod ipsum magna esse.\r\n"
  }, {
    "id": 3,
    "name": "Evelyn Obrien",
    "gender": "female",
    "company": "BOLAX",
    "email": "evelynobrien@bolax.com",
    "phone": "+1 (894) 511-3682",
    "address": "604 Strickland Avenue, Matthews, Mississippi, 7348",
    "registered": "2014-06-07T08:14:03 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 4455,
    "isActive": true,
    "notes": "Ea culpa ea dolore ut minim do nostrud amet dolore veniam eu pariatur. Aliquip est tempor nulla pariatur dolor exercitation sit. Nulla esse pariatur et incididunt aliquip ullamco commodo eiusmod irure magna in. Proident ullamco anim eu irure irure ex irure ex eiusmod exercitation commodo voluptate consequat. Ullamco duis et incididunt nulla dolore magna tempor qui.\r\n"
  }, {
    "id": 4,
    "name": "Virgie Glenn",
    "gender": "female",
    "company": "SPHERIX",
    "email": "virgieglenn@spherix.com",
    "phone": "+1 (931) 540-3924",
    "address": "810 Dikeman Street, Aberdeen, Nevada, 9711",
    "registered": "2014-03-03T04:45:09 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3342,
    "isActive": true,
    "notes": "Sit do fugiat esse consequat commodo incididunt ex. Et exercitation elit commodo enim exercitation consectetur culpa officia est excepteur officia proident officia. Ex adipisicing dolore pariatur cupidatat labore. Consequat labore laboris dolore eiusmod sint laborum veniam do cillum ut culpa eiusmod. In dolore adipisicing ea consectetur incididunt enim magna nulla sint do dolore mollit. Cillum dolor velit consectetur aute.\r\n"
  }, {
    "id": 5,
    "name": "Dolly Curry",
    "gender": "female",
    "company": "SONIQUE",
    "email": "dollycurry@sonique.com",
    "phone": "+1 (879) 485-3443",
    "address": "581 Montrose Avenue, Stewart, Ohio, 3590",
    "registered": "2014-11-15T05:24:41 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2707,
    "isActive": true,
    "notes": "Eiusmod deserunt mollit pariatur amet nostrud ullamco et aliqua pariatur. Officia exercitation mollit ut cillum adipisicing adipisicing magna elit enim exercitation enim duis in culpa. Laborum occaecat excepteur esse ut cupidatat velit labore. Labore qui laborum ullamco excepteur est aute veniam nisi et aute irure officia nisi. Fugiat nostrud cupidatat aliqua elit voluptate elit ipsum pariatur minim. Eu proident ex excepteur exercitation eiusmod nulla voluptate laboris anim reprehenderit. Laboris nostrud ut consequat ut sint aliquip ea sint consectetur.\r\n"
  }, {
    "id": 6,
    "name": "Rowena Goff",
    "gender": "female",
    "company": "QUINTITY",
    "email": "rowenagoff@quintity.com",
    "phone": "+1 (947) 552-2979",
    "address": "728 Roosevelt Place, Elfrida, Arizona, 1620",
    "registered": "2014-04-19T10:11:29 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3695,
    "isActive": true,
    "notes": "Nulla fugiat excepteur deserunt ad incididunt Lorem. Fugiat proident minim est laboris sint. Proident irure consequat consequat do nisi cillum minim Lorem id.\r\n"
  }, {
    "id": 7,
    "name": "Giles Sykes",
    "gender": "male",
    "company": "MEGALL",
    "email": "gilessykes@megall.com",
    "phone": "+1 (884) 525-3155",
    "address": "233 Bedford Avenue, Venice, Hawaii, 7071",
    "registered": "2014-09-10T02:50:36 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2588,
    "isActive": false,
    "notes": "Irure proident sit est id minim nostrud ut proident. Velit culpa non Lorem et consectetur ipsum ipsum amet. Do adipisicing nulla est non ad nulla sit sit deserunt. Ipsum exercitation quis dolor esse qui laborum velit aute. In tempor esse est est reprehenderit et. Dolor aliqua tempor consequat mollit commodo sint elit.\r\n"
  }, {
    "id": 8,
    "name": "Doris Pitts",
    "gender": "female",
    "company": "FLEXIGEN",
    "email": "dorispitts@flexigen.com",
    "phone": "+1 (804) 587-3251",
    "address": "782 Albemarle Road, Westwood, Florida, 2556",
    "registered": "2014-06-23T11:55:27 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 1818,
    "isActive": true,
    "notes": "Ex ex laboris non consequat ea laborum velit Lorem dolore ipsum magna ad. Ipsum cillum ad velit ipsum aliqua minim. Ullamco reprehenderit ipsum consequat anim sit tempor aute duis aliqua occaecat exercitation. Tempor reprehenderit aute velit labore dolor excepteur laborum officia eu et excepteur duis qui cupidatat. Ut quis laboris sint ipsum ipsum cillum sint excepteur minim. Esse tempor sit consequat excepteur et minim officia labore nisi occaecat incididunt adipisicing culpa cillum. In eiusmod adipisicing enim ipsum amet qui veniam nostrud amet tempor cillum.\r\n"
  }, {
    "id": 9,
    "name": "Whitehead Wheeler",
    "gender": "male",
    "company": "ZUVY",
    "email": "whiteheadwheeler@zuvy.com",
    "phone": "+1 (822) 506-2325",
    "address": "883 Highland Avenue, Beaulieu, Wisconsin, 895",
    "registered": "2015-01-14T15:43:14 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 5211,
    "isActive": false,
    "notes": "Exercitation minim commodo ipsum est et reprehenderit ipsum et nisi reprehenderit adipisicing dolor. Sint occaecat incididunt minim sint labore sint in elit elit ea eu reprehenderit. Laborum mollit occaecat irure consequat aliqua do do in. Excepteur minim laboris fugiat irure mollit aute irure ipsum ipsum anim excepteur.\r\n"
  }, {
    "id": 10,
    "name": "Buchanan Ferguson",
    "gender": "male",
    "company": "ONTAGENE",
    "email": "buchananferguson@ontagene.com",
    "phone": "+1 (835) 595-3567",
    "address": "265 Rost Place, Herlong, Guam, 5597",
    "registered": "2014-05-11T23:48:06 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 3344,
    "isActive": false,
    "notes": "Velit proident fugiat sint sit nisi commodo laborum consequat proident dolor minim incididunt. Est commodo commodo enim sit magna aliqua fugiat ipsum incididunt cillum aliquip. Tempor aute incididunt aliquip qui deserunt qui. Nulla incididunt eiusmod deserunt elit aliquip nostrud dolore do reprehenderit id. Ipsum duis consequat tempor enim duis qui ea nostrud deserunt pariatur consectetur exercitation ipsum. Adipisicing culpa Lorem reprehenderit esse. Do ea sit consectetur ut veniam nisi dolor ipsum non nostrud ea eiusmod deserunt.\r\n"
  }, {
    "id": 11,
    "name": "Pope Waters",
    "gender": "male",
    "company": "ZOSIS",
    "email": "popewaters@zosis.com",
    "phone": "+1 (882) 442-3228",
    "address": "981 Pierrepont Street, Clarktown, Palau, 7905",
    "registered": "2015-01-20T07:53:59 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5599,
    "isActive": true,
    "notes": "Id ad ex ad ut non sunt sit velit qui aliquip proident excepteur. Laboris consequat reprehenderit fugiat ea anim duis consequat. Commodo culpa est cupidatat excepteur duis consequat. Deserunt duis ullamco exercitation duis dolore exercitation anim ut consectetur do veniam velit culpa. Eiusmod fugiat esse magna est ut ut tempor.\r\n"
  }, {
    "id": 12,
    "name": "Selena Velazquez",
    "gender": "female",
    "company": "CHILLIUM",
    "email": "selenavelazquez@chillium.com",
    "phone": "+1 (952) 465-3704",
    "address": "800 Evans Street, Haring, District Of Columbia, 6994",
    "registered": "2014-03-12T03:11:53 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 6303,
    "isActive": false,
    "notes": "Pariatur aute incididunt eiusmod aliqua magna fugiat aute tempor. Culpa cillum excepteur voluptate commodo exercitation duis et in. Sunt labore id excepteur ullamco dolore in laborum proident nisi cupidatat esse nostrud labore culpa.\r\n"
  }, {
    "id": 13,
    "name": "Garrett Phelps",
    "gender": "male",
    "company": "MELBACOR",
    "email": "garrettphelps@melbacor.com",
    "phone": "+1 (966) 429-2977",
    "address": "524 Varanda Place, Fivepointville, Alabama, 5670",
    "registered": "2014-03-21T05:56:11 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 1740,
    "isActive": true,
    "notes": "Cupidatat est anim mollit adipisicing dolore laboris excepteur. Veniam enim pariatur excepteur laborum duis exercitation aute Lorem. Ipsum nisi minim incididunt non cupidatat culpa nisi. Incididunt commodo consectetur enim ad culpa dolor qui sit fugiat. Duis duis dolore occaecat duis veniam ad fugiat irure amet aliquip tempor veniam ex nostrud.\r\n"
  }, {
    "id": 14,
    "name": "Willie Blanchard",
    "gender": "female",
    "company": "ZANITY",
    "email": "willieblanchard@zanity.com",
    "phone": "+1 (861) 566-2866",
    "address": "785 Kingsland Avenue, Benson, South Carolina, 7605",
    "registered": "2014-06-29T08:28:37 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 2529,
    "isActive": false,
    "notes": "Consectetur laboris duis tempor et id dolore. Sunt excepteur deserunt magna in est esse. Aute aliqua culpa do amet veniam pariatur.\r\n"
  }, {
    "id": 15,
    "name": "Kris Riddle",
    "gender": "female",
    "company": "INSURETY",
    "email": "krisriddle@insurety.com",
    "phone": "+1 (970) 595-2962",
    "address": "377 Boynton Place, Tryon, Michigan, 6583",
    "registered": "2015-01-16T00:43:07 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 4386,
    "isActive": true,
    "notes": "Mollit excepteur incididunt aliqua magna incididunt excepteur voluptate aute. Excepteur dolore non officia fugiat eiusmod dolor et esse ad ut. Qui duis laborum eiusmod reprehenderit sint.\r\n"
  }, {
    "id": 16,
    "name": "Fuentes Hickman",
    "gender": "male",
    "company": "GYNK",
    "email": "fuenteshickman@gynk.com",
    "phone": "+1 (908) 560-2853",
    "address": "206 Landis Court, Westmoreland, Connecticut, 9746",
    "registered": "2014-01-21T00:19:25 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 1483,
    "isActive": true,
    "notes": "Incididunt cupidatat consequat magna culpa dolor quis sunt voluptate enim magna. Tempor consequat adipisicing aliqua reprehenderit minim nostrud laboris eiusmod cillum ad. Qui esse ad qui nisi non ullamco consectetur cillum sit reprehenderit ex. Ex do dolore aliqua cillum pariatur nostrud nulla id duis ea adipisicing do esse. Sint eu non adipisicing proident amet cillum aute dolor excepteur commodo sunt aliquip.\r\n"
  }, {
    "id": 17,
    "name": "Mckee Vang",
    "gender": "male",
    "company": "CINCYR",
    "email": "mckeevang@cincyr.com",
    "phone": "+1 (866) 428-2892",
    "address": "197 Krier Place, Keyport, Marshall Islands, 6141",
    "registered": "2014-05-21T04:36:50 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 2744,
    "isActive": true,
    "notes": "Adipisicing magna minim amet ea adipisicing labore tempor deserunt. Reprehenderit occaecat est reprehenderit Lorem enim. Nisi tempor ad occaecat laborum proident est eu Lorem proident. Quis nulla dolor laborum irure fugiat. Dolor commodo labore proident commodo. Excepteur magna reprehenderit adipisicing nulla adipisicing proident dolor pariatur ad. Et commodo dolore nisi veniam.\r\n"
  }, {
    "id": 18,
    "name": "Ginger Fry",
    "gender": "female",
    "company": "CORIANDER",
    "email": "gingerfry@coriander.com",
    "phone": "+1 (939) 559-2901",
    "address": "960 Rock Street, Coldiron, New Jersey, 8545",
    "registered": "2014-11-08T07:42:25 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2181,
    "isActive": false,
    "notes": "Occaecat proident nostrud officia in. Magna ut non id nisi. Deserunt fugiat culpa ut non labore sit. Fugiat deserunt et consectetur aute adipisicing nostrud velit proident aliqua incididunt. Culpa in exercitation cillum minim ullamco dolore eiusmod enim adipisicing ut dolor duis culpa tempor. Nulla non aliquip aute sunt elit deserunt. Et ut labore amet minim occaecat est.\r\n"
  }, {
    "id": 19,
    "name": "Susanna Logan",
    "gender": "female",
    "company": "PANZENT",
    "email": "susannalogan@panzent.com",
    "phone": "+1 (918) 533-3066",
    "address": "863 Catherine Street, Germanton, Federated States Of Micronesia, 8820",
    "registered": "2014-09-19T06:54:51 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2492,
    "isActive": true,
    "notes": "Excepteur proident exercitation Lorem sit adipisicing consectetur voluptate deserunt consequat. Ut eiusmod nostrud labore veniam ex fugiat consequat et excepteur consequat eu. Laboris non magna reprehenderit officia in mollit non minim quis ipsum dolore minim. Fugiat dolore proident ullamco proident tempor.\r\n"
  }, {
    "id": 20,
    "name": "Lilia Ayers",
    "gender": "female",
    "company": "ANOCHA",
    "email": "liliaayers@anocha.com",
    "phone": "+1 (950) 461-3723",
    "address": "661 Bowery Street, Greenbush, Kentucky, 488",
    "registered": "2014-10-20T21:06:01 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6644,
    "isActive": true,
    "notes": "Cillum ut minim proident laboris reprehenderit quis elit qui ut deserunt reprehenderit. Dolore magna occaecat officia irure do eu ea magna voluptate reprehenderit enim deserunt anim aliqua. Ex elit consectetur nulla esse veniam mollit esse reprehenderit adipisicing nisi ipsum in. Proident amet eiusmod reprehenderit do irure reprehenderit irure Lorem amet veniam sint fugiat eiusmod aute.\r\n"
  }, {
    "id": 21,
    "name": "Helen Mitchell",
    "gender": "female",
    "company": "MEDIOT",
    "email": "helenmitchell@mediot.com",
    "phone": "+1 (996) 476-2566",
    "address": "273 Stratford Road, Corinne, Missouri, 8854",
    "registered": "2014-08-29T12:53:48 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 4651,
    "isActive": true,
    "notes": "Nisi culpa deserunt id fugiat nostrud laboris aliquip excepteur. Id commodo anim exercitation nostrud Lorem sunt cillum aliqua dolor officia minim. Laborum et eiusmod duis elit minim id irure incididunt aliqua.\r\n"
  }, {
    "id": 22,
    "name": "Beatriz Neal",
    "gender": "female",
    "company": "EXOSPACE",
    "email": "beatrizneal@exospace.com",
    "phone": "+1 (885) 584-2029",
    "address": "951 Hampton Avenue, Marysville, Delaware, 1585",
    "registered": "2014-07-13T12:13:57 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2997,
    "isActive": false,
    "notes": "Ullamco reprehenderit occaecat consectetur ullamco quis in ut officia. Fugiat sunt labore deserunt magna velit esse officia excepteur consectetur minim. Sunt enim laboris cupidatat duis deserunt do consectetur aliquip veniam occaecat dolore nisi fugiat ut.\r\n"
  }, {
    "id": 23,
    "name": "Myra Dixon",
    "gender": "female",
    "company": "QUALITERN",
    "email": "myradixon@qualitern.com",
    "phone": "+1 (804) 599-2208",
    "address": "990 Malbone Street, Eggertsville, Tennessee, 7584",
    "registered": "2014-07-10T09:06:40 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 3747,
    "isActive": true,
    "notes": "Eiusmod qui mollit duis eiusmod ex aliquip labore magna. Et id ullamco voluptate sint ipsum est laboris irure ut ullamco adipisicing minim ut. Ea Lorem sint reprehenderit commodo pariatur adipisicing fugiat commodo ipsum consectetur id tempor nisi. Nisi commodo voluptate sint laborum. Do nisi Lorem duis eu officia qui. Commodo cillum id labore ut sit. Sunt nisi dolor officia exercitation labore ullamco quis.\r\n"
  }, {
    "id": 24,
    "name": "Constance West",
    "gender": "female",
    "company": "KNOWLYSIS",
    "email": "constancewest@knowlysis.com",
    "phone": "+1 (886) 552-2838",
    "address": "950 Juliana Place, Lynn, American Samoa, 4821",
    "registered": "2014-11-03T22:23:19 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 1140,
    "isActive": false,
    "notes": "Aliqua id qui commodo adipisicing aliqua voluptate eiusmod pariatur irure Lorem cillum. Irure dolore aliqua officia occaecat esse deserunt velit eu occaecat aute. Dolore voluptate quis velit sunt aliqua. Laboris aliqua nisi exercitation sunt est nostrud reprehenderit sint elit dolore labore. Voluptate laboris dolore amet ad tempor adipisicing ullamco id reprehenderit est.\r\n"
  }, {
    "id": 25,
    "name": "Karina Merrill",
    "gender": "female",
    "company": "LOCAZONE",
    "email": "karinamerrill@locazone.com",
    "phone": "+1 (814) 463-2883",
    "address": "308 Ridge Boulevard, Chase, Wyoming, 2531",
    "registered": "2014-01-06T05:21:16 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6612,
    "isActive": false,
    "notes": "Aliquip ut cupidatat occaecat eiusmod incididunt sit non nostrud duis dolore. Dolor ea esse deserunt nostrud occaecat cillum do nostrud deserunt deserunt. Do laborum aliquip dolore ut irure aute do pariatur. Qui non occaecat deserunt elit labore consectetur cupidatat culpa proident officia eiusmod do. Nulla non reprehenderit aute nulla do qui Lorem nisi tempor magna consequat pariatur ex. Ad duis qui esse proident reprehenderit do quis voluptate sunt ex. Commodo cillum nisi elit Lorem excepteur enim deserunt.\r\n"
  }, {
    "id": 26,
    "name": "Conway Mcfarland",
    "gender": "male",
    "company": "ZIDANT",
    "email": "conwaymcfarland@zidant.com",
    "phone": "+1 (801) 408-3242",
    "address": "108 Lafayette Walk, Avalon, California, 7301",
    "registered": "2014-04-11T02:09:04 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 3726,
    "isActive": true,
    "notes": "Ex Lorem labore consequat et consectetur. Labore laboris ut commodo et mollit ex nisi. Deserunt consequat occaecat veniam et. Laborum aliqua ea minim aute fugiat fugiat. Laborum tempor dolore esse ex nostrud id nulla minim proident amet cupidatat culpa. Qui nulla eu quis officia amet pariatur tempor do pariatur ullamco do consectetur consequat. Ullamco veniam dolor excepteur ut aute est cupidatat.\r\n"
  }, {
    "id": 27,
    "name": "Violet Sellers",
    "gender": "female",
    "company": "OVERPLEX",
    "email": "violetsellers@overplex.com",
    "phone": "+1 (804) 513-2265",
    "address": "621 Kings Place, Frystown, North Carolina, 3604",
    "registered": "2014-07-07T09:43:10 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1522,
    "isActive": true,
    "notes": "Exercitation deserunt minim nisi aliquip duis fugiat aliquip nisi esse reprehenderit. Nisi commodo magna dolore do aliqua sint ipsum. Eu in non mollit et sint officia Lorem officia. Aute do nisi dolor laborum elit sint. Labore ipsum nulla veniam occaecat consequat labore proident.\r\n"
  }, {
    "id": 28,
    "name": "Johnson Gomez",
    "gender": "male",
    "company": "PAWNAGRA",
    "email": "johnsongomez@pawnagra.com",
    "phone": "+1 (832) 496-3021",
    "address": "162 Brightwater Avenue, Florence, Colorado, 6020",
    "registered": "2014-10-13T09:02:47 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5172,
    "isActive": false,
    "notes": "Ut dolore cillum irure tempor magna officia cillum amet sit aliquip esse laboris cupidatat. Do esse esse enim deserunt proident exercitation do anim eu reprehenderit duis. Amet officia qui anim officia deserunt duis id nisi. Et commodo nisi aute exercitation aliqua aute exercitation consectetur magna consequat amet laborum reprehenderit do. Cillum ipsum deserunt non ea ullamco nostrud qui elit. Cillum sint ea in proident velit sunt ea aliquip irure consequat exercitation sit.\r\n"
  }, {
    "id": 29,
    "name": "Franklin Shields",
    "gender": "male",
    "company": "SCENTY",
    "email": "franklinshields@scenty.com",
    "phone": "+1 (996) 562-3303",
    "address": "129 Miami Court, Salunga, Washington, 5131",
    "registered": "2014-06-06T09:25:15 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 4767,
    "isActive": true,
    "notes": "Et laboris Lorem laboris qui veniam aliquip cillum nulla deserunt sit. Magna qui ullamco culpa cupidatat elit. Mollit fugiat voluptate qui do non tempor. Ex commodo esse fugiat ea elit est amet.\r\n"
  }, {
    "id": 30,
    "name": "Sheri Carey",
    "gender": "female",
    "company": "PAPRICUT",
    "email": "shericarey@papricut.com",
    "phone": "+1 (872) 550-3487",
    "address": "764 Aberdeen Street, Dunlo, Texas, 3658",
    "registered": "2014-08-31T18:24:44 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2715,
    "isActive": true,
    "notes": "Velit fugiat ut consectetur sint quis tempor. Commodo nostrud laborum cillum velit. Et excepteur velit officia enim et irure velit consequat ipsum dolore. Culpa irure sunt officia consequat exercitation et veniam nostrud.\r\n"
  }, {
    "id": 31,
    "name": "Pace Greene",
    "gender": "male",
    "company": "EXTRAGENE",
    "email": "pacegreene@extragene.com",
    "phone": "+1 (971) 526-2986",
    "address": "310 Reed Street, Winfred, Minnesota, 4165",
    "registered": "2014-09-14T07:00:51 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 2999,
    "isActive": false,
    "notes": "Do nostrud fugiat excepteur amet occaecat quis nostrud incididunt Lorem id et. Nulla voluptate est consequat sunt ut voluptate mollit sint occaecat consequat laboris nisi. Commodo aute sit fugiat aliqua est minim. Deserunt voluptate ullamco veniam sunt veniam. Enim eiusmod officia in nostrud deserunt do. Eiusmod qui occaecat anim sint.\r\n"
  }, {
    "id": 32,
    "name": "Acevedo Lancaster",
    "gender": "male",
    "company": "NEXGENE",
    "email": "acevedolancaster@nexgene.com",
    "phone": "+1 (898) 470-2986",
    "address": "404 Hunterfly Place, Iberia, Rhode Island, 3896",
    "registered": "2014-09-14T20:07:04 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 2660,
    "isActive": true,
    "notes": "Consequat reprehenderit anim voluptate reprehenderit sunt. In pariatur sint ea velit elit velit ad tempor consequat tempor voluptate pariatur consectetur deserunt. Esse laborum occaecat ullamco eu proident laboris elit aliquip ad culpa enim Lorem. Mollit quis eu id voluptate incididunt voluptate exercitation nisi duis occaecat id excepteur velit. Do mollit minim aute culpa. Magna Lorem excepteur qui ipsum consectetur velit. Anim aliquip occaecat esse aliqua non reprehenderit reprehenderit officia dolor occaecat quis.\r\n"
  }, {
    "id": 33,
    "name": "Greene Duran",
    "gender": "male",
    "company": "REMOLD",
    "email": "greeneduran@remold.com",
    "phone": "+1 (968) 564-3673",
    "address": "918 Schenck Place, Clay, Iowa, 8575",
    "registered": "2014-04-16T22:16:59 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1973,
    "isActive": false,
    "notes": "Dolor ipsum anim ea irure dolore enim irure non. Elit qui aute nostrud eiusmod do ut aute id ad consectetur amet. Id ut incididunt est consectetur laborum. Occaecat in Lorem sint ad ullamco ex aute velit est. Elit nostrud amet magna quis ex tempor aliqua cupidatat exercitation mollit excepteur commodo do do. Est cupidatat sunt ipsum laborum eu enim dolor. Mollit labore veniam nulla qui tempor excepteur amet officia laboris dolor deserunt reprehenderit non.\r\n"
  }, {
    "id": 34,
    "name": "Francis Hendrix",
    "gender": "female",
    "company": "CANDECOR",
    "email": "francishendrix@candecor.com",
    "phone": "+1 (859) 568-3268",
    "address": "826 Alice Court, Jacksonburg, Virgin Islands, 4442",
    "registered": "2014-03-12T07:13:33 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 6376,
    "isActive": false,
    "notes": "Est cupidatat fugiat occaecat ut sint sit minim non magna elit consequat esse adipisicing. Adipisicing Lorem tempor magna voluptate adipisicing. Mollit veniam est cupidatat consequat velit aliqua veniam id enim sit labore. Fugiat elit dolore ea aute id commodo amet sint quis aliquip. Ad non veniam ad dolore magna eu.\r\n"
  }, {
    "id": 35,
    "name": "Angel Rush",
    "gender": "female",
    "company": "CENTREGY",
    "email": "angelrush@centregy.com",
    "phone": "+1 (814) 578-2098",
    "address": "950 Dahl Court, Kraemer, Arkansas, 8738",
    "registered": "2014-09-27T01:27:03 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5820,
    "isActive": true,
    "notes": "Est exercitation aliquip qui quis aliquip nostrud mollit consectetur voluptate ex. Elit officia ad dolor et velit commodo Lorem voluptate velit enim aliquip exercitation laboris. Veniam irure adipisicing ex sit deserunt aliquip culpa. Non pariatur culpa enim ad magna. Ullamco ea sunt laborum dolor.\r\n"
  }, {
    "id": 36,
    "name": "Mable Warner",
    "gender": "female",
    "company": "OPTIQUE",
    "email": "mablewarner@optique.com",
    "phone": "+1 (815) 472-2525",
    "address": "753 Lombardy Street, Grenelefe, Puerto Rico, 7640",
    "registered": "2014-08-15T00:29:22 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 1344,
    "isActive": false,
    "notes": "Aute magna est id mollit et consectetur nisi cillum ullamco eiusmod. Aliqua sit ex do nisi nulla minim nostrud do culpa voluptate sit. Officia anim non proident occaecat eu. Commodo ullamco commodo dolor adipisicing quis non dolor. Cupidatat pariatur irure dolor dolor ex dolore.\r\n"
  }, {
    "id": 37,
    "name": "Day Haney",
    "gender": "male",
    "company": "TASMANIA",
    "email": "dayhaney@tasmania.com",
    "phone": "+1 (825) 440-3252",
    "address": "807 Bartlett Place, Hessville, Oklahoma, 7210",
    "registered": "2014-01-25T20:17:36 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6368,
    "isActive": false,
    "notes": "Labore labore laboris non et elit non enim proident do eiusmod cupidatat proident mollit dolor. Adipisicing dolore et dolor sint et enim veniam tempor reprehenderit cillum consectetur laborum in anim. Reprehenderit nisi exercitation deserunt esse. Ut consequat aute est eu enim exercitation occaecat dolore et aute magna incididunt. Excepteur elit occaecat aliquip eu ex in eu voluptate laboris magna et dolor.\r\n"
  }, {
    "id": 38,
    "name": "Sellers Olson",
    "gender": "male",
    "company": "SUPREMIA",
    "email": "sellersolson@supremia.com",
    "phone": "+1 (870) 556-3426",
    "address": "689 Essex Street, Linwood, Massachusetts, 8484",
    "registered": "2014-11-05T08:50:58 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3422,
    "isActive": true,
    "notes": "Sunt Lorem in dolore irure ipsum mollit adipisicing. Labore fugiat qui aute aliquip ullamco in nulla sunt. Nisi nostrud pariatur id officia consequat ut. Cupidatat aliqua aliqua minim reprehenderit et. Consequat sit pariatur labore exercitation adipisicing ullamco amet occaecat aliquip sint excepteur. Sint reprehenderit exercitation officia duis culpa aliqua nostrud. Excepteur nostrud nostrud nostrud magna labore id est dolor.\r\n"
  }, {
    "id": 39,
    "name": "Adele Norman",
    "gender": "female",
    "company": "INCUBUS",
    "email": "adelenorman@incubus.com",
    "phone": "+1 (938) 499-3669",
    "address": "113 Will Place, Bodega, Maryland, 1906",
    "registered": "2014-01-26T02:38:13 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 6285,
    "isActive": true,
    "notes": "Incididunt sunt mollit non duis duis ad in in velit aliquip occaecat ex dolore ad. Nisi labore aute aliquip est nostrud minim aute. In fugiat sint tempor dolore duis sit laborum laborum tempor ea proident nostrud nostrud. Eu nostrud et fugiat voluptate veniam laboris anim ullamco ad ut voluptate sint aliqua.\r\n"
  }, {
    "id": 40,
    "name": "Delgado Hale",
    "gender": "male",
    "company": "DATAGENE",
    "email": "delgadohale@datagene.com",
    "phone": "+1 (805) 437-3286",
    "address": "953 Bouck Court, Craig, Illinois, 4333",
    "registered": "2014-05-17T21:42:38 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 3800,
    "isActive": false,
    "notes": "Irure quis cupidatat sit ullamco in ex amet nisi laborum sint do do ipsum. Ullamco veniam minim fugiat aute amet esse deserunt esse ipsum culpa. Ullamco culpa ut sit magna non. Lorem ad do fugiat cupidatat.\r\n"
  }, {
    "id": 41,
    "name": "Sheena Talley",
    "gender": "female",
    "company": "HOTCAKES",
    "email": "sheenatalley@hotcakes.com",
    "phone": "+1 (837) 428-2669",
    "address": "180 Jamison Lane, Concho, Vermont, 3826",
    "registered": "2014-03-25T20:55:23 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5839,
    "isActive": false,
    "notes": "Voluptate ea consequat tempor enim consectetur dolor non eiusmod ea tempor in cillum irure. Ex culpa sunt culpa nostrud irure labore duis minim cupidatat velit esse minim ex commodo. Dolor nisi ea est quis veniam.\r\n"
  }, {
    "id": 42,
    "name": "Valencia Johns",
    "gender": "male",
    "company": "ZIGGLES",
    "email": "valenciajohns@ziggles.com",
    "phone": "+1 (973) 423-3043",
    "address": "793 Hastings Street, Eureka, Louisiana, 2376",
    "registered": "2014-04-10T00:38:57 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 1930,
    "isActive": true,
    "notes": "Eiusmod consequat ea mollit ea aute aliquip consequat magna. Magna sint aute esse minim. Exercitation sit incididunt aute consectetur excepteur dolore. Consequat reprehenderit nulla aliqua do quis nostrud est qui qui cupidatat.\r\n"
  }, {
    "id": 43,
    "name": "Ruth Tate",
    "gender": "female",
    "company": "OLYMPIX",
    "email": "ruthtate@olympix.com",
    "phone": "+1 (963) 413-2088",
    "address": "352 Wyona Street, Finderne, Georgia, 351",
    "registered": "2014-07-08T11:12:16 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 5605,
    "isActive": false,
    "notes": "Sit sint ut irure nostrud proident officia elit id quis minim est pariatur in fugiat. Deserunt ex ex anim deserunt et duis enim enim minim voluptate. Eiusmod Lorem mollit cupidatat officia dolore Lorem ullamco minim commodo est reprehenderit. Amet reprehenderit nostrud sint sit.\r\n"
  }, {
    "id": 44,
    "name": "Tina Perkins",
    "gender": "female",
    "company": "ANACHO",
    "email": "tinaperkins@anacho.com",
    "phone": "+1 (869) 437-3068",
    "address": "707 Ferris Street, Lutsen, New Hampshire, 8460",
    "registered": "2014-04-28T02:10:00 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6634,
    "isActive": false,
    "notes": "Elit laboris consequat nulla incididunt ullamco. Velit labore nostrud mollit ad. Enim fugiat aliquip in id elit proident dolor ea. Mollit anim fugiat in deserunt laborum Lorem mollit anim.\r\n"
  }, {
    "id": 45,
    "name": "Summers Turner",
    "gender": "male",
    "company": "UNIWORLD",
    "email": "summersturner@uniworld.com",
    "phone": "+1 (802) 507-2750",
    "address": "485 Arkansas Drive, Riegelwood, South Dakota, 4941",
    "registered": "2014-01-12T13:15:54 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 5892,
    "isActive": true,
    "notes": "Duis in laborum ea incididunt aliqua fugiat qui aliquip consectetur est ut. Exercitation quis elit adipisicing laborum ipsum deserunt consequat sint ad ut adipisicing nostrud occaecat incididunt. Ea laborum sint veniam proident. Cillum nulla aliqua deserunt qui est consequat eu dolore esse enim enim occaecat. Fugiat anim laboris do consequat ea. Ea elit do ut officia dolore commodo enim.\r\n"
  }, {
    "id": 46,
    "name": "Alyson Maxwell",
    "gender": "female",
    "company": "NEUROCELL",
    "email": "alysonmaxwell@neurocell.com",
    "phone": "+1 (840) 515-2453",
    "address": "283 Irwin Street, Sanford, Pennsylvania, 6918",
    "registered": "2014-10-28T14:54:00 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2779,
    "isActive": true,
    "notes": "Enim enim ea anim et proident. Enim duis labore esse aute. Cupidatat excepteur sint enim laboris do exercitation dolor. Officia et deserunt velit ea cillum ex voluptate consequat quis eu aliquip qui. Aute eiusmod commodo aliquip ad veniam consequat enim aliquip irure voluptate sit mollit. Id deserunt incididunt pariatur est proident culpa ex nostrud fugiat ut culpa sunt.\r\n"
  }, {
    "id": 47,
    "name": "Vargas Bullock",
    "gender": "male",
    "company": "QUILITY",
    "email": "vargasbullock@quility.com",
    "phone": "+1 (879) 557-2336",
    "address": "222 Lott Street, Saticoy, Indiana, 3737",
    "registered": "2014-11-23T09:10:25 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2148,
    "isActive": false,
    "notes": "Ipsum laborum adipisicing do anim tempor et duis eu aute sit cupidatat qui sunt laborum. Cupidatat nisi proident dolore aliqua deserunt nisi labore ipsum id et voluptate fugiat. Nostrud enim laborum velit duis pariatur eiusmod. Enim do ullamco consequat eiusmod excepteur tempor adipisicing eiusmod aliqua fugiat amet. Id labore irure in excepteur cillum cillum velit magna esse est do dolor. Consequat ad et deserunt nulla irure deserunt id nostrud.\r\n"
  }, {
    "id": 48,
    "name": "Vicki Long",
    "gender": "female",
    "company": "SLUMBERIA",
    "email": "vickilong@slumberia.com",
    "phone": "+1 (893) 403-3283",
    "address": "134 Hale Avenue, Urbana, Kansas, 5117",
    "registered": "2014-10-20T17:09:16 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 2978,
    "isActive": true,
    "notes": "Irure cupidatat eu nulla eiusmod ea adipisicing esse minim cupidatat ullamco exercitation consectetur anim anim. Sunt quis incididunt cupidatat veniam quis tempor fugiat ex non. Sit veniam cillum ex occaecat amet irure incididunt ea cillum. Reprehenderit aliqua id deserunt do adipisicing consequat duis proident eiusmod. Eu id tempor eiusmod officia in tempor mollit quis.\r\n"
  }, {
    "id": 49,
    "name": "Banks Craig",
    "gender": "male",
    "company": "GENESYNK",
    "email": "bankscraig@genesynk.com",
    "phone": "+1 (881) 538-2096",
    "address": "659 Kansas Place, Tioga, Virginia, 7900",
    "registered": "2014-02-19T17:37:26 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2565,
    "isActive": false,
    "notes": "Id dolore cillum ut ea. Ut aute occaecat esse officia velit. Adipisicing dolore elit veniam culpa ut sint minim dolore officia esse. Enim culpa culpa commodo duis est proident nulla minim nisi aliquip fugiat et velit officia. Mollit qui voluptate qui minim reprehenderit. Ex aute veniam quis amet quis excepteur.\r\n"
  }, {
    "id": 50,
    "name": "Kristin Delgado",
    "gender": "female",
    "company": "COMTEXT",
    "email": "kristindelgado@comtext.com",
    "phone": "+1 (917) 580-2164",
    "address": "701 Chester Avenue, Roeville, North Dakota, 9215",
    "registered": "2014-10-18T07:07:00 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 1791,
    "isActive": false,
    "notes": "Amet dolor sint voluptate reprehenderit fugiat eiusmod cillum. Elit anim irure voluptate labore deserunt. Culpa nulla minim mollit esse laborum quis aliquip mollit adipisicing et in sit commodo aliquip. Quis proident commodo commodo nostrud esse culpa reprehenderit ex exercitation dolor proident. Non anim consectetur ex nostrud qui eiusmod nostrud dolor consectetur et. Veniam ut nulla est et.\r\n"
  }, {
    "id": 51,
    "name": "Tara Wells",
    "gender": "female",
    "company": "BITENDREX",
    "email": "tarawells@bitendrex.com",
    "phone": "+1 (902) 599-3383",
    "address": "556 Mill Street, Boonville, Oregon, 10000",
    "registered": "2014-08-16T12:33:07 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 4456,
    "isActive": true,
    "notes": "Laboris ipsum occaecat id ex consectetur ullamco Lorem velit aliqua ad voluptate. Proident in officia occaecat et. Velit deserunt deserunt excepteur amet. Mollit cupidatat cupidatat eiusmod cillum mollit aliquip eu cillum. Officia et tempor elit Lorem laborum quis eu incididunt.\r\n"
  }, {
    "id": 52,
    "name": "Michael Bright",
    "gender": "female",
    "company": "ZENSUS",
    "email": "michaelbright@zensus.com",
    "phone": "+1 (818) 423-2883",
    "address": "984 Madison Street, Lavalette, Utah, 5847",
    "registered": "2014-10-13T21:38:16 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2185,
    "isActive": true,
    "notes": "Officia pariatur minim proident excepteur anim incididunt. Sit tempor do Lorem sit cillum cillum ex cillum ex ad. Elit fugiat fugiat anim cillum est quis velit labore anim culpa. Esse mollit ad deserunt deserunt nostrud Lorem enim.\r\n"
  }, {
    "id": 53,
    "name": "Levine Hyde",
    "gender": "male",
    "company": "KENEGY",
    "email": "levinehyde@kenegy.com",
    "phone": "+1 (808) 489-2477",
    "address": "243 McClancy Place, Dante, Nebraska, 1596",
    "registered": "2014-07-21T02:01:24 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 5607,
    "isActive": false,
    "notes": "In et tempor laboris sunt. Nisi officia anim ea eu consectetur laboris. Consequat pariatur officia nostrud commodo labore irure proident nisi excepteur laborum voluptate velit aliqua. Ullamco eu laboris nulla labore labore. Cillum cillum sint excepteur anim culpa officia.\r\n"
  }, {
    "id": 54,
    "name": "Mccray Jackson",
    "gender": "male",
    "company": "QUOTEZART",
    "email": "mccrayjackson@quotezart.com",
    "phone": "+1 (850) 473-2667",
    "address": "964 Sedgwick Street, Coventry, New York, 4728",
    "registered": "2014-07-06T17:21:30 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2905,
    "isActive": false,
    "notes": "Deserunt reprehenderit veniam nostrud est enim culpa laboris dolor amet voluptate aliqua cupidatat minim. Irure amet pariatur esse reprehenderit exercitation duis ea. Velit ipsum non fugiat qui.\r\n"
  }, {
    "id": 55,
    "name": "Holder Justice",
    "gender": "male",
    "company": "AQUASURE",
    "email": "holderjustice@aquasure.com",
    "phone": "+1 (962) 514-3744",
    "address": "135 Vanderveer Street, Curtice, New Mexico, 418",
    "registered": "2014-07-12T02:05:05 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6309,
    "isActive": false,
    "notes": "Nisi ea cupidatat tempor eu quis Lorem ullamco incididunt occaecat eu sint fugiat. Deserunt sint deserunt dolore consequat labore irure mollit enim adipisicing ut commodo pariatur reprehenderit. Pariatur Lorem officia culpa veniam anim sit anim. Quis eiusmod commodo et sit anim fugiat aute ad voluptate voluptate commodo labore anim laboris. Esse Lorem aute magna duis do.\r\n"
  }, {
    "id": 56,
    "name": "Adriana Bailey",
    "gender": "female",
    "company": "ENERFORCE",
    "email": "adrianabailey@enerforce.com",
    "phone": "+1 (861) 525-3834",
    "address": "815 Lamont Court, Belvoir, Alaska, 2832",
    "registered": "2014-10-20T18:40:24 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 1072,
    "isActive": true,
    "notes": "Ipsum ea sunt esse dolore commodo anim ipsum eiusmod duis culpa labore dolor commodo excepteur. Ullamco esse aliqua nisi proident nulla laboris irure fugiat magna pariatur. Pariatur ad sint laboris consectetur pariatur eiusmod eiusmod veniam. Sint ex elit culpa ullamco commodo. Ipsum nostrud proident culpa officia ex excepteur. Cupidatat enim irure id voluptate aliqua aliquip ullamco aute ipsum aute.\r\n"
  }, {
    "id": 57,
    "name": "Simpson Donovan",
    "gender": "male",
    "company": "SHEPARD",
    "email": "simpsondonovan@shepard.com",
    "phone": "+1 (849) 593-3780",
    "address": "954 Corbin Place, Matheny, Montana, 5388",
    "registered": "2014-03-25T16:49:43 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 1936,
    "isActive": false,
    "notes": "Nulla culpa tempor in est magna. Consectetur enim ut quis officia aliquip aute laborum est commodo qui cillum aliquip velit. Cupidatat ipsum eu id qui labore nisi Lorem dolore incididunt aliquip anim ad magna. Incididunt consectetur non aute velit veniam occaecat nisi.\r\n"
  }, {
    "id": 58,
    "name": "Barr Arnold",
    "gender": "male",
    "company": "VALREDA",
    "email": "barrarnold@valreda.com",
    "phone": "+1 (908) 427-2481",
    "address": "890 Herkimer Street, Macdona, Maine, 6143",
    "registered": "2014-08-20T04:37:52 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 6912,
    "isActive": false,
    "notes": "Dolore qui elit velit ex sint in est Lorem laboris occaecat quis eu. Duis qui exercitation ullamco sunt eu id dolor. Amet cillum ipsum veniam laborum dolore in nulla Lorem cupidatat.\r\n"
  }, {
    "id": 59,
    "name": "Kimberley Gardner",
    "gender": "female",
    "company": "BLEEKO",
    "email": "kimberleygardner@bleeko.com",
    "phone": "+1 (822) 541-2383",
    "address": "111 Grattan Street, Manchester, Idaho, 3684",
    "registered": "2014-07-31T04:24:22 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2036,
    "isActive": true,
    "notes": "In aliquip eiusmod pariatur amet mollit ea consectetur. Lorem dolore voluptate cupidatat reprehenderit velit do. Dolor eiusmod ex dolore nulla pariatur dolor nostrud.\r\n"
  }, {
    "id": 60,
    "name": "Allen Perry",
    "gender": "male",
    "company": "POOCHIES",
    "email": "allenperry@poochies.com",
    "phone": "+1 (967) 516-2404",
    "address": "412 Schweikerts Walk, Reno, Northern Mariana Islands, 9245",
    "registered": "2014-09-30T08:51:08 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 5423,
    "isActive": false,
    "notes": "Duis non qui quis ad nisi. Magna sunt elit officia ipsum ut ad eu. Irure dolor ullamco non fugiat. Laborum irure cupidatat nostrud veniam esse amet incididunt id. Aliqua amet dolor cupidatat tempor sit ex.\r\n"
  }, {
    "id": 61,
    "name": "Lorena Holmes",
    "gender": "female",
    "company": "SIGNIDYNE",
    "email": "lorenaholmes@signidyne.com",
    "phone": "+1 (991) 443-2445",
    "address": "337 Milford Street, Bowmansville, Mississippi, 2423",
    "registered": "2014-09-16T11:38:45 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 1611,
    "isActive": true,
    "notes": "Laboris consectetur mollit voluptate do aliqua laborum ullamco. Ex laboris aute voluptate pariatur excepteur Lorem et. Fugiat sunt nisi occaecat ex tempor. Ea reprehenderit ad ut ea minim nulla.\r\n"
  }, {
    "id": 62,
    "name": "Claudia Bowman",
    "gender": "female",
    "company": "CYTREK",
    "email": "claudiabowman@cytrek.com",
    "phone": "+1 (943) 400-3737",
    "address": "672 Emerson Place, Brandermill, Nevada, 4435",
    "registered": "2014-12-03T19:14:49 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 5027,
    "isActive": false,
    "notes": "Et esse duis ut et ea officia proident. Mollit anim ut commodo incididunt ut officia elit do. Sint ex nostrud laboris ut tempor irure. Nulla esse amet reprehenderit consequat deserunt ut culpa pariatur id exercitation. Fugiat labore ea do velit voluptate magna ipsum incididunt sit et. Consequat ea eu tempor exercitation. Aute voluptate fugiat est enim tempor ad sit cupidatat minim.\r\n"
  }, {
    "id": 63,
    "name": "Florine Kirk",
    "gender": "female",
    "company": "UNEEQ",
    "email": "florinekirk@uneeq.com",
    "phone": "+1 (971) 484-3974",
    "address": "690 Poplar Street, Vienna, Ohio, 8844",
    "registered": "2015-01-06T05:18:44 -00:00",
    "preferredBike": "A classy bike",
    "bikePoints": 3476,
    "isActive": false,
    "notes": "Dolor voluptate dolore ut pariatur sit laborum exercitation magna laboris culpa. Officia tempor qui laboris pariatur. Consectetur ex voluptate qui dolor consequat velit dolore amet irure pariatur amet minim reprehenderit. Aliqua sit pariatur velit aute. Cillum in fugiat irure veniam ea. Non ea est et sunt mollit. Do et qui adipisicing ullamco est consequat.\r\n"
  }, {
    "id": 64,
    "name": "Gregory Snow",
    "gender": "male",
    "company": "VIASIA",
    "email": "gregorysnow@viasia.com",
    "phone": "+1 (957) 430-2384",
    "address": "343 Herkimer Court, Brambleton, Arizona, 3948",
    "registered": "2014-02-14T02:06:05 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6699,
    "isActive": true,
    "notes": "Nisi eu nostrud laborum Lorem fugiat ea Lorem sint consequat. Pariatur pariatur Lorem id exercitation consequat culpa. Ut consequat esse voluptate sunt proident ut irure.\r\n"
  }, {
    "id": 65,
    "name": "Jimenez Cook",
    "gender": "male",
    "company": "ECRAZE",
    "email": "jimenezcook@ecraze.com",
    "phone": "+1 (971) 565-3111",
    "address": "934 Lenox Road, Thynedale, Hawaii, 7733",
    "registered": "2014-09-19T05:03:49 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 6278,
    "isActive": false,
    "notes": "Dolor labore ipsum ut culpa consequat. Labore anim magna irure aute in. Aliquip labore est excepteur commodo excepteur consequat Lorem Lorem elit dolore incididunt ea ad. Sit cupidatat ut duis cillum deserunt consequat fugiat Lorem. Ea minim et est laborum ex aute do amet non eiusmod.\r\n"
  }, {
    "id": 66,
    "name": "Hebert Douglas",
    "gender": "male",
    "company": "SNORUS",
    "email": "hebertdouglas@snorus.com",
    "phone": "+1 (931) 460-3041",
    "address": "244 Dearborn Court, Cade, Florida, 1792",
    "registered": "2014-08-20T03:10:37 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6937,
    "isActive": false,
    "notes": "Sint exercitation ad anim deserunt proident veniam laborum elit laboris elit. Qui ex ut esse excepteur cupidatat. Non non cillum magna id commodo et deserunt cupidatat sint quis labore labore voluptate Lorem. Dolor dolor sit dolore elit est exercitation voluptate ad officia ipsum irure sint consectetur ad.\r\n"
  }, {
    "id": 67,
    "name": "Antoinette Shelton",
    "gender": "female",
    "company": "QUANTASIS",
    "email": "antoinetteshelton@quantasis.com",
    "phone": "+1 (883) 514-3785",
    "address": "886 Lois Avenue, Verdi, Wisconsin, 9816",
    "registered": "2014-07-23T00:57:48 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 5695,
    "isActive": false,
    "notes": "Consequat id magna culpa nostrud anim sunt ad labore commodo proident non et culpa. Amet veniam eiusmod laborum aute laboris pariatur ipsum ex ex non. In irure reprehenderit ut veniam laboris. Qui elit non ipsum velit adipisicing duis aliqua mollit. Irure fugiat cupidatat quis quis cillum. Est et pariatur minim amet minim tempor occaecat dolore nostrud adipisicing ad amet incididunt.\r\n"
  }, {
    "id": 68,
    "name": "Atkins Gaines",
    "gender": "male",
    "company": "EXTRO",
    "email": "atkinsgaines@extro.com",
    "phone": "+1 (911) 523-2344",
    "address": "962 Fulton Street, Brogan, Guam, 7461",
    "registered": "2014-07-21T13:11:46 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 6692,
    "isActive": true,
    "notes": "Ut veniam Lorem in fugiat officia laboris do et. Laboris ullamco est excepteur culpa consectetur dolore. Proident sunt nisi commodo ut nulla tempor sit id. Esse cillum velit aliquip ullamco pariatur ad minim ex nisi adipisicing do dolor. Velit cupidatat consequat non tempor minim labore pariatur ipsum enim aliqua elit dolore. Eiusmod pariatur irure minim Lorem sit aliqua ex esse ut ipsum non.\r\n"
  }, {
    "id": 69,
    "name": "Hester Carver",
    "gender": "female",
    "company": "ASSISTIA",
    "email": "hestercarver@assistia.com",
    "phone": "+1 (968) 453-3159",
    "address": "261 Withers Street, Bynum, Palau, 3775",
    "registered": "2015-01-24T20:24:28 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6517,
    "isActive": false,
    "notes": "Laboris dolor voluptate esse velit in pariatur magna. Qui id reprehenderit id incididunt nostrud aliquip. Magna ipsum dolore commodo commodo excepteur in ad excepteur. Ex ad duis sit commodo et proident sint irure commodo proident non nisi nulla. Fugiat quis adipisicing cillum esse deserunt.\r\n"
  }, {
    "id": 70,
    "name": "Beryl Pierce",
    "gender": "female",
    "company": "HOPELI",
    "email": "berylpierce@hopeli.com",
    "phone": "+1 (923) 479-3206",
    "address": "393 Empire Boulevard, Fingerville, District Of Columbia, 8763",
    "registered": "2014-06-09T02:24:14 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1259,
    "isActive": true,
    "notes": "Exercitation est consectetur sit velit anim duis ad ut non consectetur officia est. Id pariatur nostrud officia do aliqua duis voluptate deserunt sint reprehenderit enim dolore ut sit. Aliquip cillum consequat occaecat consectetur ullamco culpa culpa aliquip aliqua do proident. Id voluptate aliquip nisi dolor dolore consectetur eu occaecat amet in esse occaecat. Ex sit et fugiat sint qui.\r\n"
  }, {
    "id": 71,
    "name": "Donaldson Everett",
    "gender": "male",
    "company": "MAROPTIC",
    "email": "donaldsoneverett@maroptic.com",
    "phone": "+1 (973) 459-2495",
    "address": "662 Dank Court, Retsof, Alabama, 7449",
    "registered": "2014-06-04T18:29:17 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 6038,
    "isActive": false,
    "notes": "Enim aliquip tempor elit voluptate eu est ea laboris ad duis amet aute cupidatat enim. Culpa laboris id ullamco consectetur Lorem aute nulla aliqua reprehenderit minim id. Labore id elit ullamco irure quis mollit. Aute ea minim tempor cupidatat aliqua quis et eu adipisicing. Nisi minim non veniam quis voluptate voluptate amet velit. Fugiat qui voluptate tempor qui nisi. Lorem ullamco in elit laboris non nulla.\r\n"
  }, {
    "id": 72,
    "name": "Rhea Higgins",
    "gender": "female",
    "company": "COWTOWN",
    "email": "rheahiggins@cowtown.com",
    "phone": "+1 (972) 467-3015",
    "address": "607 Montauk Avenue, Tyro, South Carolina, 3914",
    "registered": "2014-08-31T19:32:52 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 3861,
    "isActive": false,
    "notes": "Et eiusmod nostrud elit anim laboris voluptate reprehenderit nostrud. Nostrud ea non veniam laboris ipsum qui amet culpa. Et aliqua exercitation esse aute minim ea aliquip magna in amet. Dolor nulla nostrud nostrud sunt exercitation.\r\n"
  }, {
    "id": 73,
    "name": "Sherry Clay",
    "gender": "female",
    "company": "SUREPLEX",
    "email": "sherryclay@sureplex.com",
    "phone": "+1 (902) 519-2648",
    "address": "904 Dewey Place, Foscoe, Michigan, 9009",
    "registered": "2014-03-06T04:02:23 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5339,
    "isActive": true,
    "notes": "Sit fugiat ipsum adipisicing excepteur incididunt enim in pariatur sunt tempor amet nisi et cupidatat. Minim fugiat id anim sit dolor cupidatat ullamco cupidatat anim qui anim reprehenderit. Do consequat non consectetur cillum nulla occaecat est in duis aute pariatur proident. Quis commodo occaecat esse dolore excepteur.\r\n"
  }, {
    "id": 74,
    "name": "Yates Trevino",
    "gender": "male",
    "company": "PYRAMIS",
    "email": "yatestrevino@pyramis.com",
    "phone": "+1 (980) 400-2011",
    "address": "249 Holly Street, Catharine, Connecticut, 8187",
    "registered": "2014-05-07T03:13:51 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 5306,
    "isActive": true,
    "notes": "Dolor occaecat amet minim voluptate enim velit cupidatat. Ea ad officia eu irure. Duis elit esse anim qui. Dolore sunt id est mollit ipsum cupidatat excepteur consequat ea nisi laboris sint anim.\r\n"
  }, {
    "id": 75,
    "name": "Loraine Hampton",
    "gender": "female",
    "company": "EWEVILLE",
    "email": "lorainehampton@eweville.com",
    "phone": "+1 (811) 518-3734",
    "address": "570 Beverly Road, Beaverdale, Marshall Islands, 831",
    "registered": "2014-03-24T04:06:13 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 4265,
    "isActive": true,
    "notes": "Veniam labore proident ea tempor cupidatat minim dolore consectetur. Sit pariatur laboris deserunt sunt duis consectetur elit officia. Aliquip anim veniam ut et eiusmod eiusmod ea pariatur anim deserunt.\r\n"
  }, {
    "id": 76,
    "name": "Rene Lamb",
    "gender": "female",
    "company": "EXOSTREAM",
    "email": "renelamb@exostream.com",
    "phone": "+1 (836) 402-3968",
    "address": "990 Division Place, Woodruff, New Jersey, 9161",
    "registered": "2014-04-25T14:49:46 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6888,
    "isActive": true,
    "notes": "Lorem commodo proident elit do ut. Qui magna reprehenderit in mollit Lorem minim. Consectetur aute aliquip nulla ullamco minim qui labore qui veniam ad veniam occaecat consectetur. Velit mollit dolor velit dolore quis mollit anim occaecat consectetur. In ipsum qui exercitation ipsum.\r\n"
  }, {
    "id": 77,
    "name": "Key Garza",
    "gender": "male",
    "company": "DEMINIMUM",
    "email": "keygarza@deminimum.com",
    "phone": "+1 (833) 451-2308",
    "address": "212 Harrison Avenue, Hillsboro, Federated States Of Micronesia, 3568",
    "registered": "2014-10-06T19:19:15 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 2129,
    "isActive": true,
    "notes": "Incididunt pariatur quis cillum enim tempor commodo labore proident elit dolor sit qui ut. Magna anim aliquip id sunt labore non ex irure minim excepteur consequat eu nostrud. Id consequat anim laboris ad aliqua occaecat.\r\n"
  }, {
    "id": 78,
    "name": "Rosalyn Marshall",
    "gender": "female",
    "company": "DIGIRANG",
    "email": "rosalynmarshall@digirang.com",
    "phone": "+1 (882) 585-3032",
    "address": "155 Eastern Parkway, Ada, Kentucky, 6254",
    "registered": "2014-03-14T07:29:09 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5772,
    "isActive": false,
    "notes": "Ut cillum cillum fugiat aute. Occaecat et sit nisi aliqua esse Lorem incididunt voluptate adipisicing ipsum incididunt esse fugiat ullamco. Labore elit ex ad cillum dolore do irure in cupidatat nulla in sit consectetur. Ut quis eu eiusmod id nostrud culpa exercitation. Incididunt anim sint consequat nisi quis do cillum veniam sunt eiusmod officia cupidatat. Nostrud proident enim reprehenderit dolore amet tempor est laboris cillum aliqua amet irure. Qui laborum qui ipsum do anim irure magna dolore id dolore duis.\r\n"
  }, {
    "id": 79,
    "name": "Roman Chandler",
    "gender": "male",
    "company": "MARKETOID",
    "email": "romanchandler@marketoid.com",
    "phone": "+1 (972) 499-2738",
    "address": "500 Bulwer Place, Jacksonwald, Missouri, 6291",
    "registered": "2014-01-19T05:42:36 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2270,
    "isActive": true,
    "notes": "Quis ad velit non occaecat nulla amet adipisicing pariatur est consectetur mollit consectetur do esse. Occaecat in amet mollit duis Lorem ullamco dolor. Nulla dolore mollit est consequat non ullamco qui est ea excepteur aute.\r\n"
  }, {
    "id": 80,
    "name": "Claudette Casey",
    "gender": "female",
    "company": "ENDICIL",
    "email": "claudettecasey@endicil.com",
    "phone": "+1 (999) 550-2778",
    "address": "277 Crown Street, Dubois, Delaware, 2123",
    "registered": "2014-05-14T16:37:42 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3170,
    "isActive": true,
    "notes": "Excepteur mollit occaecat sint cillum enim officia dolor exercitation consequat cillum laboris. Enim dolore do dolore non pariatur nostrud elit sit do officia ad excepteur. Adipisicing ad deserunt Lorem irure dolore ut consectetur velit enim. Fugiat occaecat sunt elit reprehenderit.\r\n"
  }, {
    "id": 81,
    "name": "Freida Hamilton",
    "gender": "female",
    "company": "CALCU",
    "email": "freidahamilton@calcu.com",
    "phone": "+1 (884) 449-2324",
    "address": "527 Falmouth Street, Hebron, Tennessee, 8044",
    "registered": "2014-02-03T01:27:49 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 4013,
    "isActive": false,
    "notes": "Culpa Lorem enim consequat labore non. Cupidatat reprehenderit laborum anim fugiat officia enim sint sint ex. Laboris aliquip aliquip culpa aute. Ut sint culpa duis dolor culpa anim adipisicing eu. Tempor dolore sit sunt anim dolore do.\r\n"
  }, {
    "id": 82,
    "name": "Parrish Fitzpatrick",
    "gender": "male",
    "company": "STREZZO",
    "email": "parrishfitzpatrick@strezzo.com",
    "phone": "+1 (915) 422-2641",
    "address": "312 Garfield Place, Brazos, American Samoa, 4040",
    "registered": "2014-07-20T00:30:53 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3836,
    "isActive": true,
    "notes": "Nostrud aute culpa voluptate labore sint dolore veniam nulla adipisicing aliqua nisi sit ad. Amet fugiat nisi sint nulla do do id aliqua minim deserunt excepteur dolor. Reprehenderit id sint consequat officia ea ad proident consequat in culpa. Ad proident sit sit anim voluptate labore ipsum do eu proident eiusmod nisi velit.\r\n"
  }, {
    "id": 83,
    "name": "Prince Lopez",
    "gender": "male",
    "company": "WATERBABY",
    "email": "princelopez@waterbaby.com",
    "phone": "+1 (938) 557-2404",
    "address": "523 Lawrence Street, Galesville, Wyoming, 4507",
    "registered": "2014-11-15T11:29:17 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 1962,
    "isActive": true,
    "notes": "Non est et magna magna culpa consequat fugiat in ad magna. Excepteur consequat cillum exercitation ut sit quis cupidatat ipsum voluptate ad ex irure cillum officia. Do fugiat voluptate pariatur consectetur sunt qui ipsum labore exercitation duis culpa esse. Id quis ullamco labore in proident.\r\n"
  }, {
    "id": 84,
    "name": "Carson Avery",
    "gender": "male",
    "company": "LIMOZEN",
    "email": "carsonavery@limozen.com",
    "phone": "+1 (931) 405-3886",
    "address": "813 Garland Court, Kohatk, California, 6455",
    "registered": "2014-08-30T11:08:53 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 2104,
    "isActive": false,
    "notes": "Nostrud ea non velit veniam exercitation excepteur duis velit. Adipisicing proident irure magna reprehenderit ipsum amet ea Lorem occaecat esse ad mollit eiusmod. Officia ad pariatur dolor laborum aliquip pariatur cillum incididunt consequat. Cupidatat dolore ex laborum proident anim. Reprehenderit exercitation eiusmod ut non pariatur Lorem commodo amet deserunt occaecat eu. Consectetur cillum esse est laboris sit est esse proident.\r\n"
  }, {
    "id": 85,
    "name": "Lillian Carlson",
    "gender": "female",
    "company": "ISOSWITCH",
    "email": "lilliancarlson@isoswitch.com",
    "phone": "+1 (926) 528-2425",
    "address": "188 Whitwell Place, Foxworth, North Carolina, 8500",
    "registered": "2014-01-11T19:04:45 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 6880,
    "isActive": true,
    "notes": "Et cupidatat ad veniam culpa consectetur id aliquip. Qui laboris irure cupidatat reprehenderit in ad. Consectetur Lorem nulla laborum consectetur qui sit eiusmod commodo. Velit qui velit elit ut cupidatat excepteur velit et adipisicing incididunt veniam consectetur adipisicing. Qui qui irure enim est amet dolor est exercitation sunt culpa. Et laboris anim nulla cillum et amet minim minim reprehenderit deserunt aute aute magna sit. Ad aliquip sunt consectetur et tempor velit ullamco.\r\n"
  }, {
    "id": 86,
    "name": "Walton Hodges",
    "gender": "male",
    "company": "ACCEL",
    "email": "waltonhodges@accel.com",
    "phone": "+1 (838) 506-3863",
    "address": "306 Arlington Avenue, Vaughn, Colorado, 9638",
    "registered": "2014-03-06T11:31:01 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 3811,
    "isActive": false,
    "notes": "Sit ex amet eu consequat Lorem est magna reprehenderit nulla qui laboris consectetur aute. Est aliquip consectetur incididunt labore occaecat duis elit ullamco eu non tempor laboris. Sint veniam deserunt ad qui nostrud amet reprehenderit esse nulla. Dolor excepteur commodo non voluptate consectetur. Officia exercitation esse irure nisi anim aliqua in qui. Fugiat fugiat officia mollit ea proident occaecat. Mollit proident Lorem esse sint.\r\n"
  }, {
    "id": 87,
    "name": "Alba Mcmahon",
    "gender": "female",
    "company": "PHOTOBIN",
    "email": "albamcmahon@photobin.com",
    "phone": "+1 (912) 507-3790",
    "address": "130 Shale Street, Northchase, Washington, 5698",
    "registered": "2014-05-31T01:25:40 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 4946,
    "isActive": false,
    "notes": "Nisi adipisicing labore occaecat est consequat laborum incididunt velit Lorem est consequat. Laboris pariatur dolor laboris proident dolor commodo elit duis nostrud officia labore. Quis cillum nulla proident aute ea esse laborum reprehenderit occaecat ipsum labore ea laborum. Eu esse qui in et duis ipsum enim elit ad velit commodo cillum reprehenderit minim. Enim est do minim est occaecat ad ad commodo cupidatat occaecat amet mollit.\r\n"
  }, {
    "id": 88,
    "name": "Henry Santos",
    "gender": "male",
    "company": "SYBIXTEX",
    "email": "henrysantos@sybixtex.com",
    "phone": "+1 (902) 575-3554",
    "address": "587 Boardwalk , Cassel, Texas, 3068",
    "registered": "2014-12-27T06:59:39 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 4320,
    "isActive": false,
    "notes": "In consectetur est occaecat non eu nisi nulla ut amet exercitation. Eiusmod voluptate in amet nostrud magna eiusmod quis anim laborum magna. Mollit laborum ut cillum veniam quis quis sit proident. Cupidatat irure laboris consectetur magna incididunt minim ipsum. Consequat ex sint cupidatat anim qui nisi duis quis sunt.\r\n"
  }, {
    "id": 89,
    "name": "Belinda Horne",
    "gender": "female",
    "company": "BLANET",
    "email": "belindahorne@blanet.com",
    "phone": "+1 (828) 508-2350",
    "address": "350 Bassett Avenue, Ivanhoe, Minnesota, 9786",
    "registered": "2014-08-19T00:51:19 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2659,
    "isActive": true,
    "notes": "Enim esse amet reprehenderit et mollit proident officia est duis ea et elit ipsum. Cillum ullamco ad consequat ea aute ut consequat ea ut dolore consequat. Tempor exercitation dolor exercitation aliqua adipisicing nulla nostrud quis. Occaecat deserunt quis nostrud pariatur cupidatat mollit fugiat excepteur labore consequat. Reprehenderit duis veniam sunt eiusmod ut.\r\n"
  }, {
    "id": 90,
    "name": "Ester Chambers",
    "gender": "female",
    "company": "ROCKLOGIC",
    "email": "esterchambers@rocklogic.com",
    "phone": "+1 (840) 590-2403",
    "address": "738 Harbor Lane, Rutherford, Rhode Island, 6292",
    "registered": "2014-01-29T03:10:01 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 5061,
    "isActive": true,
    "notes": "Mollit mollit deserunt duis proident laboris ipsum. Proident enim aliqua tempor enim ea quis deserunt irure sint. Nisi ut mollit eiusmod cillum aliqua officia sint dolor mollit. Lorem aliquip sint incididunt magna consequat aliquip anim excepteur laborum consequat veniam. Culpa qui ut nostrud ipsum. Cillum culpa consequat ut elit deserunt nulla commodo aliqua. Do Lorem irure et occaecat occaecat enim anim.\r\n"
  }, {
    "id": 91,
    "name": "Washington White",
    "gender": "male",
    "company": "ZOMBOID",
    "email": "washingtonwhite@zomboid.com",
    "phone": "+1 (805) 567-2310",
    "address": "970 Goodwin Place, Lithium, Iowa, 5948",
    "registered": "2014-12-31T11:23:11 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 4816,
    "isActive": false,
    "notes": "Id velit mollit veniam consequat quis proident eu proident duis. Do enim officia nisi nisi id anim aliqua ipsum duis quis. Irure ipsum ipsum sint cupidatat officia cupidatat officia veniam eu sit tempor officia ullamco aliqua. Fugiat sit qui pariatur irure tempor Lorem minim veniam.\r\n"
  }, {
    "id": 92,
    "name": "Olson Wolfe",
    "gender": "male",
    "company": "PIVITOL",
    "email": "olsonwolfe@pivitol.com",
    "phone": "+1 (832) 414-3420",
    "address": "309 Elton Street, Abiquiu, Virgin Islands, 4787",
    "registered": "2014-08-13T01:59:33 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 4826,
    "isActive": true,
    "notes": "Do aliquip non sint labore. Elit consectetur ullamco proident in et magna laboris. Deserunt elit veniam id laborum occaecat irure minim in officia voluptate enim reprehenderit. Incididunt deserunt sunt commodo ullamco eiusmod eu dolor.\r\n"
  }, {
    "id": 93,
    "name": "Cristina Cannon",
    "gender": "female",
    "company": "RAMJOB",
    "email": "cristinacannon@ramjob.com",
    "phone": "+1 (886) 559-2560",
    "address": "527 Metrotech Courtr, Frizzleburg, Arkansas, 8183",
    "registered": "2014-10-26T14:58:10 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 2060,
    "isActive": false,
    "notes": "Laborum nulla do et do id eiusmod ullamco proident qui dolore non eu reprehenderit. Laboris ipsum sint qui amet commodo adipisicing in sit sunt. Ex quis ad sunt duis veniam aliquip laboris officia. Ipsum esse dolor quis in nulla labore. Voluptate dolore irure sunt laborum consequat ea consectetur amet consectetur dolor elit.\r\n"
  }, {
    "id": 94,
    "name": "Mcdaniel Pacheco",
    "gender": "male",
    "company": "COSMOSIS",
    "email": "mcdanielpacheco@cosmosis.com",
    "phone": "+1 (857) 572-2166",
    "address": "993 Kathleen Court, Ferney, Puerto Rico, 712",
    "registered": "2014-05-17T10:56:58 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2476,
    "isActive": false,
    "notes": "Consequat aliqua aliquip dolor irure labore duis mollit enim et enim veniam. Nisi et deserunt irure proident in cillum laborum ut adipisicing voluptate. Dolore tempor enim excepteur nisi sunt sunt laboris reprehenderit ex eiusmod ex voluptate. Do do nisi aliqua quis pariatur sunt fugiat aliquip mollit minim. Cillum veniam aliquip culpa excepteur non ad quis adipisicing do laborum.\r\n"
  }, {
    "id": 95,
    "name": "Marks Hopper",
    "gender": "male",
    "company": "DIGITALUS",
    "email": "markshopper@digitalus.com",
    "phone": "+1 (863) 542-3117",
    "address": "972 High Street, Joppa, Oklahoma, 9136",
    "registered": "2014-10-10T12:04:24 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2205,
    "isActive": true,
    "notes": "Commodo in in laborum aute est laborum tempor irure et sunt. Mollit non non pariatur do officia eiusmod dolore adipisicing aliquip pariatur cillum ullamco reprehenderit occaecat. Sunt labore ipsum esse nulla ipsum culpa duis ullamco amet laboris. Tempor deserunt commodo ad consectetur veniam aliqua ut Lorem cupidatat est deserunt ipsum. Velit occaecat aliquip dolor laborum pariatur Lorem ipsum. Voluptate fugiat quis esse et consectetur aliquip id. Sint aliqua nisi duis sint.\r\n"
  }, {
    "id": 96,
    "name": "Lenora Finch",
    "gender": "female",
    "company": "CORMORAN",
    "email": "lenorafinch@cormoran.com",
    "phone": "+1 (881) 443-3871",
    "address": "611 Farragut Road, Crenshaw, Massachusetts, 6936",
    "registered": "2014-09-14T19:25:19 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 5423,
    "isActive": true,
    "notes": "Ex incididunt duis in veniam. Exercitation incididunt aute consectetur ipsum minim dolore labore commodo. Exercitation ullamco ullamco eiusmod ipsum esse sint consequat Lorem consectetur. Laboris officia minim velit in dolor sit.\r\n"
  }, {
    "id": 97,
    "name": "James Alford",
    "gender": "female",
    "company": "EXODOC",
    "email": "jamesalford@exodoc.com",
    "phone": "+1 (900) 598-3755",
    "address": "890 Woodside Avenue, Keller, Maryland, 7051",
    "registered": "2014-03-23T11:18:18 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2609,
    "isActive": true,
    "notes": "Officia dolor minim consectetur Lorem aute voluptate reprehenderit quis sunt. Quis Lorem amet quis in veniam ex duis cupidatat. Ullamco ad in tempor incididunt tempor officia reprehenderit cillum pariatur ut eu et id. Eu eu excepteur consequat mollit nulla proident veniam est dolore aliqua labore id fugiat.\r\n"
  }, {
    "id": 98,
    "name": "Deana Powers",
    "gender": "female",
    "company": "VIDTO",
    "email": "deanapowers@vidto.com",
    "phone": "+1 (869) 514-2256",
    "address": "308 Bills Place, Rosewood, Illinois, 153",
    "registered": "2014-03-24T00:56:53 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 4570,
    "isActive": true,
    "notes": "Et commodo nisi deserunt magna velit velit adipisicing cillum veniam nisi duis. Consequat nisi in reprehenderit veniam ullamco sunt consequat mollit. Enim ea excepteur eiusmod proident laborum consequat.\r\n"
  }, {
    "id": 99,
    "name": "Suzanne Lang",
    "gender": "female",
    "company": "COMCUR",
    "email": "suzannelang@comcur.com",
    "phone": "+1 (873) 543-2037",
    "address": "471 Oceanic Avenue, Waterview, Vermont, 9125",
    "registered": "2014-10-29T08:11:56 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 3442,
    "isActive": false,
    "notes": "In adipisicing culpa duis labore dolor consequat ea irure anim. Nisi ad nostrud mollit cillum magna adipisicing non aliqua cupidatat eiusmod quis pariatur. Id ullamco ipsum ad exercitation do amet eu ut incididunt fugiat minim labore. Irure ipsum nisi sunt adipisicing ad sit velit. Ullamco cillum non non amet irure occaecat laboris labore laboris nulla anim.\r\n"
  }, {
    "id": 100,
    "name": "Laura Franks",
    "gender": "female",
    "company": "EQUITAX",
    "email": "laurafranks@equitax.com",
    "phone": "+1 (836) 448-3816",
    "address": "559 Bay Avenue, Wescosville, Louisiana, 6358",
    "registered": "2014-06-13T21:14:41 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6842,
    "isActive": true,
    "notes": "Ad amet enim laborum minim aliquip cupidatat ullamco. Sint deserunt ex esse labore culpa reprehenderit aute aliquip qui duis ut ipsum. Proident duis minim enim ut id pariatur. Aliquip consectetur in minim cupidatat nisi adipisicing irure anim ipsum. Incididunt officia ex nostrud quis occaecat Lorem sunt sunt irure culpa labore esse occaecat.\r\n"
  }, {
    "id": 101,
    "name": "Griffith Burris",
    "gender": "male",
    "company": "UXMOX",
    "email": "griffithburris@uxmox.com",
    "phone": "+1 (967) 407-2992",
    "address": "659 Lefferts Place, Smock, Georgia, 1226",
    "registered": "2014-09-08T03:24:28 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 5614,
    "isActive": true,
    "notes": "Ea deserunt adipisicing pariatur sit ea officia excepteur cillum ad consequat ut mollit. Eu consequat esse incididunt commodo irure in. Qui voluptate veniam aliqua quis dolore magna anim voluptate ea. Nostrud proident magna do elit cillum elit labore sunt veniam. Veniam reprehenderit amet dolor proident aliqua dolore. Nisi velit amet duis anim aliquip sunt.\r\n"
  }, {
    "id": 102,
    "name": "Clara Ellison",
    "gender": "female",
    "company": "ACCUSAGE",
    "email": "claraellison@accusage.com",
    "phone": "+1 (918) 406-2854",
    "address": "195 Havemeyer Street, Websterville, New Hampshire, 3933",
    "registered": "2014-05-16T19:19:11 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 2598,
    "isActive": false,
    "notes": "Nisi voluptate cillum velit anim adipisicing ea duis sint ut enim exercitation aliqua dolor. Deserunt consequat est aliquip cillum tempor eiusmod mollit amet. Duis occaecat duis in consequat sit laborum do minim anim ullamco esse veniam consectetur. Excepteur ullamco elit Lorem minim aute sint est.\r\n"
  }, {
    "id": 103,
    "name": "Murphy Lindsey",
    "gender": "male",
    "company": "ZOLAREX",
    "email": "murphylindsey@zolarex.com",
    "phone": "+1 (970) 466-3800",
    "address": "253 Suydam Street, Roosevelt, South Dakota, 7535",
    "registered": "2014-12-26T00:40:13 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3547,
    "isActive": false,
    "notes": "Voluptate cupidatat eiusmod in qui duis cillum deserunt proident nostrud mollit dolore. Minim magna laborum labore laborum ullamco veniam velit culpa veniam elit proident. Ullamco minim ullamco excepteur laborum in veniam officia. Velit eiusmod voluptate laboris id exercitation sunt laborum magna et ut. Quis labore qui dolor laboris velit.\r\n"
  }, {
    "id": 104,
    "name": "Tammy Wood",
    "gender": "female",
    "company": "COMTENT",
    "email": "tammywood@comtent.com",
    "phone": "+1 (976) 490-3228",
    "address": "452 Hicks Street, Fresno, Pennsylvania, 503",
    "registered": "2014-10-13T12:27:29 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 3814,
    "isActive": false,
    "notes": "Cillum enim qui Lorem tempor Lorem culpa nostrud id adipisicing nostrud in id nostrud quis. Tempor eiusmod enim nisi dolore eu elit commodo deserunt et commodo quis id. Laborum excepteur aliqua in anim enim amet aute proident laborum. Nisi amet culpa in quis ullamco minim ipsum nulla fugiat sunt minim consequat ex. Fugiat et pariatur deserunt veniam labore tempor sit adipisicing in cillum nisi tempor cillum. Irure dolor ad deserunt adipisicing ad consectetur ullamco eu.\r\n"
  }, {
    "id": 105,
    "name": "Frieda Juarez",
    "gender": "female",
    "company": "VANTAGE",
    "email": "friedajuarez@vantage.com",
    "phone": "+1 (826) 544-2869",
    "address": "756 Oxford Walk, Martell, Indiana, 9979",
    "registered": "2014-08-26T21:32:29 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3511,
    "isActive": false,
    "notes": "Commodo culpa culpa eiusmod esse voluptate ipsum sit nostrud. Elit velit magna laborum laborum commodo ad incididunt id elit eiusmod mollit et dolor est. Fugiat Lorem incididunt velit sit consequat aute tempor labore qui non pariatur. Anim sit reprehenderit incididunt exercitation ipsum eu cillum voluptate do ad. Commodo duis ex deserunt non magna dolore.\r\n"
  }, {
    "id": 106,
    "name": "Shannon Suarez",
    "gender": "female",
    "company": "MAGNEMO",
    "email": "shannonsuarez@magnemo.com",
    "phone": "+1 (883) 528-3619",
    "address": "831 Coffey Street, Conway, Kansas, 6662",
    "registered": "2014-07-14T05:37:58 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 2929,
    "isActive": false,
    "notes": "Pariatur reprehenderit elit dolore aliquip esse aliqua Lorem dolore mollit eu id consequat ex. Pariatur proident ullamco ullamco amet eu proident laborum non Lorem amet eu sint excepteur. Sint fugiat adipisicing non in laboris dolore officia cupidatat nisi amet.\r\n"
  }, {
    "id": 107,
    "name": "Bowen Cohen",
    "gender": "male",
    "company": "EARGO",
    "email": "bowencohen@eargo.com",
    "phone": "+1 (886) 535-2042",
    "address": "128 Ryder Street, Navarre, Virginia, 8936",
    "registered": "2014-02-23T10:28:45 -00:00",
    "preferredBike": "A classy bike",
    "bikePoints": 2144,
    "isActive": true,
    "notes": "Ad nostrud sint eiusmod quis. Duis ea anim elit ex tempor ad sit. Aute mollit incididunt irure elit consectetur reprehenderit duis ut aute veniam. Sunt id minim sint elit non. Deserunt dolor mollit in fugiat incididunt ea commodo.\r\n"
  }, {
    "id": 108,
    "name": "Michele Sanchez",
    "gender": "female",
    "company": "MOREGANIC",
    "email": "michelesanchez@moreganic.com",
    "phone": "+1 (850) 501-2199",
    "address": "520 Clay Street, Harviell, North Dakota, 9709",
    "registered": "2014-08-06T09:52:35 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 5817,
    "isActive": false,
    "notes": "Tempor amet mollit reprehenderit fugiat. Fugiat duis minim pariatur mollit ut velit nostrud reprehenderit cillum eu non. Elit culpa velit qui sunt Lorem non. Esse et magna pariatur labore magna voluptate duis magna.\r\n"
  }, {
    "id": 109,
    "name": "Lupe Yang",
    "gender": "female",
    "company": "DIGIFAD",
    "email": "lupeyang@digifad.com",
    "phone": "+1 (899) 559-3089",
    "address": "985 Drew Street, Laurelton, Oregon, 6980",
    "registered": "2014-01-11T20:02:21 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 4412,
    "isActive": false,
    "notes": "Duis ut enim aute aute proident Lorem ullamco irure exercitation cillum. Id incididunt dolore excepteur consequat veniam cupidatat irure ullamco ut ex aliqua. Dolor enim enim id culpa nisi proident in ullamco amet magna velit proident duis. Elit eiusmod velit non et in voluptate duis consequat cupidatat eu.\r\n"
  }, {
    "id": 110,
    "name": "Andrews Richardson",
    "gender": "male",
    "company": "ISOLOGICA",
    "email": "andrewsrichardson@isologica.com",
    "phone": "+1 (812) 540-3100",
    "address": "919 Madoc Avenue, Caroline, Utah, 3195",
    "registered": "2014-09-04T22:27:08 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6411,
    "isActive": true,
    "notes": "Cupidatat ut id est fugiat officia non mollit cupidatat id. Eiusmod nostrud deserunt reprehenderit Lorem exercitation eiusmod eu. Tempor eu eiusmod mollit exercitation aliqua esse laborum nisi cupidatat fugiat. Ea cupidatat mollit amet sunt adipisicing occaecat id consectetur commodo sit excepteur.\r\n"
  }, {
    "id": 111,
    "name": "Lelia Valdez",
    "gender": "female",
    "company": "OTHERSIDE",
    "email": "leliavaldez@otherside.com",
    "phone": "+1 (925) 538-2899",
    "address": "745 Cortelyou Road, Downsville, Nebraska, 3808",
    "registered": "2014-01-19T06:03:56 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5587,
    "isActive": false,
    "notes": "Ad enim fugiat est occaecat anim dolor duis cillum nulla. Labore laborum deserunt consectetur aute do ea. Fugiat occaecat nulla ad quis esse esse dolor anim occaecat exercitation incididunt ut. Minim aliqua aliqua ea quis veniam aliquip quis anim labore ipsum aute commodo. Pariatur nostrud sint laborum reprehenderit commodo ad.\r\n"
  }, {
    "id": 112,
    "name": "Strickland Sullivan",
    "gender": "male",
    "company": "TETAK",
    "email": "stricklandsullivan@tetak.com",
    "phone": "+1 (939) 527-3280",
    "address": "127 Dunne Court, Taft, New York, 847",
    "registered": "2014-05-17T12:48:06 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 1003,
    "isActive": true,
    "notes": "Sit sit sunt sint est nulla reprehenderit nostrud labore quis. Velit Lorem proident aliquip irure amet quis mollit. Enim culpa ipsum velit non consectetur amet non ut.\r\n"
  }, {
    "id": 113,
    "name": "Olivia Le",
    "gender": "female",
    "company": "QUIZKA",
    "email": "oliviale@quizka.com",
    "phone": "+1 (807) 542-3407",
    "address": "789 Woodpoint Road, Hoehne, New Mexico, 9238",
    "registered": "2014-10-05T00:51:18 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 3987,
    "isActive": true,
    "notes": "Aute do fugiat in ex deserunt non magna ex et do id cillum nostrud. Amet occaecat aliquip voluptate et amet aliquip ex nulla dolore ex consectetur sit. Commodo culpa excepteur aliqua elit esse ipsum minim. Tempor eu elit eu eu minim dolore do occaecat non esse non aliquip esse et. Reprehenderit nisi nostrud quis veniam pariatur ea eu cupidatat Lorem eiusmod ullamco officia in ullamco. Adipisicing ad consectetur occaecat eu nulla aliquip cupidatat nisi.\r\n"
  }, {
    "id": 114,
    "name": "Wanda Mercer",
    "gender": "female",
    "company": "NITRACYR",
    "email": "wandamercer@nitracyr.com",
    "phone": "+1 (993) 600-2446",
    "address": "982 Elliott Walk, Bawcomville, Alaska, 328",
    "registered": "2014-04-26T23:34:49 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 5170,
    "isActive": false,
    "notes": "Consectetur culpa incididunt do elit nostrud nostrud occaecat ex. Ex ad velit id excepteur elit eu pariatur et quis magna. Velit sit ipsum dolore sint mollit et exercitation esse dolor sint. Duis magna qui eiusmod sit exercitation et consectetur ad non exercitation. Est dolor id tempor sint qui non culpa tempor ex exercitation occaecat.\r\n"
  }, {
    "id": 115,
    "name": "Gloria Schmidt",
    "gender": "female",
    "company": "DUFLEX",
    "email": "gloriaschmidt@duflex.com",
    "phone": "+1 (801) 531-3841",
    "address": "455 Lake Street, Chelsea, Montana, 9398",
    "registered": "2014-08-24T00:26:04 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 2691,
    "isActive": false,
    "notes": "Nostrud commodo amet aute Lorem sint minim dolor exercitation reprehenderit. Aute non mollit voluptate eu. Ut culpa sit adipisicing magna id velit eiusmod. Eiusmod voluptate veniam sint aute pariatur elit pariatur. Ea culpa ut anim consectetur consectetur dolor.\r\n"
  }, {
    "id": 116,
    "name": "Lester Dale",
    "gender": "male",
    "company": "BUZZWORKS",
    "email": "lesterdale@buzzworks.com",
    "phone": "+1 (853) 414-2122",
    "address": "210 Madison Place, Loomis, Maine, 5246",
    "registered": "2014-05-10T14:18:02 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 6228,
    "isActive": true,
    "notes": "Non aute sint laborum dolore. Do tempor laboris magna elit. Ullamco in enim ea id duis anim officia. Ea enim et do ex elit id. Aliqua proident ad ad eiusmod. Do tempor consectetur duis amet tempor. Mollit velit consectetur id excepteur nostrud esse ullamco in.\r\n"
  }, {
    "id": 117,
    "name": "Herring Small",
    "gender": "male",
    "company": "MYOPIUM",
    "email": "herringsmall@myopium.com",
    "phone": "+1 (964) 569-3687",
    "address": "180 Canal Avenue, Sharon, Idaho, 3797",
    "registered": "2015-01-10T02:50:59 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 4352,
    "isActive": true,
    "notes": "Ipsum elit officia deserunt enim cillum ex quis voluptate incididunt aute enim exercitation laboris. Id ex et ea sint aliquip ut commodo et ea pariatur occaecat. Non exercitation et ex ullamco reprehenderit occaecat do nostrud sit laborum aliqua aliquip aute. Irure esse incididunt sit officia. Consequat anim cillum Lorem anim laboris adipisicing nulla id.\r\n"
  }, {
    "id": 118,
    "name": "Roxie Cameron",
    "gender": "female",
    "company": "DOGTOWN",
    "email": "roxiecameron@dogtown.com",
    "phone": "+1 (914) 510-2152",
    "address": "683 Belvidere Street, Chautauqua, Northern Mariana Islands, 5116",
    "registered": "2014-02-02T21:09:19 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 4414,
    "isActive": false,
    "notes": "Sint cillum reprehenderit ullamco aute sit esse duis sint et veniam. Aliqua ex irure voluptate ad veniam do sit consequat eu deserunt labore. Aute excepteur sint sit enim eu velit. Irure anim tempor duis id tempor cillum nostrud quis labore.\r\n"
  }, {
    "id": 119,
    "name": "Morrow Kim",
    "gender": "male",
    "company": "SATIANCE",
    "email": "morrowkim@satiance.com",
    "phone": "+1 (963) 550-3376",
    "address": "439 Canarsie Road, Roland, Mississippi, 4734",
    "registered": "2014-10-19T12:38:10 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 4293,
    "isActive": false,
    "notes": "Ex dolor ipsum excepteur exercitation in do culpa consectetur nisi culpa. Anim exercitation eu est eu qui aute velit occaecat labore enim reprehenderit laboris consectetur elit. Consequat tempor laboris adipisicing Lorem aliqua. Cillum ea adipisicing fugiat ut. Non sit non eu ut deserunt ullamco velit. Nulla proident voluptate aliquip et id eiusmod occaecat.\r\n"
  }, {
    "id": 120,
    "name": "Sampson Conley",
    "gender": "male",
    "company": "ACCRUEX",
    "email": "sampsonconley@accruex.com",
    "phone": "+1 (899) 551-2535",
    "address": "889 Lewis Avenue, Floriston, Nevada, 3188",
    "registered": "2014-07-22T11:02:38 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2366,
    "isActive": false,
    "notes": "Officia exercitation consequat aute minim quis irure esse consectetur amet voluptate dolor eu ex consequat. Ipsum labore aute ad nostrud duis qui deserunt laboris. Minim in consequat elit ut ut consequat ad sunt voluptate exercitation commodo laboris culpa. Lorem occaecat aliqua non magna enim eiusmod pariatur proident elit enim in id. Adipisicing eiusmod adipisicing et aliqua qui Lorem Lorem nisi est. Officia officia anim magna velit enim velit ipsum nulla occaecat voluptate. Culpa est exercitation duis aliqua et aliqua.\r\n"
  }, {
    "id": 121,
    "name": "Kim Martin",
    "gender": "male",
    "company": "FURNAFIX",
    "email": "kimmartin@furnafix.com",
    "phone": "+1 (938) 502-3804",
    "address": "624 Apollo Street, Spokane, Ohio, 5764",
    "registered": "2014-04-15T19:54:04 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6502,
    "isActive": true,
    "notes": "Ipsum incididunt nisi sint laborum aute sunt culpa reprehenderit id. Incididunt exercitation magna quis nisi culpa in pariatur. Non officia anim anim ipsum proident non proident nisi tempor excepteur nulla irure.\r\n"
  }, {
    "id": 122,
    "name": "Preston Singleton",
    "gender": "male",
    "company": "ENJOLA",
    "email": "prestonsingleton@enjola.com",
    "phone": "+1 (800) 453-2283",
    "address": "161 Ocean Parkway, Robbins, Arizona, 7017",
    "registered": "2015-01-13T18:03:55 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5308,
    "isActive": true,
    "notes": "Amet nisi quis cupidatat mollit. Excepteur mollit magna occaecat proident proident cupidatat dolor quis voluptate aliqua pariatur officia aliquip adipisicing. Ex ut ullamco amet nulla aliqua labore laboris mollit. Sint sint deserunt ut cupidatat exercitation aliquip nostrud non ad consectetur ut ea id. Veniam veniam deserunt cillum aliquip nisi do exercitation aliqua elit consequat sint culpa nisi nulla. Sint voluptate id Lorem ea mollit labore.\r\n"
  }, {
    "id": 123,
    "name": "Lillie Delaney",
    "gender": "female",
    "company": "EZENTIA",
    "email": "lilliedelaney@ezentia.com",
    "phone": "+1 (810) 503-2859",
    "address": "321 Dare Court, Sussex, Hawaii, 2769",
    "registered": "2014-03-06T06:33:28 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 4466,
    "isActive": false,
    "notes": "Fugiat sint fugiat laboris aliqua. Dolore officia esse eu in dolore aliquip adipisicing. Fugiat consequat officia ex qui adipisicing minim nisi quis magna eu Lorem enim reprehenderit eu. Sit duis ullamco ea ut reprehenderit id eiusmod cillum ipsum. Magna et voluptate magna cillum eiusmod adipisicing aute mollit duis ad Lorem. Duis culpa culpa nisi in.\r\n"
  }, {
    "id": 124,
    "name": "Geneva Finley",
    "gender": "female",
    "company": "PULZE",
    "email": "genevafinley@pulze.com",
    "phone": "+1 (994) 442-2248",
    "address": "318 Mayfair Drive, Gerton, Florida, 9777",
    "registered": "2014-09-25T21:37:55 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 3385,
    "isActive": false,
    "notes": "Do eu quis labore deserunt do sint. Duis in culpa cillum ullamco veniam. Laborum laborum sint in labore id. Mollit mollit ad aliqua eiusmod Lorem Lorem non magna tempor. Eiusmod fugiat ad deserunt ullamco mollit minim irure culpa. Exercitation laborum duis qui in anim aute ut nisi irure ad veniam. Aliquip id pariatur exercitation eu anim deserunt eu culpa mollit dolore amet et qui.\r\n"
  }, {
    "id": 125,
    "name": "Christy Weaver",
    "gender": "female",
    "company": "ACRODANCE",
    "email": "christyweaver@acrodance.com",
    "phone": "+1 (970) 461-3199",
    "address": "963 Sunnyside Avenue, Henrietta, Wisconsin, 8537",
    "registered": "2014-06-30T23:19:13 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 3881,
    "isActive": true,
    "notes": "Adipisicing eiusmod tempor eu est anim ipsum commodo. Labore qui consectetur velit quis aliqua dolore ex eiusmod proident. Dolore pariatur consequat aute sint enim ad voluptate cupidatat velit adipisicing Lorem. Irure aliquip minim enim consectetur exercitation magna ea irure incididunt veniam. Enim consectetur aliqua sit nostrud excepteur cillum id minim et Lorem amet eiusmod exercitation. Adipisicing qui sunt consequat qui nisi ullamco irure veniam dolor.\r\n"
  }, {
    "id": 126,
    "name": "Phoebe Berg",
    "gender": "female",
    "company": "VIAGRAND",
    "email": "phoebeberg@viagrand.com",
    "phone": "+1 (998) 516-3165",
    "address": "543 Chestnut Street, Fillmore, Guam, 6191",
    "registered": "2014-05-03T20:41:34 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 6920,
    "isActive": false,
    "notes": "Aliqua id aliquip nulla sit reprehenderit excepteur duis reprehenderit ad pariatur laboris cillum duis sunt. Sit est esse dolor ad nulla commodo qui consectetur non id quis consequat mollit pariatur. Elit commodo deserunt laborum mollit nisi voluptate ea laboris pariatur et fugiat commodo mollit dolor. Minim excepteur anim mollit labore. Enim proident cillum nulla occaecat irure ex ipsum aute ex proident.\r\n"
  }, {
    "id": 127,
    "name": "Celeste Mccormick",
    "gender": "female",
    "company": "TECHADE",
    "email": "celestemccormick@techade.com",
    "phone": "+1 (939) 587-2679",
    "address": "242 Himrod Street, Nelson, Palau, 465",
    "registered": "2015-01-10T15:34:31 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 1813,
    "isActive": true,
    "notes": "Cupidatat quis qui eiusmod ullamco dolor ipsum eu cillum proident fugiat. Anim commodo exercitation minim anim sunt consectetur. Nisi labore exercitation nisi nisi ad. Aliquip ex aute ex cillum adipisicing. Aliqua ex qui dolore consequat occaecat ad esse ullamco dolor ullamco nulla. Veniam culpa officia sint commodo adipisicing ex officia non esse incididunt ea. Do velit do velit in consectetur commodo nulla consequat in.\r\n"
  }, {
    "id": 128,
    "name": "John Hudson",
    "gender": "female",
    "company": "DEVILTOE",
    "email": "johnhudson@deviltoe.com",
    "phone": "+1 (842) 492-3792",
    "address": "992 Metropolitan Avenue, Kent, District Of Columbia, 4307",
    "registered": "2014-09-24T18:49:23 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 1712,
    "isActive": false,
    "notes": "Officia nulla amet ex ullamco sint dolore dolore ullamco. Cupidatat incididunt culpa officia ad aliquip consequat qui sit aute adipisicing. Et elit aute dolor proident Lorem ipsum incididunt labore officia dolor.\r\n"
  }, {
    "id": 129,
    "name": "Gamble Alston",
    "gender": "male",
    "company": "OPPORTECH",
    "email": "gamblealston@opportech.com",
    "phone": "+1 (952) 537-2558",
    "address": "657 Delmonico Place, Jacumba, Alabama, 4099",
    "registered": "2014-03-19T00:29:21 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 6617,
    "isActive": false,
    "notes": "Aute tempor enim dolore excepteur consequat in eu elit occaecat sint ex sit. Esse commodo duis est nulla nostrud duis quis incididunt. Nisi fugiat tempor non magna mollit sunt magna sunt proident. Et ex in consectetur Lorem. Reprehenderit dolor id minim reprehenderit tempor eu deserunt reprehenderit in laboris Lorem dolore.\r\n"
  }, {
    "id": 130,
    "name": "Branch Berry",
    "gender": "male",
    "company": "ORBIFLEX",
    "email": "branchberry@orbiflex.com",
    "phone": "+1 (901) 447-3349",
    "address": "379 Seagate Avenue, Bethany, South Carolina, 1759",
    "registered": "2014-06-09T09:01:43 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 4206,
    "isActive": true,
    "notes": "Laborum fugiat veniam deserunt commodo non quis ipsum aute aute. Lorem aliqua duis voluptate sunt nulla quis laboris elit minim. Reprehenderit voluptate reprehenderit dolor irure laboris officia irure sit dolore pariatur culpa proident esse. Dolor proident exercitation reprehenderit occaecat ipsum excepteur tempor. Et enim laboris aliqua et sit consectetur labore.\r\n"
  }, {
    "id": 131,
    "name": "Osborne Hurst",
    "gender": "male",
    "company": "EVENTAGE",
    "email": "osbornehurst@eventage.com",
    "phone": "+1 (978) 489-3747",
    "address": "205 Anthony Street, Rosine, Michigan, 2431",
    "registered": "2014-04-22T00:39:51 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 6450,
    "isActive": false,
    "notes": "Labore do aute sit anim fugiat cillum consectetur aliqua ullamco sit officia proident nisi consequat. Consectetur veniam aute exercitation dolore voluptate velit consequat labore consequat. Sit sint anim minim in ullamco excepteur reprehenderit labore velit eiusmod. Eiusmod laborum proident do occaecat adipisicing deserunt ex fugiat tempor excepteur aliqua in. Aliqua enim culpa esse labore qui elit anim dolore do Lorem excepteur esse ex. Tempor pariatur cillum tempor est occaecat in velit elit proident magna officia.\r\n"
  }, {
    "id": 132,
    "name": "Casandra Sargent",
    "gender": "female",
    "company": "KOOGLE",
    "email": "casandrasargent@koogle.com",
    "phone": "+1 (989) 492-2459",
    "address": "734 Carlton Avenue, Jennings, Connecticut, 6042",
    "registered": "2014-08-29T18:24:02 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2606,
    "isActive": true,
    "notes": "In excepteur consectetur exercitation ut amet tempor magna non commodo. Velit est cupidatat elit proident occaecat adipisicing tempor aute minim pariatur sit do. Sunt qui do nisi veniam amet excepteur minim. Elit aute culpa culpa ut velit velit labore ex. Labore minim enim veniam voluptate dolore ullamco cupidatat nostrud est officia voluptate nostrud pariatur officia. Duis laborum velit velit ad esse nisi duis.\r\n"
  }, {
    "id": 133,
    "name": "Macdonald Lester",
    "gender": "male",
    "company": "NAMEGEN",
    "email": "macdonaldlester@namegen.com",
    "phone": "+1 (986) 537-3003",
    "address": "217 Clarkson Avenue, Caspar, Marshall Islands, 3212",
    "registered": "2014-09-09T02:56:33 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 1729,
    "isActive": true,
    "notes": "Ipsum esse cupidatat occaecat officia dolore occaecat anim eiusmod excepteur adipisicing est minim voluptate sint. Cillum dolor amet esse dolore cupidatat officia voluptate in proident nisi nisi ut amet. Ullamco reprehenderit consequat veniam et labore adipisicing aliqua aliqua ex anim sint magna excepteur dolor.\r\n"
  }, {
    "id": 134,
    "name": "Ollie Crawford",
    "gender": "female",
    "company": "VIOCULAR",
    "email": "olliecrawford@viocular.com",
    "phone": "+1 (840) 438-3107",
    "address": "155 Colonial Road, Lewis, New Jersey, 1874",
    "registered": "2014-07-24T11:51:26 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 1639,
    "isActive": false,
    "notes": "Tempor incididunt est aliquip dolor laboris quis magna velit laboris quis sunt exercitation. Excepteur reprehenderit fugiat ad fugiat est ex esse labore. Non eu do in id nisi duis cillum nulla cillum velit voluptate.\r\n"
  }, {
    "id": 135,
    "name": "Andrea Mclean",
    "gender": "female",
    "company": "METROZ",
    "email": "andreamclean@metroz.com",
    "phone": "+1 (999) 505-2860",
    "address": "800 Lott Avenue, Dragoon, Federated States Of Micronesia, 4396",
    "registered": "2015-01-13T00:48:55 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 4207,
    "isActive": false,
    "notes": "Deserunt cillum consectetur labore enim qui sunt ea reprehenderit duis amet ex incididunt ea. Et consectetur officia amet labore nostrud anim dolore in enim ex incididunt cillum. Ex eu voluptate sit magna adipisicing enim id. Exercitation consequat in proident ut.\r\n"
  }, {
    "id": 136,
    "name": "Gomez Ford",
    "gender": "male",
    "company": "COMVEYOR",
    "email": "gomezford@comveyor.com",
    "phone": "+1 (882) 557-3001",
    "address": "174 Woodhull Street, Cobbtown, Kentucky, 1137",
    "registered": "2014-07-31T15:56:56 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 5732,
    "isActive": false,
    "notes": "Ea qui commodo et incididunt. Sunt elit sunt amet Lorem dolor deserunt esse elit magna sunt enim voluptate et quis. Sunt qui Lorem esse anim deserunt ipsum aliquip dolore officia sunt ea eu quis. Et consequat culpa qui nisi sunt sit nulla voluptate ut fugiat. Nisi magna laboris occaecat laboris nisi in cillum in.\r\n"
  }, {
    "id": 137,
    "name": "Mathis Kirby",
    "gender": "male",
    "company": "VICON",
    "email": "mathiskirby@vicon.com",
    "phone": "+1 (929) 439-2520",
    "address": "706 Gerritsen Avenue, Warsaw, Missouri, 3534",
    "registered": "2014-11-29T21:18:20 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5512,
    "isActive": true,
    "notes": "Ea dolor irure quis sunt do eiusmod qui minim qui consequat enim elit duis. Minim sit consectetur mollit est proident est reprehenderit adipisicing sunt. Irure eiusmod amet exercitation officia ad minim Lorem enim. Id quis dolor minim eu.\r\n"
  }, {
    "id": 138,
    "name": "Ila Mcclure",
    "gender": "female",
    "company": "COMTRAIL",
    "email": "ilamcclure@comtrail.com",
    "phone": "+1 (928) 600-2573",
    "address": "882 Newel Street, Oceola, Delaware, 7922",
    "registered": "2014-03-13T15:27:07 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 1532,
    "isActive": false,
    "notes": "Velit id eiusmod eu excepteur id nulla dolor quis labore consequat id amet enim. Esse laborum est magna amet excepteur eiusmod labore ad id exercitation quis. Ullamco quis ipsum proident fugiat cupidatat. Voluptate ipsum commodo culpa eu commodo eu proident qui veniam. Excepteur eiusmod cillum irure commodo commodo id. Labore laboris Lorem magna est aliqua eiusmod.\r\n"
  }, {
    "id": 139,
    "name": "Ortega Osborn",
    "gender": "male",
    "company": "POLARAX",
    "email": "ortegaosborn@polarax.com",
    "phone": "+1 (936) 568-2467",
    "address": "877 India Street, Idamay, Tennessee, 1578",
    "registered": "2014-07-27T10:32:12 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2550,
    "isActive": true,
    "notes": "Esse aliquip fugiat ex magna. Deserunt esse incididunt occaecat ipsum pariatur quis do elit id esse minim. In minim deserunt veniam eu eu id ea occaecat consectetur cillum quis exercitation. Excepteur voluptate elit aliquip eu dolore adipisicing Lorem esse enim commodo. Anim sit Lorem non ullamco nostrud in adipisicing veniam ex ex anim reprehenderit. Eu adipisicing irure enim aute pariatur ex occaecat irure consectetur labore enim dolor pariatur. Velit duis sunt ea do cillum.\r\n"
  }, {
    "id": 140,
    "name": "Raquel Smith",
    "gender": "female",
    "company": "GYNKO",
    "email": "raquelsmith@gynko.com",
    "phone": "+1 (862) 521-3882",
    "address": "606 Bevy Court, Sparkill, American Samoa, 2640",
    "registered": "2014-06-12T09:24:16 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 6697,
    "isActive": true,
    "notes": "Est do culpa sint nisi quis Lorem aute culpa qui id magna elit. Occaecat excepteur irure et do occaecat commodo est deserunt dolore. Minim non Lorem ea laboris commodo officia nisi ad veniam ipsum enim excepteur. Consectetur ad in non cillum incididunt enim id ipsum consequat aliquip reprehenderit ea labore elit. Tempor enim ipsum officia qui nostrud eu consectetur excepteur amet aliqua pariatur nostrud ipsum.\r\n"
  }, {
    "id": 141,
    "name": "Lavonne Brewer",
    "gender": "female",
    "company": "CORPORANA",
    "email": "lavonnebrewer@corporana.com",
    "phone": "+1 (924) 401-2206",
    "address": "113 Emerald Street, Elizaville, Wyoming, 7400",
    "registered": "2014-10-29T04:20:16 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 1172,
    "isActive": true,
    "notes": "Adipisicing ex veniam culpa veniam Lorem commodo ex non adipisicing quis quis mollit. Fugiat anim velit quis ipsum mollit nulla dolor laboris. Esse est laboris sint et quis sint ullamco esse ex eu.\r\n"
  }, {
    "id": 142,
    "name": "Pruitt Hahn",
    "gender": "male",
    "company": "ZIALACTIC",
    "email": "pruitthahn@zialactic.com",
    "phone": "+1 (985) 582-2481",
    "address": "876 Dobbin Street, Datil, California, 8842",
    "registered": "2014-07-14T03:47:19 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 6888,
    "isActive": false,
    "notes": "Proident ipsum do id enim in eiusmod mollit enim qui sit. Esse proident nostrud qui ut anim ea et nostrud non amet aliquip pariatur nulla. Incididunt laborum fugiat qui tempor elit voluptate laborum veniam ipsum sit laboris nisi. Aliquip enim ullamco aliqua cupidatat. Sit mollit qui ad culpa Lorem culpa cillum mollit. Excepteur amet dolore magna magna cupidatat minim ipsum nulla.\r\n"
  }, {
    "id": 143,
    "name": "Torres Foster",
    "gender": "male",
    "company": "EVIDENDS",
    "email": "torresfoster@evidends.com",
    "phone": "+1 (901) 404-3257",
    "address": "724 Coles Street, Knowlton, North Carolina, 8840",
    "registered": "2014-11-18T23:29:32 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3645,
    "isActive": false,
    "notes": "Mollit laborum voluptate incididunt Lorem adipisicing minim mollit. Minim do ullamco ad nisi Lorem ipsum. In deserunt elit incididunt eiusmod velit laboris labore enim quis sit esse. Aliquip sunt aliqua incididunt laborum commodo irure. Deserunt nisi voluptate sunt id ut cillum commodo sit. Pariatur laboris minim laborum pariatur.\r\n"
  }, {
    "id": 144,
    "name": "Phillips Coleman",
    "gender": "male",
    "company": "SOLGAN",
    "email": "phillipscoleman@solgan.com",
    "phone": "+1 (936) 429-3669",
    "address": "951 Gilmore Court, Brownlee, Colorado, 9368",
    "registered": "2014-02-11T18:34:58 -00:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1906,
    "isActive": false,
    "notes": "Excepteur labore irure minim occaecat pariatur. Magna consequat magna eu aliquip ut id anim sint minim sit. Laborum qui proident anim excepteur pariatur cupidatat eu.\r\n"
  }, {
    "id": 145,
    "name": "Mitzi Knox",
    "gender": "female",
    "company": "ZOINAGE",
    "email": "mitziknox@zoinage.com",
    "phone": "+1 (922) 600-2422",
    "address": "739 Brooklyn Avenue, Ladera, Washington, 1356",
    "registered": "2014-12-16T15:29:53 -00:00",
    "preferredBike": "A classy bike",
    "bikePoints": 3162,
    "isActive": false,
    "notes": "Eiusmod ipsum nostrud ipsum proident dolore. Anim quis cupidatat velit elit labore. Commodo reprehenderit dolore deserunt ipsum mollit nostrud. Eu laboris nisi commodo fugiat. Proident consequat cupidatat mollit incididunt ex tempor commodo voluptate veniam. Magna dolor commodo et velit nisi magna sunt occaecat sit labore labore veniam commodo. Culpa proident qui cupidatat magna culpa nostrud labore exercitation Lorem commodo Lorem.\r\n"
  }, {
    "id": 146,
    "name": "Christine Mcknight",
    "gender": "female",
    "company": "SULFAX",
    "email": "christinemcknight@sulfax.com",
    "phone": "+1 (856) 423-2624",
    "address": "748 Bartlett Street, Wilmington, Texas, 3675",
    "registered": "2014-06-07T09:56:32 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 5848,
    "isActive": false,
    "notes": "Ipsum labore quis exercitation dolore qui mollit irure. Ut voluptate reprehenderit amet ex enim ullamco quis enim do elit ea adipisicing voluptate deserunt. Incididunt laboris anim quis est do duis irure.\r\n"
  }, {
    "id": 147,
    "name": "Angelita Tucker",
    "gender": "female",
    "company": "COMVERGES",
    "email": "angelitatucker@comverges.com",
    "phone": "+1 (922) 589-3511",
    "address": "978 Fenimore Street, Orin, Minnesota, 2051",
    "registered": "2014-11-24T08:19:05 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 1660,
    "isActive": false,
    "notes": "Pariatur laborum id irure ut adipisicing eu tempor irure et voluptate irure in dolore. Sit laboris amet tempor eu deserunt ullamco Lorem sunt ipsum qui cupidatat. Minim mollit id labore Lorem. Eu veniam exercitation proident id mollit cillum aliquip.\r\n"
  }, {
    "id": 148,
    "name": "Holcomb Reilly",
    "gender": "male",
    "company": "CODACT",
    "email": "holcombreilly@codact.com",
    "phone": "+1 (858) 592-3274",
    "address": "376 Brown Street, Faywood, Rhode Island, 7222",
    "registered": "2014-06-05T19:03:42 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 6008,
    "isActive": true,
    "notes": "Mollit esse deserunt nisi do cupidatat exercitation amet ea consequat dolore ex non. Ullamco duis proident minim voluptate. Fugiat laborum sunt aliquip veniam commodo excepteur duis non officia. Nostrud eiusmod eiusmod ullamco aute labore veniam aute adipisicing duis. Culpa officia excepteur incididunt exercitation esse eiusmod irure aliqua pariatur eu proident. Est commodo exercitation do elit dolore non sunt officia qui reprehenderit labore.\r\n"
  }, {
    "id": 149,
    "name": "Hope Dodson",
    "gender": "female",
    "company": "VIXO",
    "email": "hopedodson@vixo.com",
    "phone": "+1 (962) 568-3085",
    "address": "894 Devoe Street, Hiwasse, Iowa, 4730",
    "registered": "2014-05-21T13:50:26 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 6222,
    "isActive": true,
    "notes": "Non eiusmod fugiat enim exercitation irure. Ut aliquip elit pariatur elit ex aute labore id nulla aute in. Veniam enim aliquip sint proident enim sit non dolore ullamco.\r\n"
  }, {
    "id": 150,
    "name": "Zimmerman Roach",
    "gender": "male",
    "company": "LUNCHPAD",
    "email": "zimmermanroach@lunchpad.com",
    "phone": "+1 (826) 438-2989",
    "address": "718 Cass Place, Enetai, Virgin Islands, 3997",
    "registered": "2014-01-05T01:40:05 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2146,
    "isActive": true,
    "notes": "Quis deserunt exercitation veniam sint minim Lorem enim. Quis velit pariatur reprehenderit deserunt proident pariatur sit magna nisi ea. Ut veniam dolor pariatur fugiat ea qui sit dolore reprehenderit et sit mollit esse et.\r\n"
  }, {
    "id": 151,
    "name": "Bessie Salazar",
    "gender": "female",
    "company": "SUNCLIPSE",
    "email": "bessiesalazar@sunclipse.com",
    "phone": "+1 (945) 492-3613",
    "address": "306 Crosby Avenue, Dorneyville, Arkansas, 2338",
    "registered": "2014-09-21T10:06:11 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 3303,
    "isActive": false,
    "notes": "Nisi culpa aliqua occaecat quis sunt eu sunt deserunt voluptate dolor tempor. Reprehenderit qui veniam sunt ipsum nisi et qui. Eu quis cupidatat ad velit magna. Ex excepteur ad occaecat do culpa incididunt do adipisicing ut reprehenderit labore pariatur esse est. Aute consectetur pariatur nostrud ex amet cillum commodo ullamco.\r\n"
  }, {
    "id": 152,
    "name": "Fields Wynn",
    "gender": "male",
    "company": "QUANTALIA",
    "email": "fieldswynn@quantalia.com",
    "phone": "+1 (936) 417-2672",
    "address": "414 Branton Street, Gila, Puerto Rico, 9488",
    "registered": "2014-07-11T04:44:25 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5957,
    "isActive": true,
    "notes": "Est sunt ad dolore aliqua laborum qui aliqua ipsum ex fugiat eu amet. Consectetur id duis dolor do do eu excepteur. Ut veniam mollit laboris consequat culpa cillum sunt. Ipsum deserunt et minim deserunt nulla anim consectetur Lorem est reprehenderit aute est eiusmod est. Fugiat laborum fugiat consectetur ea esse ad enim. Lorem ex sunt deserunt adipisicing. Ut veniam laborum enim dolore anim velit sunt laboris duis incididunt quis adipisicing anim.\r\n"
  }, {
    "id": 153,
    "name": "Bridgett Newman",
    "gender": "female",
    "company": "PRISMATIC",
    "email": "bridgettnewman@prismatic.com",
    "phone": "+1 (850) 529-3887",
    "address": "518 Classon Avenue, Yorklyn, Oklahoma, 5690",
    "registered": "2014-10-11T12:50:01 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2255,
    "isActive": false,
    "notes": "Minim nulla id laborum anim. Quis ut ea sint commodo ad in reprehenderit veniam irure excepteur. Veniam dolore velit esse velit ex aute sit laboris mollit duis ullamco.\r\n"
  }, {
    "id": 154,
    "name": "Beck Vinson",
    "gender": "male",
    "company": "MICROLUXE",
    "email": "beckvinson@microluxe.com",
    "phone": "+1 (875) 580-3843",
    "address": "904 Whitty Lane, Canby, Massachusetts, 8269",
    "registered": "2014-03-22T13:52:05 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 1623,
    "isActive": false,
    "notes": "Duis officia voluptate aliquip in cupidatat incididunt qui cupidatat sunt. Quis id et tempor aute commodo ut in sunt reprehenderit. Incididunt laborum irure non ut ad sunt ullamco officia aute pariatur sint. Ex consequat eu adipisicing aliquip. Aute officia ex excepteur laborum quis.\r\n"
  }, {
    "id": 155,
    "name": "Tate Shepard",
    "gender": "male",
    "company": "EVENTEX",
    "email": "tateshepard@eventex.com",
    "phone": "+1 (828) 407-3548",
    "address": "562 Murdock Court, Dalton, Maryland, 2705",
    "registered": "2014-06-29T12:56:20 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 6808,
    "isActive": false,
    "notes": "Proident velit anim est voluptate pariatur. Do irure dolor do minim. Cillum enim eiusmod consequat labore magna. Id exercitation velit non proident amet consectetur amet duis duis non.\r\n"
  }, {
    "id": 156,
    "name": "Charlene Cruz",
    "gender": "female",
    "company": "BUGSALL",
    "email": "charlenecruz@bugsall.com",
    "phone": "+1 (878) 524-3559",
    "address": "944 Hopkins Street, Ryderwood, Illinois, 200",
    "registered": "2014-11-25T11:59:21 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 2990,
    "isActive": true,
    "notes": "Labore proident sunt nisi eu. Nulla eiusmod minim velit aute occaecat consequat aute amet exercitation. Magna enim pariatur aliquip quis laboris ullamco. Reprehenderit culpa occaecat excepteur sunt velit ex nulla qui. Aliquip ullamco magna consequat exercitation enim Lorem dolor ullamco. Ullamco deserunt qui mollit nisi velit ipsum fugiat non tempor reprehenderit irure. Laboris est ullamco dolore velit non excepteur sit aute elit eu.\r\n"
  }, {
    "id": 157,
    "name": "Snider Tyler",
    "gender": "male",
    "company": "GRAINSPOT",
    "email": "snidertyler@grainspot.com",
    "phone": "+1 (968) 403-3962",
    "address": "951 Boerum Street, Rosedale, Vermont, 3773",
    "registered": "2014-10-01T17:59:01 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 1712,
    "isActive": false,
    "notes": "Proident mollit nisi commodo ea magna sunt non commodo Lorem in ipsum commodo quis. Est eiusmod veniam Lorem ea magna elit amet esse duis sit. Aliqua aliquip proident ex nisi mollit veniam sint ea Lorem commodo occaecat consequat do. Proident anim occaecat excepteur eu proident ipsum adipisicing incididunt eu. Nisi quis ad anim ipsum in ex pariatur.\r\n"
  }, {
    "id": 158,
    "name": "Maura Webster",
    "gender": "female",
    "company": "VINCH",
    "email": "maurawebster@vinch.com",
    "phone": "+1 (885) 545-3668",
    "address": "326 Scholes Street, Cawood, Louisiana, 7801",
    "registered": "2014-02-15T06:01:32 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 2480,
    "isActive": true,
    "notes": "Eiusmod proident veniam pariatur aliqua nostrud ipsum. Voluptate enim cupidatat velit esse deserunt nulla labore anim amet exercitation laboris do culpa anim. Aliqua eu adipisicing culpa exercitation aute esse sunt aliquip amet consectetur sit proident consequat sint.\r\n"
  }, {
    "id": 159,
    "name": "Wheeler Wright",
    "gender": "male",
    "company": "UNI",
    "email": "wheelerwright@uni.com",
    "phone": "+1 (870) 598-2162",
    "address": "301 Lott Place, Barronett, Georgia, 4040",
    "registered": "2014-07-18T15:10:10 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 4477,
    "isActive": true,
    "notes": "Reprehenderit cillum laboris reprehenderit occaecat excepteur laborum ad enim est irure fugiat do nisi duis. Sit excepteur incididunt do velit pariatur aliqua excepteur enim excepteur aute commodo labore exercitation. Et mollit qui elit sint velit irure amet.\r\n"
  }, {
    "id": 160,
    "name": "Barnes Matthews",
    "gender": "male",
    "company": "TRANSLINK",
    "email": "barnesmatthews@translink.com",
    "phone": "+1 (962) 423-2715",
    "address": "298 Highland Boulevard, Stonybrook, New Hampshire, 7319",
    "registered": "2014-02-09T15:04:29 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 1227,
    "isActive": true,
    "notes": "Elit eiusmod proident enim reprehenderit Lorem in id ut magna. Deserunt in commodo et qui id consectetur proident veniam id voluptate minim sint fugiat. Exercitation elit incididunt Lorem consequat consequat tempor duis laborum magna. Qui non magna aliqua aliquip enim Lorem nisi aliqua eu sit ea consequat irure consectetur.\r\n"
  }, {
    "id": 161,
    "name": "Beth Morse",
    "gender": "female",
    "company": "ELECTONIC",
    "email": "bethmorse@electonic.com",
    "phone": "+1 (849) 456-2068",
    "address": "990 Fairview Place, Belleview, South Dakota, 5772",
    "registered": "2014-06-20T23:47:12 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 3754,
    "isActive": false,
    "notes": "Aliquip labore anim veniam aliquip sit proident anim. Amet labore pariatur pariatur nulla tempor aute nisi adipisicing incididunt. Aute ut ipsum dolore cupidatat duis id. Cupidatat in nostrud consequat consectetur cillum pariatur commodo et adipisicing labore. Et sunt laboris consectetur nostrud reprehenderit dolor proident proident tempor irure nisi. Laborum tempor nisi commodo esse anim excepteur minim ad cupidatat ea.\r\n"
  }, {
    "id": 162,
    "name": "Phelps Adams",
    "gender": "male",
    "company": "COMBOGEN",
    "email": "phelpsadams@combogen.com",
    "phone": "+1 (879) 495-3559",
    "address": "258 Willoughby Avenue, Allison, Pennsylvania, 9790",
    "registered": "2014-11-13T02:30:19 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 1346,
    "isActive": true,
    "notes": "Dolore fugiat minim ullamco mollit cupidatat occaecat proident sint. Labore enim officia incididunt minim dolore Lorem dolor. Aliquip elit aliquip amet dolor dolore deserunt commodo est aute. Non ea amet labore exercitation officia. Dolor enim sint esse et laboris incididunt pariatur. Enim amet magna duis voluptate. Nisi ea incididunt do quis sint dolore sunt sint.\r\n"
  }, {
    "id": 163,
    "name": "Dorthy Cash",
    "gender": "female",
    "company": "HYPLEX",
    "email": "dorthycash@hyplex.com",
    "phone": "+1 (885) 471-2099",
    "address": "556 Dupont Street, Chloride, Indiana, 1461",
    "registered": "2014-06-29T04:54:00 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 6788,
    "isActive": false,
    "notes": "Et qui laboris dolore est consectetur minim cupidatat eu dolor id dolor sunt. Ut occaecat anim qui culpa sunt exercitation. Esse labore cillum qui incididunt laborum ut eiusmod dolore anim aliqua commodo. Pariatur consequat exercitation quis magna veniam excepteur dolor occaecat pariatur deserunt fugiat ad pariatur. Consectetur excepteur cupidatat sit officia.\r\n"
  }, {
    "id": 164,
    "name": "Talley Boyd",
    "gender": "male",
    "company": "KIDSTOCK",
    "email": "talleyboyd@kidstock.com",
    "phone": "+1 (983) 411-3938",
    "address": "277 Ridge Court, Sutton, Kansas, 1545",
    "registered": "2014-11-24T22:47:24 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 3467,
    "isActive": false,
    "notes": "Quis amet commodo sint tempor tempor. Esse ut est et nisi ex excepteur voluptate proident amet eiusmod quis. Et fugiat culpa cupidatat officia eiusmod labore sint proident mollit nostrud. Magna culpa ullamco aliqua consequat laborum sunt sunt duis voluptate anim.\r\n"
  }, {
    "id": 165,
    "name": "Melissa Payne",
    "gender": "female",
    "company": "EARTHMARK",
    "email": "melissapayne@earthmark.com",
    "phone": "+1 (905) 445-2671",
    "address": "961 Fountain Avenue, Lund, Virginia, 6690",
    "registered": "2014-08-08T14:23:58 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 6267,
    "isActive": false,
    "notes": "Fugiat exercitation adipisicing et elit laboris laboris deserunt eiusmod esse esse eiusmod. Deserunt quis culpa veniam sint cillum consectetur duis in aliquip aute. Voluptate velit sint ad laborum quis aliqua sint cupidatat Lorem Lorem. Incididunt occaecat excepteur amet ea nostrud quis.\r\n"
  }, {
    "id": 166,
    "name": "Diane Mckinney",
    "gender": "female",
    "company": "CAXT",
    "email": "dianemckinney@caxt.com",
    "phone": "+1 (974) 486-3139",
    "address": "341 Greenpoint Avenue, Bend, North Dakota, 7028",
    "registered": "2014-05-28T17:35:33 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 1726,
    "isActive": false,
    "notes": "Do sint voluptate sit eiusmod amet est tempor officia pariatur officia mollit reprehenderit culpa sint. Velit pariatur adipisicing voluptate commodo commodo irure proident aliqua eu fugiat reprehenderit occaecat consectetur. Esse id excepteur culpa eiusmod et est quis aliquip sunt. Occaecat commodo occaecat nulla velit est.\r\n"
  }, {
    "id": 167,
    "name": "Cheri Rios",
    "gender": "female",
    "company": "GEOSTELE",
    "email": "cheririos@geostele.com",
    "phone": "+1 (912) 537-2570",
    "address": "674 Pine Street, Clinton, Oregon, 1930",
    "registered": "2014-08-11T17:13:38 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 2795,
    "isActive": true,
    "notes": "Occaecat eu aliqua magna qui veniam minim incididunt enim esse veniam. Tempor aute fugiat cupidatat sint veniam irure consequat mollit. Ea occaecat anim amet minim sunt excepteur labore labore.\r\n"
  }, {
    "id": 168,
    "name": "Spencer Manning",
    "gender": "male",
    "company": "ORONOKO",
    "email": "spencermanning@oronoko.com",
    "phone": "+1 (934) 532-2550",
    "address": "145 Freeman Street, Drummond, Utah, 5750",
    "registered": "2014-02-25T02:18:14 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 4302,
    "isActive": true,
    "notes": "Ut ipsum nisi aute consectetur elit incididunt consequat ea non nisi aliqua. Aliquip do officia consequat consequat id ad cillum ex ipsum labore ullamco eiusmod eiusmod. Ex Lorem proident ullamco irure elit in aliquip voluptate laboris. Irure aute voluptate labore aliquip. Ipsum velit consectetur irure nulla aliqua reprehenderit. Dolor reprehenderit voluptate occaecat sunt labore nostrud quis proident sunt tempor.\r\n"
  }, {
    "id": 169,
    "name": "Kerry Jensen",
    "gender": "female",
    "company": "COMVEX",
    "email": "kerryjensen@comvex.com",
    "phone": "+1 (987) 535-2451",
    "address": "197 Morgan Avenue, Hardyville, Nebraska, 4578",
    "registered": "2014-12-28T06:00:08 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2833,
    "isActive": false,
    "notes": "Quis magna laboris consequat nisi fugiat sit dolore laboris aliqua ea nulla. Nisi aute nisi quis dolor cupidatat elit. Laboris ipsum nisi excepteur ex qui. Labore esse proident aute irure duis do et ut non laborum aute ullamco ipsum.\r\n"
  }, {
    "id": 170,
    "name": "Cotton Silva",
    "gender": "male",
    "company": "ZOLARITY",
    "email": "cottonsilva@zolarity.com",
    "phone": "+1 (896) 431-2451",
    "address": "197 Thornton Street, Fairacres, New York, 7920",
    "registered": "2014-11-04T13:17:19 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 2417,
    "isActive": true,
    "notes": "Eiusmod esse ipsum consectetur nisi mollit nulla laboris culpa esse deserunt ipsum dolor. Laboris aliqua aliquip cupidatat magna adipisicing exercitation sunt et commodo excepteur velit ex ad. Dolor eu ullamco excepteur culpa. Qui consequat qui mollit fugiat et nostrud labore velit tempor tempor incididunt. Dolore non irure veniam elit quis.\r\n"
  }, {
    "id": 171,
    "name": "Catalina Dyer",
    "gender": "female",
    "company": "ENDIPIN",
    "email": "catalinadyer@endipin.com",
    "phone": "+1 (800) 520-2936",
    "address": "786 Grace Court, Sunbury, New Mexico, 7306",
    "registered": "2014-02-12T23:57:44 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 2736,
    "isActive": false,
    "notes": "Dolor pariatur consequat aute officia anim tempor eiusmod est sunt enim dolore sint sunt. Incididunt deserunt eu nulla eu cupidatat qui occaecat mollit proident excepteur excepteur quis. Nisi et et voluptate ut adipisicing pariatur Lorem officia ad ea velit Lorem ex. Reprehenderit ea ad exercitation Lorem culpa eu enim proident.\r\n"
  }, {
    "id": 172,
    "name": "Maggie David",
    "gender": "female",
    "company": "IZZBY",
    "email": "maggiedavid@izzby.com",
    "phone": "+1 (860) 541-3858",
    "address": "491 Schaefer Street, Waiohinu, Alaska, 9220",
    "registered": "2014-06-20T22:15:16 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 3778,
    "isActive": true,
    "notes": "Sint irure officia quis quis quis. Ad quis excepteur proident labore. Elit exercitation incididunt duis dolore minim eu culpa dolor fugiat veniam esse sint exercitation. Velit ipsum duis do et Lorem ea officia excepteur Lorem. Anim excepteur occaecat ad ad deserunt enim est consectetur. In dolor nisi aliquip laborum et.\r\n"
  }, {
    "id": 173,
    "name": "Tammi Mann",
    "gender": "female",
    "company": "OVOLO",
    "email": "tammimann@ovolo.com",
    "phone": "+1 (964) 491-2698",
    "address": "802 Meeker Avenue, Cashtown, Montana, 6806",
    "registered": "2014-01-18T12:39:28 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 5854,
    "isActive": true,
    "notes": "Amet cupidatat ullamco officia id consectetur sunt proident nostrud. Et excepteur deserunt nulla mollit mollit duis qui voluptate proident. Ullamco eiusmod minim sunt exercitation sint labore qui id duis ex voluptate fugiat. Commodo aliqua enim velit ipsum aliqua laborum in esse. Minim officia minim eiusmod ut. Voluptate occaecat aliquip in aliqua in elit quis dolor.\r\n"
  }, {
    "id": 174,
    "name": "Patricia Blankenship",
    "gender": "female",
    "company": "MEDESIGN",
    "email": "patriciablankenship@medesign.com",
    "phone": "+1 (941) 556-3464",
    "address": "691 Story Court, Accoville, Maine, 1745",
    "registered": "2014-08-13T04:04:44 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 4577,
    "isActive": false,
    "notes": "Elit sint et non esse deserunt eiusmod labore Lorem excepteur. Mollit do adipisicing adipisicing excepteur do proident reprehenderit anim commodo id dolor mollit ex. Labore nisi consectetur ut consectetur. Aliqua nostrud occaecat non id voluptate deserunt aliqua mollit minim labore fugiat mollit. Incididunt irure nulla enim consectetur Lorem nostrud aliqua duis ut. Ullamco nostrud voluptate adipisicing eiusmod. Elit et mollit elit consectetur nisi non mollit non dolor.\r\n"
  }, {
    "id": 175,
    "name": "Ball Whitaker",
    "gender": "male",
    "company": "TELEPARK",
    "email": "ballwhitaker@telepark.com",
    "phone": "+1 (959) 589-2402",
    "address": "452 Merit Court, Vallonia, Idaho, 9077",
    "registered": "2014-03-26T10:17:44 -00:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2822,
    "isActive": false,
    "notes": "Non ea aliqua sunt est cupidatat sint. Veniam sunt enim culpa enim proident. In pariatur fugiat ex commodo enim duis sunt est.\r\n"
  }, {
    "id": 176,
    "name": "Mildred Richard",
    "gender": "female",
    "company": "MEDICROIX",
    "email": "mildredrichard@medicroix.com",
    "phone": "+1 (847) 456-2393",
    "address": "690 Hewes Street, Glidden, Northern Mariana Islands, 6475",
    "registered": "2014-02-11T18:17:43 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 4684,
    "isActive": true,
    "notes": "Laborum elit quis duis cupidatat reprehenderit laborum consequat voluptate elit sint ipsum aute commodo. Sint labore officia adipisicing voluptate consequat ad. Laborum laboris commodo magna cillum cillum labore veniam nisi officia.\r\n"
  }, {
    "id": 177,
    "name": "Adams Compton",
    "gender": "male",
    "company": "EXTREMO",
    "email": "adamscompton@extremo.com",
    "phone": "+1 (824) 412-3505",
    "address": "189 Joval Court, Wawona, Mississippi, 9490",
    "registered": "2014-10-26T19:57:22 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 6334,
    "isActive": true,
    "notes": "Sit ea laborum voluptate laborum ex laboris velit consectetur duis exercitation reprehenderit laborum deserunt. Ullamco ea esse Lorem excepteur est. Quis esse fugiat ut velit commodo est. Sunt voluptate amet ex anim qui voluptate sunt do excepteur amet adipisicing consectetur. Occaecat Lorem cillum adipisicing amet deserunt duis laborum adipisicing. Consectetur tempor pariatur incididunt mollit amet minim amet Lorem nisi deserunt excepteur Lorem incididunt. Nisi non reprehenderit proident mollit est elit do eiusmod.\r\n"
  }, {
    "id": 178,
    "name": "Little Hooper",
    "gender": "male",
    "company": "ZORROMOP",
    "email": "littlehooper@zorromop.com",
    "phone": "+1 (815) 597-2518",
    "address": "170 Holt Court, Klagetoh, Nevada, 3300",
    "registered": "2014-12-19T18:05:52 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5328,
    "isActive": false,
    "notes": "Consectetur voluptate dolore excepteur tempor exercitation est voluptate voluptate ad adipisicing enim. Excepteur magna fugiat qui laborum. Ex Lorem eu proident ullamco fugiat occaecat nisi eu magna. Aliquip ex nulla labore labore nulla minim ullamco dolore. Veniam aliquip et dolore anim sunt velit amet laborum quis. Consectetur enim amet ea est cupidatat veniam mollit ullamco et veniam officia veniam duis. Exercitation culpa occaecat id id est.\r\n"
  }, {
    "id": 179,
    "name": "Huber Curtis",
    "gender": "male",
    "company": "COMFIRM",
    "email": "hubercurtis@comfirm.com",
    "phone": "+1 (968) 440-3860",
    "address": "208 Oak Street, Ogema, Ohio, 8725",
    "registered": "2014-12-27T01:29:03 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 5316,
    "isActive": true,
    "notes": "Sit reprehenderit eu ea ea ea qui consectetur ex adipisicing id dolore eu laborum ullamco. Reprehenderit do irure duis in ut aute fugiat amet irure sit amet pariatur tempor. Officia nostrud enim sint nulla in commodo velit irure sint officia irure sunt. Non sit laborum esse nostrud ex aliquip. Amet in ad proident duis cupidatat velit duis.\r\n"
  }, {
    "id": 180,
    "name": "Clarke Rollins",
    "gender": "male",
    "company": "UNDERTAP",
    "email": "clarkerollins@undertap.com",
    "phone": "+1 (995) 468-3355",
    "address": "445 Tapscott Street, Cornfields, Arizona, 6605",
    "registered": "2014-07-30T20:08:13 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 4550,
    "isActive": true,
    "notes": "Irure eiusmod elit veniam labore aute mollit ut. Ad velit cillum reprehenderit in commodo aliqua amet eiusmod deserunt adipisicing esse minim. Sit consectetur consectetur duis fugiat nostrud elit deserunt deserunt irure.\r\n"
  }, {
    "id": 181,
    "name": "Walker Montoya",
    "gender": "male",
    "company": "ENTROPIX",
    "email": "walkermontoya@entropix.com",
    "phone": "+1 (944) 533-3134",
    "address": "645 Montgomery Street, Kenvil, Hawaii, 5263",
    "registered": "2014-07-27T08:29:28 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 2582,
    "isActive": true,
    "notes": "Aliqua laboris dolor eiusmod sunt proident sint ad laboris. Dolor eu est sit qui officia Lorem est laborum esse eiusmod cupidatat. Minim laborum dolor ad mollit qui culpa voluptate. Ipsum consequat laboris do in velit magna duis sit. Lorem magna sunt est est et laboris in enim consectetur voluptate aute do pariatur cillum. Veniam veniam deserunt in nostrud sunt exercitation id minim do. Dolor dolore enim in quis.\r\n"
  }, {
    "id": 182,
    "name": "Jenifer Rowland",
    "gender": "female",
    "company": "MOMENTIA",
    "email": "jeniferrowland@momentia.com",
    "phone": "+1 (860) 573-3225",
    "address": "263 Debevoise Avenue, Crawfordsville, Florida, 7828",
    "registered": "2014-10-11T10:16:05 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 1603,
    "isActive": true,
    "notes": "Reprehenderit qui anim aliquip exercitation consectetur aliqua consequat dolor. Officia esse labore eiusmod exercitation veniam. Et veniam minim nulla est consequat proident anim enim nulla pariatur cillum proident non nostrud. Duis incididunt ea ex cillum officia laboris velit nisi.\r\n"
  }, {
    "id": 183,
    "name": "Elsa Garrett",
    "gender": "female",
    "company": "LUNCHPOD",
    "email": "elsagarrett@lunchpod.com",
    "phone": "+1 (919) 479-2400",
    "address": "810 Hull Street, Rose, Wisconsin, 3893",
    "registered": "2014-07-09T20:03:05 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5908,
    "isActive": true,
    "notes": "Excepteur fugiat nulla aliquip do ex sunt. Fugiat ea qui anim eu ut ea dolore ullamco sint magna veniam reprehenderit ipsum adipisicing. Anim quis ipsum irure aliquip amet ipsum aliqua laborum ipsum enim cillum. Consectetur mollit eu nostrud enim Lorem labore ut nostrud et consequat veniam ullamco. Pariatur cillum sint duis cillum velit commodo commodo sint amet proident nulla ut velit anim. Sit nisi fugiat enim laboris irure reprehenderit. Excepteur in quis officia nulla velit commodo adipisicing ipsum eu elit.\r\n"
  }, {
    "id": 184,
    "name": "Copeland Eaton",
    "gender": "male",
    "company": "GENMOM",
    "email": "copelandeaton@genmom.com",
    "phone": "+1 (887) 405-3023",
    "address": "472 Estate Road, Kansas, Guam, 9321",
    "registered": "2014-11-09T16:07:01 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 1041,
    "isActive": false,
    "notes": "Aute ea pariatur dolore Lorem eiusmod. Laborum deserunt qui elit deserunt dolore pariatur cupidatat in Lorem velit sit in. Excepteur labore cupidatat deserunt in proident. Veniam occaecat deserunt deserunt ad ea elit do incididunt in duis ea mollit fugiat mollit. Non adipisicing ipsum eu ad ullamco magna proident duis deserunt deserunt.\r\n"
  }, {
    "id": 185,
    "name": "Barnett Rosario",
    "gender": "male",
    "company": "VERBUS",
    "email": "barnettrosario@verbus.com",
    "phone": "+1 (803) 439-3634",
    "address": "883 Kensington Walk, Valmy, Palau, 2991",
    "registered": "2014-11-15T00:05:13 -00:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 6229,
    "isActive": true,
    "notes": "Aliqua duis pariatur tempor sint reprehenderit reprehenderit culpa. Velit officia esse mollit ea esse amet tempor dolor deserunt irure eiusmod enim voluptate. Pariatur reprehenderit amet nisi eiusmod reprehenderit officia. Et consectetur pariatur incididunt pariatur reprehenderit nisi. Commodo velit nisi amet velit voluptate culpa aliquip cillum reprehenderit. Amet do enim commodo velit elit eu.\r\n"
  }, {
    "id": 186,
    "name": "Tami Griffith",
    "gender": "female",
    "company": "GEEKOLA",
    "email": "tamigriffith@geekola.com",
    "phone": "+1 (860) 492-2203",
    "address": "350 Boulevard Court, Temperanceville, District Of Columbia, 3211",
    "registered": "2014-01-05T20:16:34 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2022,
    "isActive": true,
    "notes": "Sit non commodo aliqua commodo proident eiusmod laboris eu consectetur eu. Deserunt adipisicing proident fugiat ea occaecat consequat ut reprehenderit Lorem. Dolor esse adipisicing veniam sit ipsum aliqua.\r\n"
  }, {
    "id": 187,
    "name": "Rochelle Knight",
    "gender": "female",
    "company": "GREEKER",
    "email": "rochelleknight@greeker.com",
    "phone": "+1 (910) 597-2439",
    "address": "343 Neptune Court, Draper, Alabama, 2510",
    "registered": "2014-12-07T09:25:05 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3887,
    "isActive": false,
    "notes": "Proident sunt nulla duis ex ex tempor. Amet qui proident anim voluptate magna dolore non qui. Cupidatat cupidatat tempor adipisicing eiusmod cupidatat labore magna quis ut. Proident ut ex duis do elit. Eu non aliquip reprehenderit officia laboris aliquip deserunt ex est aliquip.\r\n"
  }, {
    "id": 188,
    "name": "Terry Tillman",
    "gender": "male",
    "company": "DADABASE",
    "email": "terrytillman@dadabase.com",
    "phone": "+1 (824) 499-2137",
    "address": "713 George Street, Cloverdale, South Carolina, 3367",
    "registered": "2014-06-17T04:51:57 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2649,
    "isActive": false,
    "notes": "Est labore amet culpa et consequat velit elit nostrud aliquip labore mollit consectetur. Aute in commodo proident nisi irure dolore pariatur. Reprehenderit voluptate ad ex Lorem.\r\n"
  }, {
    "id": 189,
    "name": "Paula Dominguez",
    "gender": "female",
    "company": "BRAINCLIP",
    "email": "pauladominguez@brainclip.com",
    "phone": "+1 (937) 510-3214",
    "address": "374 Oceanview Avenue, Bowie, Michigan, 1163",
    "registered": "2014-10-11T02:04:43 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 4098,
    "isActive": true,
    "notes": "Ex Lorem Lorem esse reprehenderit cupidatat et aliqua duis est culpa proident. Quis officia cillum proident labore sint fugiat commodo adipisicing. Consequat incididunt cupidatat proident anim velit Lorem ipsum excepteur non amet quis dolor minim nisi. Dolore reprehenderit deserunt irure commodo labore ad adipisicing aliqua. Minim amet sit nulla culpa dolore nulla pariatur anim. Quis esse labore ea duis do.\r\n"
  }, {
    "id": 190,
    "name": "Maldonado Sawyer",
    "gender": "male",
    "company": "EQUICOM",
    "email": "maldonadosawyer@equicom.com",
    "phone": "+1 (863) 453-3192",
    "address": "896 Woodrow Court, Rivera, Connecticut, 1884",
    "registered": "2014-10-06T08:45:38 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 5267,
    "isActive": false,
    "notes": "Minim pariatur ex nisi mollit aliqua adipisicing veniam labore sunt officia mollit irure qui anim. Commodo ad labore quis excepteur id tempor tempor. Culpa ex occaecat excepteur exercitation culpa cillum aliquip elit laborum nulla exercitation. Exercitation eu esse minim culpa nostrud nulla eiusmod ad esse.\r\n"
  }, {
    "id": 191,
    "name": "Alissa Rich",
    "gender": "female",
    "company": "JIMBIES",
    "email": "alissarich@jimbies.com",
    "phone": "+1 (846) 495-3254",
    "address": "295 Eaton Court, Esmont, Marshall Islands, 7735",
    "registered": "2015-01-18T12:40:39 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 4372,
    "isActive": false,
    "notes": "Exercitation et do laboris cillum amet duis Lorem tempor cupidatat voluptate quis cupidatat. Sit sit reprehenderit adipisicing id ipsum. Deserunt do aliqua deserunt est voluptate voluptate nisi.\r\n"
  }, {
    "id": 192,
    "name": "Cooley Gray",
    "gender": "male",
    "company": "MAXIMIND",
    "email": "cooleygray@maximind.com",
    "phone": "+1 (855) 468-2685",
    "address": "634 Cooper Street, Maplewood, New Jersey, 5597",
    "registered": "2014-03-08T18:29:55 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5502,
    "isActive": false,
    "notes": "Enim ad sunt sunt cillum sit in nostrud aute id. Dolor voluptate velit eu mollit commodo. Tempor officia velit nulla aliquip incididunt nostrud est. Lorem officia ea reprehenderit irure enim elit tempor adipisicing sunt enim. Lorem ad nulla fugiat aliqua id ea.\r\n"
  }, {
    "id": 193,
    "name": "Elisabeth Kelly",
    "gender": "female",
    "company": "ANIMALIA",
    "email": "elisabethkelly@animalia.com",
    "phone": "+1 (806) 550-2622",
    "address": "189 Stillwell Avenue, Ripley, Federated States Of Micronesia, 2086",
    "registered": "2014-08-07T20:39:05 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3435,
    "isActive": true,
    "notes": "Ex deserunt reprehenderit eu sunt ex commodo aliqua consectetur aliquip Lorem. Velit reprehenderit velit exercitation commodo pariatur commodo elit est nulla labore quis. Duis do laborum et id deserunt sint pariatur nulla aliqua nisi proident esse sint. Esse veniam sunt sit incididunt excepteur ex tempor enim veniam excepteur amet officia. Dolor exercitation ullamco aute sunt laboris veniam sunt excepteur cupidatat anim aliqua incididunt anim minim. Voluptate fugiat eiusmod veniam voluptate exercitation nostrud dolore.\r\n"
  }, {
    "id": 194,
    "name": "Irma Wolf",
    "gender": "female",
    "company": "MANTRO",
    "email": "irmawolf@mantro.com",
    "phone": "+1 (810) 479-3261",
    "address": "685 Village Road, Belmont, Kentucky, 8802",
    "registered": "2014-06-19T16:11:28 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1456,
    "isActive": false,
    "notes": "Eu esse adipisicing deserunt magna veniam veniam voluptate esse qui ea. Aliqua pariatur consectetur reprehenderit eiusmod officia. Non excepteur culpa nulla magna in magna ullamco tempor. Cupidatat minim eu quis labore exercitation sunt nostrud exercitation fugiat commodo labore in.\r\n"
  }, {
    "id": 195,
    "name": "Castaneda Leonard",
    "gender": "male",
    "company": "LEXICONDO",
    "email": "castanedaleonard@lexicondo.com",
    "phone": "+1 (805) 412-3289",
    "address": "713 Montauk Court, Ebro, Missouri, 5620",
    "registered": "2015-01-14T14:12:18 -00:00",
    "preferredBike": "A clown bike",
    "bikePoints": 6053,
    "isActive": false,
    "notes": "Ullamco aute consequat ex ut nulla dolor ut mollit. Aliqua ut id anim aliquip sint id ad ipsum ipsum et ex ullamco. Elit dolore aliquip proident laborum officia nostrud consequat pariatur consequat voluptate. Minim ea anim cupidatat eiusmod esse officia aliqua deserunt esse ea velit. Sint incididunt sunt nostrud Lorem eiusmod occaecat excepteur veniam est ut occaecat id. Labore ullamco dolore deserunt nisi.\r\n"
  }, {
    "id": 196,
    "name": "Wiley Skinner",
    "gender": "male",
    "company": "QOT",
    "email": "wileyskinner@qot.com",
    "phone": "+1 (956) 517-2881",
    "address": "325 Tehama Street, Kempton, Delaware, 3313",
    "registered": "2014-03-24T03:04:26 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 2190,
    "isActive": true,
    "notes": "Magna duis enim laborum ut pariatur sit labore non cillum esse adipisicing. Ipsum culpa tempor officia ex ex proident consectetur ex. Sint mollit sunt ex ullamco magna esse aliquip aute occaecat anim in elit sint officia. Proident adipisicing excepteur Lorem culpa minim incididunt nulla amet. Proident non quis voluptate proident fugiat labore occaecat adipisicing non.\r\n"
  }, {
    "id": 197,
    "name": "Merritt Houston",
    "gender": "male",
    "company": "BRAINQUIL",
    "email": "merritthouston@brainquil.com",
    "phone": "+1 (900) 414-3056",
    "address": "409 Autumn Avenue, Boling, Tennessee, 8677",
    "registered": "2014-05-05T18:14:38 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 5356,
    "isActive": true,
    "notes": "Occaecat do mollit eiusmod minim elit magna ipsum sit adipisicing officia amet. Commodo aliquip ipsum anim voluptate enim tempor minim id consequat. Ipsum est esse consectetur non sint.\r\n"
  }, {
    "id": 198,
    "name": "Jeanie Burton",
    "gender": "female",
    "company": "STOCKPOST",
    "email": "jeanieburton@stockpost.com",
    "phone": "+1 (917) 553-3908",
    "address": "144 Bogart Street, Chilton, American Samoa, 5259",
    "registered": "2014-06-08T05:39:50 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 5022,
    "isActive": false,
    "notes": "Excepteur in ad in reprehenderit. Adipisicing est elit consequat eiusmod ut magna incididunt nulla excepteur. Commodo consequat voluptate quis voluptate aute consequat Lorem aliquip et non tempor proident labore. Occaecat incididunt pariatur sint qui commodo sunt adipisicing consequat aute dolor aliqua mollit pariatur sunt. Fugiat Lorem occaecat amet sint aute ea id qui voluptate veniam.\r\n"
  }, {
    "id": 199,
    "name": "Bean Ward",
    "gender": "male",
    "company": "MALATHION",
    "email": "beanward@malathion.com",
    "phone": "+1 (945) 439-3507",
    "address": "395 Dunne Place, Roy, Wyoming, 3716",
    "registered": "2014-02-22T10:05:13 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 1767,
    "isActive": false,
    "notes": "Veniam tempor aliqua officia eu consequat ullamco magna proident minim. Et voluptate eu ad elit. Officia ex duis Lorem pariatur.\r\n"
  }, {
    "id": 200,
    "name": "Alejandra Sutton",
    "gender": "female",
    "company": "GEEKOL",
    "email": "alejandrasutton@geekol.com",
    "phone": "+1 (999) 468-3643",
    "address": "558 Ingraham Street, Gambrills, California, 517",
    "registered": "2015-01-15T20:53:52 -00:00",
    "preferredBike": "A blue bike",
    "bikePoints": 3859,
    "isActive": false,
    "notes": "Ex nostrud eiusmod exercitation aliqua labore quis sit. Officia in fugiat aliqua officia elit pariatur nulla. Amet ea Lorem duis culpa anim officia sint sit mollit mollit dolor. Enim mollit qui fugiat voluptate eiusmod adipisicing ut officia ullamco. Voluptate enim id et est eiusmod consequat sint quis velit labore. Ea labore cillum pariatur fugiat laboris exercitation laboris cupidatat nostrud exercitation ipsum. Incididunt occaecat nisi reprehenderit ex officia.\r\n"
  }, {
    "id": 201,
    "name": "Boyer Hansen",
    "gender": "male",
    "company": "CORPULSE",
    "email": "boyerhansen@corpulse.com",
    "phone": "+1 (800) 433-3739",
    "address": "988 Bleecker Street, Elwood, North Carolina, 9533",
    "registered": "2014-10-23T10:04:17 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 2219,
    "isActive": true,
    "notes": "Amet occaecat Lorem sit deserunt velit dolor dolore exercitation pariatur pariatur. Reprehenderit dolor mollit consectetur incididunt non nisi ea id esse. Enim officia nulla qui sint anim ad sit do ex anim proident elit nisi. Sit labore in proident cupidatat in adipisicing aute reprehenderit irure enim. Nisi et ut aliquip aliquip quis consequat. Fugiat commodo deserunt ea exercitation labore ex veniam aliquip.\r\n"
  }, {
    "id": 202,
    "name": "Best Cortez",
    "gender": "male",
    "company": "HYDROCOM",
    "email": "bestcortez@hydrocom.com",
    "phone": "+1 (942) 579-2130",
    "address": "784 Hinsdale Street, Blanco, Colorado, 1941",
    "registered": "2014-07-21T13:23:22 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 2436,
    "isActive": false,
    "notes": "Aliquip eiusmod eiusmod sint consequat mollit ea sunt qui irure proident velit. Mollit fugiat incididunt laboris excepteur amet exercitation velit ut nulla. Aliqua incididunt nostrud fugiat et et sunt fugiat veniam anim tempor eiusmod qui. Ullamco veniam amet laborum minim consectetur occaecat. Minim culpa nisi non irure irure irure eiusmod. Enim consectetur adipisicing ex sit. Commodo enim aute esse veniam.\r\n"
  }, {
    "id": 203,
    "name": "Edwards Simmons",
    "gender": "male",
    "company": "KYAGURU",
    "email": "edwardssimmons@kyaguru.com",
    "phone": "+1 (962) 453-2510",
    "address": "358 Livonia Avenue, Wyano, Washington, 8168",
    "registered": "2014-02-12T23:22:53 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 5958,
    "isActive": false,
    "notes": "Dolore amet Lorem dolore nulla dolor exercitation incididunt officia ex. Excepteur dolor reprehenderit voluptate enim dolor reprehenderit ipsum est tempor pariatur dolor. Ut sunt et esse ea ea in sunt eu sit. Proident voluptate duis reprehenderit minim laboris velit. Dolor occaecat consectetur minim exercitation velit in labore quis ullamco Lorem consequat ut laborum. Amet quis in sunt non esse aliquip nulla nisi cillum duis nulla enim esse ad. Qui veniam deserunt adipisicing exercitation Lorem adipisicing nostrud minim incididunt aute veniam.\r\n"
  }, {
    "id": 204,
    "name": "Connie Booker",
    "gender": "female",
    "company": "COMTREK",
    "email": "conniebooker@comtrek.com",
    "phone": "+1 (852) 472-2379",
    "address": "304 Kent Avenue, Weeksville, Texas, 100",
    "registered": "2014-10-14T23:21:18 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 6746,
    "isActive": true,
    "notes": "Ex fugiat nulla deserunt amet laborum sit velit dolore proident et quis duis ut. Laborum proident aute excepteur elit commodo laboris irure aliqua ullamco ad adipisicing quis eu. Irure duis reprehenderit occaecat ad veniam ad adipisicing laboris nostrud incididunt Lorem. Ex id qui aliquip pariatur pariatur deserunt nisi magna. Proident nulla sit tempor excepteur reprehenderit consequat laboris et velit deserunt.\r\n"
  }, {
    "id": 205,
    "name": "Sally Pruitt",
    "gender": "female",
    "company": "VERTIDE",
    "email": "sallypruitt@vertide.com",
    "phone": "+1 (803) 544-2730",
    "address": "908 Noble Street, Biehle, Minnesota, 4010",
    "registered": "2014-10-27T20:19:45 -00:00",
    "preferredBike": "A blue bike",
    "bikePoints": 2777,
    "isActive": false,
    "notes": "Et aliquip ipsum tempor nisi veniam Lorem culpa mollit id proident. Consectetur velit irure ut commodo reprehenderit proident voluptate. Voluptate tempor qui ea amet commodo.\r\n"
  }, {
    "id": 206,
    "name": "Rosalinda Stevens",
    "gender": "female",
    "company": "EARTHWAX",
    "email": "rosalindastevens@earthwax.com",
    "phone": "+1 (907) 565-3406",
    "address": "784 Senator Street, Berlin, Rhode Island, 1128",
    "registered": "2014-06-23T09:32:55 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6908,
    "isActive": false,
    "notes": "Ex ullamco duis anim voluptate in aute elit. Excepteur laborum nostrud incididunt incididunt consequat proident sit labore non sit. Duis aute dolore exercitation ipsum eiusmod quis ad ullamco do consectetur.\r\n"
  }, {
    "id": 207,
    "name": "Jordan Hoffman",
    "gender": "male",
    "company": "FARMAGE",
    "email": "jordanhoffman@farmage.com",
    "phone": "+1 (989) 493-2482",
    "address": "531 Pulaski Street, Staples, Iowa, 784",
    "registered": "2014-05-24T21:40:52 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2647,
    "isActive": false,
    "notes": "Elit reprehenderit consectetur dolor ea elit duis tempor excepteur ex quis ipsum. Aute in sint anim laboris exercitation laboris nulla pariatur veniam irure culpa. Nisi anim est magna veniam qui eiusmod.\r\n"
  }, {
    "id": 208,
    "name": "Logan Swanson",
    "gender": "male",
    "company": "OVIUM",
    "email": "loganswanson@ovium.com",
    "phone": "+1 (814) 546-2292",
    "address": "238 Mermaid Avenue, Harrison, Virgin Islands, 1327",
    "registered": "2014-12-29T01:16:28 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 3267,
    "isActive": true,
    "notes": "Officia ullamco mollit reprehenderit pariatur deserunt qui dolor. Nostrud adipisicing officia aliqua ea est nisi laboris esse aliqua amet aliqua quis. Officia quis aliquip pariatur aliquip officia cillum velit aute nisi cupidatat dolore occaecat velit cupidatat. Id pariatur non occaecat sint amet non amet culpa non voluptate. Mollit laborum nulla elit irure qui nisi ex officia laboris. Proident est nostrud laborum nostrud irure eiusmod ea mollit id anim consequat officia. Esse ex dolore Lorem occaecat et elit.\r\n"
  }, {
    "id": 209,
    "name": "Maryann Thornton",
    "gender": "female",
    "company": "UBERLUX",
    "email": "maryannthornton@uberlux.com",
    "phone": "+1 (926) 496-3040",
    "address": "489 Nevins Street, Why, Arkansas, 9651",
    "registered": "2014-05-23T02:54:54 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 5490,
    "isActive": true,
    "notes": "Pariatur elit eiusmod exercitation pariatur duis tempor consectetur eu deserunt consectetur quis ut nostrud cillum. Commodo dolore aute sint voluptate sit sint ea ex. Cupidatat nisi consectetur ipsum sunt nisi Lorem non labore ipsum eiusmod dolore eiusmod. Cillum cillum sunt aliqua veniam ad eu quis occaecat labore aliquip ad dolor.\r\n"
  }, {
    "id": 210,
    "name": "Potts Jefferson",
    "gender": "male",
    "company": "IMAGINART",
    "email": "pottsjefferson@imaginart.com",
    "phone": "+1 (989) 545-3466",
    "address": "789 Sumpter Street, Lodoga, Puerto Rico, 5603",
    "registered": "2014-05-26T04:33:21 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 6751,
    "isActive": false,
    "notes": "Commodo ipsum quis adipisicing id elit elit tempor aute ullamco incididunt adipisicing nisi. Aliqua est velit dolor esse aliqua consequat quis quis quis magna excepteur est veniam id. Sit quis ullamco quis tempor quis sint exercitation officia ad. Reprehenderit sint adipisicing ullamco reprehenderit. In mollit minim nostrud adipisicing fugiat fugiat anim commodo duis tempor veniam. Enim ut occaecat id nostrud enim.\r\n"
  }, {
    "id": 211,
    "name": "Dickson Fleming",
    "gender": "male",
    "company": "ZAGGLES",
    "email": "dicksonfleming@zaggles.com",
    "phone": "+1 (887) 494-3301",
    "address": "435 Flatlands Avenue, Dana, Oklahoma, 5549",
    "registered": "2014-10-09T15:34:58 -01:00",
    "preferredBike": "A modern bike",
    "bikePoints": 6024,
    "isActive": true,
    "notes": "Ullamco nisi id est aliquip exercitation mollit et cillum nostrud adipisicing ex qui pariatur. Cupidatat incididunt sit duis aliqua sunt voluptate velit ut amet. Eu adipisicing esse enim quis id ullamco do duis incididunt est officia. Sunt cupidatat reprehenderit occaecat irure aute adipisicing consectetur aliqua. Consequat non esse nisi fugiat sint consectetur id commodo ex. Consequat ex exercitation quis ullamco Lorem qui cillum non sit cupidatat ullamco ipsum adipisicing consequat.\r\n"
  }, {
    "id": 212,
    "name": "Lea Duke",
    "gender": "female",
    "company": "SENMAO",
    "email": "leaduke@senmao.com",
    "phone": "+1 (898) 589-3690",
    "address": "575 Anchorage Place, Finzel, Massachusetts, 4314",
    "registered": "2014-05-29T11:51:05 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 6220,
    "isActive": false,
    "notes": "Irure excepteur officia cupidatat veniam nulla sunt ipsum voluptate incididunt culpa eu. Proident tempor cupidatat deserunt cillum nostrud fugiat laboris. Sunt proident officia Lorem eiusmod laborum magna commodo nostrud excepteur culpa est excepteur ut amet. Aute fugiat in enim dolore veniam do veniam esse minim fugiat aliquip. In nulla velit voluptate sunt pariatur ullamco nisi sunt voluptate.\r\n"
  }, {
    "id": 213,
    "name": "Nichole Elliott",
    "gender": "female",
    "company": "BYTREX",
    "email": "nicholeelliott@bytrex.com",
    "phone": "+1 (919) 567-3127",
    "address": "615 Legion Street, Dixie, Maryland, 9742",
    "registered": "2014-02-05T21:07:38 -00:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 5873,
    "isActive": true,
    "notes": "Ullamco consectetur cupidatat cupidatat est adipisicing deserunt sit cillum fugiat velit amet. Officia consequat duis pariatur amet. Culpa cillum velit nostrud Lorem sint non qui labore eiusmod et quis ullamco aliqua. Pariatur excepteur aliqua sint dolor laborum nisi exercitation ullamco ipsum laborum ea. Sunt qui est sit consectetur adipisicing exercitation do in aliquip fugiat qui quis. Id tempor irure commodo dolore occaecat adipisicing aute dolore. Ea deserunt occaecat proident deserunt cupidatat nisi Lorem est pariatur elit amet eiusmod eiusmod nulla.\r\n"
  }, {
    "id": 214,
    "name": "Lilian Dillon",
    "gender": "female",
    "company": "ASIMILINE",
    "email": "liliandillon@asimiline.com",
    "phone": "+1 (960) 442-2580",
    "address": "446 Stockholm Street, Collins, Illinois, 9705",
    "registered": "2014-04-22T07:37:49 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 6484,
    "isActive": true,
    "notes": "Ad eu commodo culpa ex irure labore culpa in exercitation ea eu consequat. Sunt sunt laboris dolore sint reprehenderit cupidatat ea veniam dolore. Id esse esse dolor occaecat tempor incididunt eu pariatur ea. Eiusmod nulla ipsum ex tempor mollit anim adipisicing ad ea dolore. Labore Lorem adipisicing excepteur minim.\r\n"
  }, {
    "id": 215,
    "name": "Kimberly Rogers",
    "gender": "female",
    "company": "XIIX",
    "email": "kimberlyrogers@xiix.com",
    "phone": "+1 (844) 530-3251",
    "address": "841 Balfour Place, Independence, Vermont, 1987",
    "registered": "2014-04-26T22:59:27 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 4963,
    "isActive": false,
    "notes": "Elit fugiat commodo proident esse deserunt ut reprehenderit cupidatat commodo velit sit. Proident consectetur aliqua Lorem veniam id. In labore occaecat sunt nostrud officia reprehenderit irure adipisicing. Esse pariatur deserunt non deserunt qui aliquip esse reprehenderit. Reprehenderit cillum aute cillum laboris sunt ipsum Lorem eu eiusmod aute. Minim culpa quis amet minim id qui laboris incididunt in officia in et. Dolore Lorem aliqua consequat consectetur ex eu qui ullamco magna consequat esse aute.\r\n"
  }, {
    "id": 216,
    "name": "Marlene Horton",
    "gender": "female",
    "company": "UNISURE",
    "email": "marlenehorton@unisure.com",
    "phone": "+1 (907) 506-3055",
    "address": "430 Ryerson Street, Norwood, Louisiana, 8331",
    "registered": "2015-01-19T07:43:57 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3322,
    "isActive": false,
    "notes": "Sit proident sunt labore ut elit. Veniam laborum occaecat aliquip ex exercitation pariatur amet incididunt. Ad id eu magna ea id ea excepteur minim occaecat. Excepteur eiusmod exercitation aliqua ea laboris esse magna. Excepteur cupidatat ex eiusmod voluptate adipisicing voluptate proident consequat amet non excepteur. Magna minim veniam fugiat duis nostrud quis consectetur voluptate nostrud.\r\n"
  }, {
    "id": 217,
    "name": "Marie Romero",
    "gender": "female",
    "company": "ZOLAVO",
    "email": "marieromero@zolavo.com",
    "phone": "+1 (930) 409-2746",
    "address": "521 Schenck Court, Ironton, Georgia, 7016",
    "registered": "2014-07-23T20:38:10 -01:00",
    "preferredBike": "A springier bike",
    "bikePoints": 6759,
    "isActive": true,
    "notes": "Magna magna ex voluptate enim. Do culpa ad minim proident non dolore esse laboris aliqua in do minim ex. Magna sunt tempor cupidatat id adipisicing. Magna adipisicing ipsum Lorem aliqua. Occaecat ex irure laboris amet consectetur esse irure officia enim exercitation culpa enim. Ipsum labore nulla reprehenderit ut cillum ad nulla.\r\n"
  }, {
    "id": 218,
    "name": "Leola Estrada",
    "gender": "female",
    "company": "GLUID",
    "email": "leolaestrada@gluid.com",
    "phone": "+1 (847) 600-2640",
    "address": "958 Kane Place, Walton, New Hampshire, 8976",
    "registered": "2014-11-24T12:09:38 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3164,
    "isActive": true,
    "notes": "Do consectetur aute minim excepteur in id culpa minim occaecat eu. Est labore in in excepteur ullamco nisi consequat laboris dolore labore eu. Est non quis consequat laborum aute. Consectetur dolore mollit Lorem amet amet amet in cillum sint.\r\n"
  }, {
    "id": 219,
    "name": "Rush Ruiz",
    "gender": "male",
    "company": "ASSURITY",
    "email": "rushruiz@assurity.com",
    "phone": "+1 (914) 590-3974",
    "address": "969 Alabama Avenue, Stouchsburg, South Dakota, 1314",
    "registered": "2014-03-10T20:49:03 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 5289,
    "isActive": true,
    "notes": "Mollit est eu cillum tempor cupidatat fugiat proident laborum consectetur irure nulla. Occaecat culpa fugiat eu pariatur magna. Sit consequat mollit ex eiusmod mollit et cupidatat adipisicing qui reprehenderit anim ipsum. Occaecat ut aliqua pariatur enim laboris. Esse sint anim ex pariatur consectetur ut enim aute deserunt consectetur. Occaecat labore dolore eu amet ipsum minim.\r\n"
  }, {
    "id": 220,
    "name": "Fleming Leach",
    "gender": "male",
    "company": "COMSTAR",
    "email": "flemingleach@comstar.com",
    "phone": "+1 (957) 496-3156",
    "address": "541 Claver Place, Stagecoach, Pennsylvania, 4501",
    "registered": "2014-11-21T17:20:13 -00:00",
    "preferredBike": "A fast bike",
    "bikePoints": 3935,
    "isActive": true,
    "notes": "Fugiat anim quis duis reprehenderit et officia dolore aliquip. Quis sunt ullamco consequat mollit sint ipsum deserunt labore et proident aliqua exercitation pariatur esse. Veniam Lorem excepteur sint Lorem mollit commodo nulla ut consequat aliqua incididunt enim reprehenderit excepteur. Do aute anim deserunt ut nisi deserunt laborum adipisicing excepteur cupidatat ad. Irure in nulla magna laboris laborum proident amet sint eu qui ut Lorem veniam ut. Non amet dolore consectetur pariatur. Sit reprehenderit deserunt esse ea non ad do dolore non adipisicing ipsum.\r\n"
  }, {
    "id": 221,
    "name": "Spears Morris",
    "gender": "male",
    "company": "QUORDATE",
    "email": "spearsmorris@quordate.com",
    "phone": "+1 (834) 403-2522",
    "address": "773 Monaco Place, Bayview, Indiana, 4367",
    "registered": "2014-06-15T14:44:15 -01:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 4114,
    "isActive": true,
    "notes": "Exercitation eu velit anim dolor qui et eiusmod aliquip irure veniam eiusmod. Aliqua consequat sint anim occaecat. Dolor officia ea ullamco deserunt dolore sunt tempor laboris ad ipsum nostrud in minim ullamco. Magna labore non nostrud id Lorem aliqua nulla. Incididunt est officia incididunt aliquip id id dolore.\r\n"
  }, {
    "id": 222,
    "name": "Frazier Tyson",
    "gender": "male",
    "company": "FARMEX",
    "email": "fraziertyson@farmex.com",
    "phone": "+1 (806) 450-2340",
    "address": "518 Columbia Place, Trexlertown, Kansas, 1832",
    "registered": "2014-06-07T01:25:56 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 3121,
    "isActive": false,
    "notes": "Minim enim anim aute sit. Eu non proident id non nulla cillum ipsum sint. Amet nulla cillum pariatur nulla irure reprehenderit ea nostrud cillum ut velit Lorem sit deserunt. Proident esse tempor aliquip laborum consequat cupidatat tempor incididunt aliqua ad id officia irure esse.\r\n"
  }, {
    "id": 223,
    "name": "Ochoa Wallace",
    "gender": "male",
    "company": "TOURMANIA",
    "email": "ochoawallace@tourmania.com",
    "phone": "+1 (990) 523-3675",
    "address": "122 Baycliff Terrace, Madrid, Virginia, 4245",
    "registered": "2014-03-24T16:44:01 -00:00",
    "preferredBike": "A classy bike",
    "bikePoints": 5851,
    "isActive": true,
    "notes": "In cupidatat adipisicing laborum quis eu nostrud enim aliqua tempor dolor et aute. Duis do irure veniam do nisi non ea ut anim eiusmod id consequat id duis. Fugiat officia consequat amet ullamco. Aliqua magna fugiat deserunt elit ut nostrud eiusmod ullamco consequat sint sint sint duis officia. Nisi aute incididunt consequat exercitation voluptate aliquip et.\r\n"
  }, {
    "id": 224,
    "name": "Jenny Jacobson",
    "gender": "female",
    "company": "ESCENTA",
    "email": "jennyjacobson@escenta.com",
    "phone": "+1 (977) 504-2553",
    "address": "948 Sandford Street, Echo, North Dakota, 6838",
    "registered": "2014-12-26T06:43:48 -00:00",
    "preferredBike": "A springier bike",
    "bikePoints": 5105,
    "isActive": false,
    "notes": "Nisi culpa sit dolor enim ex non magna laborum esse aliquip. Ad nostrud aliquip ad nisi sit commodo deserunt aliqua incididunt est id. Excepteur consequat exercitation enim aliquip quis. Do ad cillum deserunt pariatur magna culpa reprehenderit est ullamco in. Veniam proident pariatur officia laboris laborum. Esse cupidatat ipsum adipisicing et labore irure Lorem amet et in esse nostrud sunt. Culpa occaecat veniam consequat dolore ad dolor labore amet.\r\n"
  }, {
    "id": 225,
    "name": "Whitfield Hurley",
    "gender": "male",
    "company": "SUSTENZA",
    "email": "whitfieldhurley@sustenza.com",
    "phone": "+1 (906) 403-3339",
    "address": "919 Melrose Street, Lemoyne, Oregon, 8091",
    "registered": "2014-07-06T09:25:07 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 1610,
    "isActive": true,
    "notes": "Minim aliqua consectetur esse commodo ad eu reprehenderit cupidatat magna commodo. Nulla ad anim est non cillum id est nisi deserunt eiusmod veniam tempor. Sunt labore esse minim eu aliquip pariatur eu dolor cillum elit. Aliquip nulla exercitation nisi labore mollit laborum ut est eiusmod eu. Consectetur mollit elit tempor ex aliquip Lorem exercitation labore laboris.\r\n"
  }, {
    "id": 226,
    "name": "Jenna Stokes",
    "gender": "female",
    "company": "NETERIA",
    "email": "jennastokes@neteria.com",
    "phone": "+1 (971) 497-2189",
    "address": "210 Kane Street, Newry, Utah, 2017",
    "registered": "2014-02-26T14:58:40 -00:00",
    "preferredBike": "A blue bike",
    "bikePoints": 1943,
    "isActive": true,
    "notes": "Non reprehenderit irure eiusmod commodo sunt esse. Deserunt velit velit exercitation occaecat enim velit. Cillum reprehenderit incididunt fugiat reprehenderit sint cupidatat eu est cupidatat sit ea dolore.\r\n"
  }, {
    "id": 227,
    "name": "Aida Mendez",
    "gender": "female",
    "company": "ZILLACON",
    "email": "aidamendez@zillacon.com",
    "phone": "+1 (952) 473-3127",
    "address": "722 Moultrie Street, Dundee, Nebraska, 8312",
    "registered": "2014-10-31T10:13:20 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 1066,
    "isActive": false,
    "notes": "Dolore esse occaecat consectetur consectetur qui aliqua. Lorem est ipsum Lorem consectetur nisi commodo. Tempor sunt consequat reprehenderit duis. Pariatur culpa nostrud labore esse aliquip Lorem eiusmod irure. Labore occaecat mollit ullamco laborum id duis commodo cupidatat. Veniam dolor dolor tempor est occaecat anim incididunt aliquip cupidatat proident veniam.\r\n"
  }, {
    "id": 228,
    "name": "Meyers Cox",
    "gender": "male",
    "company": "HANDSHAKE",
    "email": "meyerscox@handshake.com",
    "phone": "+1 (969) 580-3160",
    "address": "868 Stuart Street, Leola, New York, 1053",
    "registered": "2014-12-15T23:36:44 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2445,
    "isActive": false,
    "notes": "Anim elit labore velit ipsum reprehenderit anim et dolor excepteur. Deserunt ex duis et esse est. Sit adipisicing consectetur reprehenderit amet. Sit minim sunt ex ullamco ipsum id ad. Sint reprehenderit velit tempor qui.\r\n"
  }, {
    "id": 229,
    "name": "Jimmie Palmer",
    "gender": "female",
    "company": "FREAKIN",
    "email": "jimmiepalmer@freakin.com",
    "phone": "+1 (888) 499-2698",
    "address": "163 Keap Street, Edgar, New Mexico, 4992",
    "registered": "2014-03-09T05:37:18 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 4595,
    "isActive": false,
    "notes": "Occaecat cupidatat fugiat duis eiusmod pariatur ea elit eu pariatur duis. In labore eu commodo excepteur et anim deserunt fugiat veniam labore dolore esse reprehenderit. Adipisicing irure dolor anim ea consequat excepteur cillum ex exercitation veniam. Dolor sunt tempor esse ex esse eiusmod dolor. Nisi sint ipsum deserunt in sit voluptate id.\r\n"
  }, {
    "id": 230,
    "name": "Small Parrish",
    "gender": "male",
    "company": "SLAX",
    "email": "smallparrish@slax.com",
    "phone": "+1 (934) 453-2555",
    "address": "347 Post Court, Nile, Alaska, 5653",
    "registered": "2014-11-10T16:24:45 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2770,
    "isActive": false,
    "notes": "Nostrud proident dolor dolor id irure tempor consectetur eu dolor adipisicing excepteur tempor nostrud. Est esse labore anim eiusmod occaecat deserunt ea minim cillum commodo occaecat. Aute non adipisicing eiusmod commodo. Tempor non dolor amet magna sint proident voluptate adipisicing nisi.\r\n"
  }, {
    "id": 231,
    "name": "Moses Acosta",
    "gender": "male",
    "company": "COMBOGENE",
    "email": "mosesacosta@combogene.com",
    "phone": "+1 (872) 528-2321",
    "address": "628 Virginia Place, Slovan, Montana, 4522",
    "registered": "2014-12-15T23:37:46 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 2626,
    "isActive": false,
    "notes": "Mollit exercitation commodo sit qui. Reprehenderit laboris sint nulla Lorem consequat velit ad fugiat. Aliquip aliqua nulla do non commodo aute non fugiat esse cillum et. Sint ex sit laborum duis dolore eu tempor eu irure. Ullamco anim voluptate consectetur ea qui voluptate.\r\n"
  }, {
    "id": 232,
    "name": "Bernice Chen",
    "gender": "female",
    "company": "KAGGLE",
    "email": "bernicechen@kaggle.com",
    "phone": "+1 (826) 456-2528",
    "address": "402 Vernon Avenue, Nogal, Maine, 7957",
    "registered": "2014-04-20T03:43:46 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 2255,
    "isActive": true,
    "notes": "Cupidatat dolor culpa ullamco enim non duis et irure dolor qui nostrud sint nostrud pariatur. Cillum dolore et dolore pariatur pariatur duis dolor. Consequat enim et duis sint anim.\r\n"
  }, {
    "id": 233,
    "name": "Ramos Travis",
    "gender": "male",
    "company": "MANTRIX",
    "email": "ramostravis@mantrix.com",
    "phone": "+1 (899) 531-2785",
    "address": "743 Harman Street, Shelby, Idaho, 8742",
    "registered": "2014-10-24T06:17:00 -01:00",
    "preferredBike": "A blue bike",
    "bikePoints": 5952,
    "isActive": true,
    "notes": "Magna excepteur non tempor sint commodo. Occaecat cupidatat reprehenderit nulla sunt enim enim adipisicing laboris deserunt sint. In exercitation occaecat et cupidatat proident incididunt dolor anim velit quis. Consectetur id non quis duis ipsum eiusmod reprehenderit laboris.\r\n"
  }, {
    "id": 234,
    "name": "Fry Dejesus",
    "gender": "male",
    "company": "WEBIOTIC",
    "email": "frydejesus@webiotic.com",
    "phone": "+1 (974) 440-2552",
    "address": "998 Dewitt Avenue, Churchill, Northern Mariana Islands, 4787",
    "registered": "2014-12-19T04:58:15 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 6116,
    "isActive": false,
    "notes": "Do dolore culpa nisi magna eu cupidatat proident esse in. Ut in laboris magna reprehenderit sint aute. Sunt aute et pariatur ad sit adipisicing est consequat sit minim eiusmod commodo occaecat reprehenderit. Officia exercitation nostrud Lorem ut elit nisi aliquip excepteur eiusmod excepteur. Aliqua qui nisi nostrud minim enim non magna magna minim cillum. Nisi fugiat laboris sit quis pariatur id occaecat Lorem ullamco. Excepteur nostrud eiusmod eiusmod irure.\r\n"
  }, {
    "id": 235,
    "name": "Allison Sexton",
    "gender": "male",
    "company": "SILODYNE",
    "email": "allisonsexton@silodyne.com",
    "phone": "+1 (866) 478-3561",
    "address": "305 Linden Boulevard, Comptche, Mississippi, 858",
    "registered": "2014-03-20T14:34:11 -00:00",
    "preferredBike": "A modern bike",
    "bikePoints": 2186,
    "isActive": false,
    "notes": "Ipsum voluptate dolor velit sint velit incididunt. Proident amet laboris qui ullamco ea ut. Voluptate in ipsum labore voluptate. Qui irure do incididunt occaecat ex. Id mollit ut esse eiusmod.\r\n"
  }, {
    "id": 236,
    "name": "Matthews Knowles",
    "gender": "male",
    "company": "SENSATE",
    "email": "matthewsknowles@sensate.com",
    "phone": "+1 (914) 469-3394",
    "address": "524 School Lane, Denio, Nevada, 6432",
    "registered": "2014-07-05T09:55:56 -01:00",
    "preferredBike": "An all-terain bike",
    "bikePoints": 4606,
    "isActive": false,
    "notes": "Est ipsum voluptate aute eu excepteur ad laboris qui qui nulla fugiat tempor. Laborum tempor fugiat ut Lorem amet nulla duis magna nostrud occaecat sint labore. Cupidatat irure irure magna aute dolor nulla commodo quis consectetur dolore. Tempor nisi ad est sint officia eu nisi velit veniam sit ad consectetur ea pariatur. Eiusmod reprehenderit esse laborum cupidatat nisi nostrud cillum aliqua laboris. Veniam ut dolor laboris commodo voluptate officia aliqua et ullamco proident officia.\r\n"
  }, {
    "id": 237,
    "name": "Allyson Beck",
    "gender": "female",
    "company": "BLUPLANET",
    "email": "allysonbeck@bluplanet.com",
    "phone": "+1 (997) 438-2564",
    "address": "408 Pershing Loop, Sunriver, Ohio, 3432",
    "registered": "2014-08-05T15:35:30 -01:00",
    "preferredBike": "A clown bike",
    "bikePoints": 6833,
    "isActive": false,
    "notes": "Exercitation in elit proident voluptate commodo culpa ad eu fugiat cupidatat id. Ipsum minim ad Lorem veniam cillum non sunt velit proident duis. Est et velit quis duis. Lorem laboris nisi officia eiusmod et aliqua labore elit. Tempor quis sit duis exercitation ad.\r\n"
  }, {
    "id": 238,
    "name": "Ernestine Mcneil",
    "gender": "female",
    "company": "QUIZMO",
    "email": "ernestinemcneil@quizmo.com",
    "phone": "+1 (978) 531-2796",
    "address": "830 Dahlgreen Place, Calvary, Arizona, 6774",
    "registered": "2014-11-19T14:33:24 -00:00",
    "preferredBike": "A pink bike",
    "bikePoints": 4445,
    "isActive": false,
    "notes": "Lorem quis laboris laborum irure exercitation quis veniam occaecat veniam excepteur aliquip quis. Exercitation id reprehenderit aliquip occaecat ex consectetur. Est nisi nulla nulla do et deserunt velit laborum exercitation nostrud nostrud dolore pariatur minim. Mollit consequat eu occaecat labore sit aliqua enim est. Commodo mollit esse commodo officia. In velit sunt sunt qui cillum labore voluptate mollit laborum excepteur consequat elit. Ex officia sunt magna excepteur elit eu quis irure ad laboris ad voluptate.\r\n"
  }, {
    "id": 239,
    "name": "Ward Wilkinson",
    "gender": "male",
    "company": "YURTURE",
    "email": "wardwilkinson@yurture.com",
    "phone": "+1 (887) 533-3135",
    "address": "990 Cleveland Street, Masthope, Hawaii, 4483",
    "registered": "2014-09-03T02:45:45 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 4298,
    "isActive": true,
    "notes": "Sit ipsum eu culpa consequat pariatur cupidatat sunt labore. Tempor Lorem enim consequat commodo deserunt aute minim nisi. Culpa sint amet fugiat commodo proident voluptate ad id. Consectetur ullamco sit ea dolore.\r\n"
  }, {
    "id": 240,
    "name": "Woods Medina",
    "gender": "male",
    "company": "KONNECT",
    "email": "woodsmedina@konnect.com",
    "phone": "+1 (939) 402-3488",
    "address": "137 Chester Street, Linganore, Florida, 7741",
    "registered": "2014-05-23T01:09:26 -01:00",
    "preferredBike": "A springy bike",
    "bikePoints": 4091,
    "isActive": true,
    "notes": "Exercitation tempor occaecat ipsum reprehenderit quis reprehenderit ullamco quis nulla. Laboris velit anim commodo labore anim ea mollit laborum aliqua est. Occaecat cillum laboris qui minim consectetur nisi irure laborum aliquip. Cillum eiusmod do incididunt culpa irure amet culpa id culpa ullamco. Laboris ullamco anim elit tempor eu. Pariatur nulla minim officia amet ut cillum ipsum sit non et do proident sunt id.\r\n"
  }, {
    "id": 241,
    "name": "Santos Thompson",
    "gender": "male",
    "company": "CENTICE",
    "email": "santosthompson@centice.com",
    "phone": "+1 (942) 572-3029",
    "address": "347 Battery Avenue, Ola, Wisconsin, 8671",
    "registered": "2014-02-27T17:08:53 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 4566,
    "isActive": false,
    "notes": "Laborum aute sint fugiat incididunt tempor velit labore sunt qui. In elit incididunt quis in voluptate aute qui consequat ullamco minim cillum irure pariatur enim. Excepteur adipisicing cupidatat consequat irure ut labore amet. Nisi enim duis cillum reprehenderit ex enim elit cillum. Non voluptate adipisicing nostrud nulla cillum consectetur duis ipsum mollit quis anim sit ad velit.\r\n"
  }, {
    "id": 242,
    "name": "Harris Ayala",
    "gender": "male",
    "company": "MEDMEX",
    "email": "harrisayala@medmex.com",
    "phone": "+1 (949) 431-3090",
    "address": "417 Grafton Street, Townsend, Guam, 2109",
    "registered": "2014-01-06T05:18:00 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 5699,
    "isActive": false,
    "notes": "Officia do esse cillum et id nisi aute veniam occaecat est consequat nisi adipisicing proident. Irure incididunt nisi incididunt labore qui. Id anim elit eiusmod magna ad dolor quis. Id eiusmod ipsum proident nisi dolor.\r\n"
  }, {
    "id": 243,
    "name": "Roth Christensen",
    "gender": "male",
    "company": "PYRAMI",
    "email": "rothchristensen@pyrami.com",
    "phone": "+1 (924) 564-3391",
    "address": "663 Knight Court, Defiance, Palau, 8767",
    "registered": "2014-01-08T19:53:25 -00:00",
    "preferredBike": "A springy bike",
    "bikePoints": 6873,
    "isActive": true,
    "notes": "Cillum aliqua amet Lorem cupidatat exercitation commodo id laboris sunt duis nostrud incididunt sit ad. Velit sit dolore duis commodo ea eu. Eiusmod dolore mollit aliquip proident nisi voluptate laborum amet tempor excepteur non sit exercitation laborum.\r\n"
  }, {
    "id": 244,
    "name": "Hicks Soto",
    "gender": "male",
    "company": "INTERODEO",
    "email": "hickssoto@interodeo.com",
    "phone": "+1 (927) 552-2883",
    "address": "523 Guider Avenue, Sylvanite, District Of Columbia, 1743",
    "registered": "2014-12-17T02:06:34 -00:00",
    "preferredBike": "An even faster bike",
    "bikePoints": 4672,
    "isActive": true,
    "notes": "Esse est commodo reprehenderit laborum est ullamco aliqua excepteur. Voluptate aliquip sunt excepteur et nisi non mollit. Aute nostrud aliqua non et.\r\n"
  }, {
    "id": 245,
    "name": "Liz Sims",
    "gender": "female",
    "company": "COMVEYER",
    "email": "lizsims@comveyer.com",
    "phone": "+1 (877) 470-3230",
    "address": "374 Barwell Terrace, Interlochen, Alabama, 3096",
    "registered": "2014-06-21T20:34:44 -01:00",
    "preferredBike": "A noisy bike",
    "bikePoints": 5765,
    "isActive": false,
    "notes": "Enim officia duis incididunt do non cillum exercitation eu cillum pariatur eiusmod aliqua elit. Elit et tempor sit quis minim aliqua qui enim exercitation reprehenderit. Id voluptate exercitation deserunt ullamco magna id. Nulla id ullamco est aliqua magna. Nostrud laboris est cillum mollit nostrud ex duis deserunt nostrud mollit nisi labore. Reprehenderit quis dolore ullamco commodo culpa dolore non.\r\n"
  }, {
    "id": 246,
    "name": "Cantrell Woodward",
    "gender": "male",
    "company": "JASPER",
    "email": "cantrellwoodward@jasper.com",
    "phone": "+1 (848) 462-2074",
    "address": "769 Main Street, Rehrersburg, South Carolina, 2385",
    "registered": "2014-09-29T16:27:50 -01:00",
    "preferredBike": "A classy bike",
    "bikePoints": 3678,
    "isActive": false,
    "notes": "Occaecat minim ipsum id minim sit proident do culpa eu ad sint. Duis occaecat incididunt cillum duis reprehenderit exercitation nulla eiusmod aute. Ut sunt proident et reprehenderit ea. Dolor esse consequat tempor nulla.\r\n"
  }, {
    "id": 247,
    "name": "Mona Buchanan",
    "gender": "female",
    "company": "STELAECOR",
    "email": "monabuchanan@stelaecor.com",
    "phone": "+1 (895) 493-2949",
    "address": "448 Mill Road, Lacomb, Michigan, 9796",
    "registered": "2014-12-01T22:12:29 -00:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 4911,
    "isActive": true,
    "notes": "Cupidatat Lorem consectetur nulla ea esse ea sint ut. Consequat dolor irure minim veniam duis qui sit est consectetur esse elit elit. Velit ut esse mollit do velit ullamco amet. Sunt anim sit consectetur nulla dolor nostrud. Anim proident elit dolor reprehenderit velit consequat irure proident magna occaecat amet magna ad nisi. Anim dolor cillum Lorem proident cillum et sint nostrud anim duis dolore duis. Exercitation quis Lorem aute consequat laboris aliqua reprehenderit consequat velit ex.\r\n"
  }, {
    "id": 248,
    "name": "Lewis Bryan",
    "gender": "male",
    "company": "LETPRO",
    "email": "lewisbryan@letpro.com",
    "phone": "+1 (994) 447-3462",
    "address": "695 Strong Place, Bainbridge, Connecticut, 1487",
    "registered": "2014-05-15T13:44:35 -01:00",
    "preferredBike": "A commuter bike",
    "bikePoints": 3191,
    "isActive": false,
    "notes": "In incididunt aute ea veniam nulla cupidatat officia sint id nostrud. Consectetur laborum ex pariatur eu occaecat excepteur in consectetur. Tempor velit dolor cillum eiusmod dolor ullamco Lorem mollit do voluptate adipisicing laboris nisi commodo. Laborum adipisicing aliquip proident ipsum dolor reprehenderit est id. Incididunt commodo nisi adipisicing proident. Cupidatat irure ut minim pariatur adipisicing exercitation mollit ullamco tempor do officia Lorem aute. Labore commodo do do veniam ipsum ullamco proident fugiat culpa id labore et qui.\r\n"
  }, {
    "id": 249,
    "name": "Elizabeth Cleveland",
    "gender": "female",
    "company": "BALUBA",
    "email": "elizabethcleveland@baluba.com",
    "phone": "+1 (925) 472-3704",
    "address": "142 Seigel Street, Bergoo, Marshall Islands, 6142",
    "registered": "2014-04-25T18:55:48 -01:00",
    "preferredBike": "A fast bike",
    "bikePoints": 6246,
    "isActive": false,
    "notes": "Tempor deserunt dolor consequat id excepteur et in commodo eu ipsum ex dolor magna. Pariatur labore Lorem ipsum voluptate ullamco nulla nostrud. Lorem aliqua commodo excepteur id est. Laborum ullamco proident veniam nulla. Reprehenderit aliquip eiusmod veniam ad aute officia est consequat cupidatat non ipsum excepteur.\r\n"
  }, {
    "id": 250,
    "name": "Fitzpatrick Morales",
    "gender": "male",
    "company": "BLURRYBUS",
    "email": "fitzpatrickmorales@blurrybus.com",
    "phone": "+1 (950) 434-2884",
    "address": "677 Agate Court, Flintville, New Jersey, 2794",
    "registered": "2014-08-07T06:28:42 -01:00",
    "preferredBike": "A pink bike",
    "bikePoints": 1014,
    "isActive": true,
    "notes": "Enim excepteur sunt Lorem cupidatat laborum culpa in nostrud commodo et nisi excepteur adipisicing. Non anim est voluptate laboris sunt proident occaecat ut proident ipsum ea dolor magna. Consequat adipisicing ut magna et. Aliquip labore ad do consectetur tempor. Ullamco culpa enim pariatur ullamco dolore sint reprehenderit nostrud qui amet officia.\r\n"
  }];
};

var getClientOrders = function() {
  return [{
    "clientId": 1,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 2,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }]
  }, {
    "clientId": 3,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 4,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }]
  }, {
    "clientId": 5,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 6,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 7,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 8,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 9,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }]
  }, {
    "clientId": 10,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 11,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 12,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 13,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }]
  }, {
    "clientId": 14,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 15,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }]
  }, {
    "clientId": 16,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 17,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 18,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 19,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 20,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 21,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 22,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 23,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 24,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }]
  }, {
    "clientId": 25,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 26,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }]
  }, {
    "clientId": 27,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 28,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 29,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 30,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 31,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 32,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 33,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 34,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 35,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 36,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 37,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }]
  }, {
    "clientId": 38,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 39,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }]
  }, {
    "clientId": 40,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 41,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 42,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }]
  }, {
    "clientId": 43,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 44,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }]
  }, {
    "clientId": 45,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 46,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 47,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }]
  }, {
    "clientId": 48,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 49,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 50,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }]
  }, {
    "clientId": 51,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 52,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }]
  }, {
    "clientId": 53,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }]
  }, {
    "clientId": 54,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 55,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 56,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 57,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 58,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }]
  }, {
    "clientId": 59,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 60,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 61,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }]
  }, {
    "clientId": 62,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 63,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 64,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 65,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 66,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 67,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }]
  }, {
    "clientId": 68,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 69,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 70,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 71,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 72,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }]
  }, {
    "clientId": 73,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 74,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }]
  }, {
    "clientId": 75,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 76,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 77,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 78,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 79,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }]
  }, {
    "clientId": 80,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }]
  }, {
    "clientId": 81,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 82,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }]
  }, {
    "clientId": 83,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }]
  }, {
    "clientId": 84,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 85,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 86,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }]
  }, {
    "clientId": 87,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 88,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 89,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 90,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }]
  }, {
    "clientId": 91,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 92,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }]
  }, {
    "clientId": 93,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 94,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 95,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 96,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 97,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }]
  }, {
    "clientId": 98,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 99,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 100,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 101,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 102,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 103,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 104,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }]
  }, {
    "clientId": 105,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 106,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 107,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }]
  }, {
    "clientId": 108,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }]
  }, {
    "clientId": 109,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 110,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 111,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 112,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }]
  }, {
    "clientId": 113,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 114,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }]
  }, {
    "clientId": 115,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 116,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 117,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 118,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }]
  }, {
    "clientId": 119,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }]
  }, {
    "clientId": 120,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 121,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 122,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 123,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 124,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 125,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }]
  }, {
    "clientId": 126,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 127,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 128,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 129,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 4
    }]
  }, {
    "clientId": 130,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 131,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }]
  }, {
    "clientId": 132,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 133,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }]
  }, {
    "clientId": 134,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }]
  }, {
    "clientId": 135,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }]
  }, {
    "clientId": 136,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 137,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 138,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 139,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 140,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 141,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 142,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 143,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 144,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 145,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 146,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 147,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }]
  }, {
    "clientId": 148,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 149,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 150,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 151,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 152,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 153,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }]
  }, {
    "clientId": 154,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 155,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 156,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 157,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 158,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }]
  }, {
    "clientId": 159,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 160,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 161,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 162,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 163,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 164,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 165,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }]
  }, {
    "clientId": 166,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }]
  }, {
    "clientId": 167,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 1
    }]
  }, {
    "clientId": 168,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 169,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }]
  }, {
    "clientId": 170,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 171,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 172,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }]
  }, {
    "clientId": 173,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }]
  }, {
    "clientId": 174,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 175,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 176,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 177,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 178,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 179,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 180,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }]
  }, {
    "clientId": 181,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }]
  }, {
    "clientId": 182,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 183,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }]
  }, {
    "clientId": 184,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }]
  }, {
    "clientId": 185,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 2
    }]
  }, {
    "clientId": 186,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 187,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 188,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 189,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }]
  }, {
    "clientId": 190,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 191,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }]
  }, {
    "clientId": 192,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }]
  }, {
    "clientId": 193,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 194,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 195,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 196,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }]
  }, {
    "clientId": 197,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 3
    }]
  }, {
    "clientId": 198,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }]
  }, {
    "clientId": 199,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }]
  }, {
    "clientId": 200,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }]
  }, {
    "clientId": 201,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 1
    }]
  }, {
    "clientId": 202,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }]
  }, {
    "clientId": 203,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }]
  }, {
    "clientId": 204,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 205,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 1
    }]
  }, {
    "clientId": 206,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }]
  }, {
    "clientId": 207,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 2
    }]
  }, {
    "clientId": 208,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 209,
    "orders": [{
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A springy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 210,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 211,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }]
  }, {
    "clientId": 212,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 1
    }]
  }, {
    "clientId": 213,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A springier bike",
      "quantity": 3
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 214,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }]
  }, {
    "clientId": 215,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 216,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }]
  }, {
    "clientId": 217,
    "orders": [{
      "bicycleName": "An all-terain bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 4
    }]
  }, {
    "clientId": 218,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }]
  }, {
    "clientId": 219,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 220,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 221,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 222,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A springy bike",
      "quantity": 4
    }]
  }, {
    "clientId": 223,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }]
  }, {
    "clientId": 224,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 2
    }]
  }, {
    "clientId": 225,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }]
  }, {
    "clientId": 226,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }]
  }, {
    "clientId": 227,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A pink bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }]
  }, {
    "clientId": 228,
    "orders": [{
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }]
  }, {
    "clientId": 229,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 230,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 231,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }]
  }, {
    "clientId": 232,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 233,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A classy bike",
      "quantity": 3
    }]
  }, {
    "clientId": 234,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 235,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 3
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 4
    }]
  }, {
    "clientId": 236,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 237,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 238,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }]
  }, {
    "clientId": 239,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 3
    }]
  }, {
    "clientId": 240,
    "orders": [{
      "bicycleName": "A noisy bike",
      "quantity": 4
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }]
  }, {
    "clientId": 241,
    "orders": [{
      "bicycleName": "A modern bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 1
    }]
  }, {
    "clientId": 242,
    "orders": [{
      "bicycleName": "A commuter bike",
      "quantity": 4
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 3
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 3
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }, {
      "bicycleName": "A classy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 243,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 1
    }, {
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A fast bike",
      "quantity": 3
    }, {
      "bicycleName": "A pink bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "A springy bike",
      "quantity": 1
    }]
  }, {
    "clientId": 244,
    "orders": [{
      "bicycleName": "A springier bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 4
    }]
  }, {
    "clientId": 245,
    "orders": [{
      "bicycleName": "A fast bike",
      "quantity": 1
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 2
    }, {
      "bicycleName": "An even faster bike",
      "quantity": 3
    }, {
      "bicycleName": "A clown bike",
      "quantity": 2
    }]
  }, {
    "clientId": 246,
    "orders": [{
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A modern bike",
      "quantity": 2
    }, {
      "bicycleName": "A fast bike",
      "quantity": 2
    }, {
      "bicycleName": "A noisy bike",
      "quantity": 2
    }]
  }, {
    "clientId": 247,
    "orders": [{
      "bicycleName": "A classy bike",
      "quantity": 1
    }, {
      "bicycleName": "An all-terain bike",
      "quantity": 4
    }, {
      "bicycleName": "A springier bike",
      "quantity": 2
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 1
    }]
  }, {
    "clientId": 248,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 4
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }]
  }, {
    "clientId": 249,
    "orders": [{
      "bicycleName": "An even faster bike",
      "quantity": 1
    }]
  }, {
    "clientId": 250,
    "orders": [{
      "bicycleName": "A springy bike",
      "quantity": 1
    }, {
      "bicycleName": "A pink bike",
      "quantity": 4
    }, {
      "bicycleName": "A commuter bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 1
    }, {
      "bicycleName": "A blue bike",
      "quantity": 2
    }, {
      "bicycleName": "A blue bike",
      "quantity": 4
    }]
  }];
};

exports.getBicycles = getBicycles;
exports.getClients = getClients;
exports.getClientOrders = getClientOrders;

},{}],5:[function(require,module,exports){
var $ = require('jquery');
var _ = require("underscore");
var clientRetriever = require("./clientRetriever.js");
var transformations = require("./transformations.js");

$(function() {

  var oldestClients = clientRetriever.getOldestClients(5);
  var bestClients = clientRetriever.getBestClients(5);
  var clients = clientRetriever.getClients();

  var onSelectHome = function() {
    $(".panel-heading").html("Welcome");
    $(".panel-body").html("<p>There are " + clients.length + " clients.</p>");
  };

  $("#home-btn").click(onSelectHome);

  $("#oldest-clients-btn").click(function() {
    $(".panel-heading").html("Top 5 oldest clients with name, id and type");
    var displayContent = "<ul><li>" +
      _.map(oldestClients, function(client) {
        return transformations.getContactNameIdAndType(client);
      }).join('</li><li>') +
      "</li></ul>";
    $(".panel-body").html(displayContent);
  });
  $("#best-clients-btn").click(function() {
    $(".panel-heading").html("Top 5 best clients with name, id and type");

    var displayContent = "<ul><li>" +
      _.map(bestClients, function(client) {
        return transformations.getContactNameIdAndType(client);
      }).join('</li><li>') +
      "</li></ul>";
    $(".panel-body").html(displayContent);
  });

  onSelectHome();
});
},{"./clientRetriever.js":2,"./transformations.js":6,"jquery":8,"underscore":9}],6:[function(require,module,exports){
exports.getContactNameIdAndType = function(contact) {
  return contact.name + " (" + contact.id + " - " + contact.type + ")";
};

},{}],7:[function(require,module,exports){
var _ = require("underscore");

var validations = {
  validateArgsLength: function(argsLength, argsArray) {
    if (argsArray.length != argsLength) {
      throw {
        name: "ArgumentsException",
        message: "The arguments length is incorrect."
      };
    }
  },
  validateArgsTypes: function(argsArray, argumentValidatorArray) {
    _.each(argsArray, function(argument, index) {
      if (!argumentValidatorArray[index](argument)) {
        throw {
          name: "ArgumentsException",
          message: "One of the arguments does not have the expected type."
        };
      }
    });
  },
  validateContactArgs: function(argsArray) {
    this.validateArgsTypes(
      argsArray, [_.isNumber, _.isString, _.isString, _.isString, _.isString, _.isString, _.isString]);
  },
  validateClientArgs: function(argsArray) {
    this.validateContactArgs(_.first(argsArray, 7));
    this.validateArgsTypes(
      _.rest(argsArray, 7), [_.isDate, _.isString, _.isNumber, _.isString]);
  }
};

module.exports = validations;

},{"underscore":9}],8:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],9:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[5]);

var transformations = (function() {
  "use strict";

  return {
    getContactNameIdAndType: function(contact) {
      return contact.name + " (" + contact.id + " - " + contact.type + ")";
    }
  };
}());
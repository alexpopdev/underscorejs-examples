exports.getContactNameIdAndType = function(contact) {
  return contact.name + " (" + contact.id + " - " + contact.type + ")";
};

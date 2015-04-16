exports.getContactNameIdAndType = function(contact) {
  return contact.name + " (" + contact._id + " - " + contact.type + ")";
};

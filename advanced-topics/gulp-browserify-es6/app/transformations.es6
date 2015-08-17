/*jshint esnext: true */
export function getContactNameIdAndType(contact) {
  return contact.name + " (" + contact.id + " - " + contact.type + ")";
}

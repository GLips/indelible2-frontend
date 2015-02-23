import Ember from "ember";

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  actions: {
    decrypteEntry: function(entry) {
      entry.decrypt();
    }
  }
});


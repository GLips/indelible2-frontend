import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    decrypteEntry: function(entry) {
      entry.decrypt();
    }
  }
});


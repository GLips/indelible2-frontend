import Ember from "ember";

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  actions: {
    decrypteEntry: function(entry) {
      entry.decrypt().then(()=> {
        this.transitionToRoute('entries.view', entry);
      });
    }
  }
});


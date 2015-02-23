import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    saveEntry: function() {
      this.get('model').save().then(()=> {
        this.transitionToRoute('entries');
      }, function() { /* Catch errors */ });
    }
  }
});

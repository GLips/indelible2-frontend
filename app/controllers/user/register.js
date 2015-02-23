import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    register: function() {
      var password = this.get('model.password');
      this.get('model').save().then((data)=> {
        this.get('session').login(data, password);
        this.transitionToRoute('entries');
      }, function() { /* Catch errors */ });
    }
  }
});

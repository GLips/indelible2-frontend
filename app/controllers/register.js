import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    register: function() {
      this.get('model').save().then(function(user) {
        localStorage.setItem("password", user.get('password'));
      }, function(){});
    }
  }
});

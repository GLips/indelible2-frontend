import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    login: function() {
      var user = this.get('model');
      user.login().then(function(data) {
        console.log("Data:", data);
      }, function(data) {
        console.error("error?", data);
      });
    }
  }
});

import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    login: function() {
      var user = this.get('model'),
          _this = this;
      user.login().then(function(data) {
        _this.get('session').logIn(data);
      }, function() { /* We must at least catch the error to prevent it
                         from bubbling up to the console. */ });
    }
  }
});

import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    login: function() {
      var user = this.get('model'),
          _this = this;
      user.login().then(function(data) {
        _this.get('session').logIn(data);

        // Will be true if the user was directed to log in from a
        // route requiring authorization.
        var requestedTransition = _this.get('session.requestedTransition');
        if(requestedTransition) {
          requestedTransition.retry();
        } else {
          _this.transitionToRoute('index');
        }
      }, function() { /* We must at least catch the error to prevent it
                         from bubbling up to the console. */ });
    }
  }
});

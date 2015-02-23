import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    login: function() {
      var user = this.get('model'),
          password = user.get('password');
      user.login().then((data)=> {
        this.get('session').login(data, password);

        // Will be true if the user was directed to log in from a
        // route requiring authorization.
        var requestedTransition = this.get('session.requestedTransition');
        if(requestedTransition) {
          requestedTransition.retry();
        } else {
          this.transitionToRoute('index');
        }
      }, function() { /* We must at least catch the error to prevent it
                         from bubbling up to the console. */ });
    }
  }
});

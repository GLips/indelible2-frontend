import Ember from "ember";

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    var isLoggedOut = this.get('session.isLoggedOut');
    if(isLoggedOut) {
      // We want to send the user to their requested page after
      // they've logged in.
      this.set('session.requestedTransition', transition);
      this.transitionTo('login');
    }
  }
});

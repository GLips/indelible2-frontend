import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var _this = this;

    if(this.get('session.isLoggedIn')) {
      this.get('session').logout().then(function() {
        _this.transitionTo('index');
      }, function() { /* Catch errors */ });
    }
  }
});

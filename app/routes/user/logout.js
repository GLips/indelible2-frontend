import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.get('session.isLoggedIn')) {
      this.get('session').logout().then(()=> {
        this.transitionTo('index');
      }, function() { /* Catch errors */ });
    }
  }
});

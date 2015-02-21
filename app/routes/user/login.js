import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var user = this.store.createRecord('user');
    return user;
  }
});

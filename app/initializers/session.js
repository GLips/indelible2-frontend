import Ember from "ember";


// Session object manages session state. Session data exists on a
// per-session basis and is never stored in the database.
var Session = Ember.Object.extend({
  init: function() {
    // Used for grabbing the initial bootstrapped data
    // from the Revel template on initial page load.
    // TODO: Bootstrap user logged in information on initial load.
  },
  _currentUser: false,
  currentUser: function() {
    return this.get('_currentUser');
  }.property('_currentUser'),
  login: function(user) {
    if(user.get('constructor.typeKey') === 'user') {
      this.set('_currentUser', user);
    }
  },
  logout: function() {
    var user = this.get('currentUser'),
        _this = this;

    if(user.get('constructor.typeKey') === 'user') {
      return user.logout().then(function() {
        _this.set('_currentUser', false);
      }, function(wat) {
        /* Catch errors */
      });
    }
  },
  isLoggedIn: function() {
    return (this.get('_currentUser') !== false);
  }.property('_currentUser'),
  isLoggedOut: function() {
    return (this.get('_currentUser') === false);
  }.property('_currentUser')
});

export default {
  name: 'sessionInitializer',
  initialize: function(container, application) {
    container.register('global:session', Session, { singleton: true });
    application.inject('controller', 'session', 'global:session');
    application.inject('route', 'session', 'global:session');
  }
};

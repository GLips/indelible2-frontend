/* global CryptoJS */
import Ember from "ember";


// Session object manages session state. Session data exists on a
// per-session basis and is never stored in the database.
var Session = Ember.Object.extend({
  init: function() {
    // Used for grabbing the initial bootstrapped data
    // from the Revel template on initial page load.
    // TODO: Bootstrap user logged in information on initial load.
    //       could also be done via localStorage.
  },
  _currentUser: false,
  _passwordHash: false,
  currentUser: function() {
    return this.get('_currentUser');
  }.property('_currentUser'),
  login: function(user, password) {
    if(user.get('constructor.typeKey') === 'user') {
      this.set('_currentUser', user);
    }

    // Hash and store the password for later encryption and
    // decryption of journal entries. Password can't be passed
    // in for users who do a hard refresh on the page, so it
    // needs to be re-entered
    if(password) {
      password = CryptoJS.SHA3(password).toString();
      window.localStorage.setItem('passwordHash', password);
      this.set('_passwordHash', password);
      // TODO: Request user password via modal if it's not in any
      //       of these places.
    } else if(window.localStorage.getItem('passwordHash')) {
      this.set('_passwordHash', window.localStorage.getItem('passwordHash'));
    } else {
      this.set('_passwordHash', false);
    }
  },
  logout: function() {
    var user = this.get('currentUser');

    if(user.get('constructor.typeKey') === 'user') {
      return user.logout().then(()=> {
        this.set('_currentUser', false);
      }, function() { /* Catch errors */ });
    }
  },
  isLoggedIn: function() {
    return (this.get('_currentUser') !== false);
  }.property('_currentUser'),
  isLoggedOut: function() {
    return (this.get('_currentUser') === false);
  }.property('_currentUser'),

  passwordHash: function() {
    return this.get('_passwordHash');
  }.property('_passwordHash')
});

export default {
  name: 'sessionInitializer',
  initialize: function(container, application) {
    container.register('global:session', Session, { singleton: true });
    application.inject('controller', 'session', 'global:session');
    application.inject('route', 'session', 'global:session');
    application.inject('model', 'session', 'global:session');
    application.inject('serializer', 'session', 'global:session');
  }
};

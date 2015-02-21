import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('user', function() {
    this.route('register');
    this.route('login');
    this.route('logout');
  });
  this.resource('entries', function() {
    this.route('new');
  });
});

export default Router;

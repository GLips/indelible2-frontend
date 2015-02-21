import DS from "ember-data";

export default DS.Model.extend({
  username: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirm: DS.attr('string'),
  email: DS.attr('string'),
  login: function() {
    // loggingIn is a flag used by the adapter to change the URL POSTed to
    // to log the user in.
    this.set('loggingIn', true);
    this.set('loggingOut', false);
    return this.save();
  },
  logout: function() {
    this.set('loggingIn', false);
    this.set('loggingOut', true);
    // It might make more sense to use a delete function to call logout, but
    // a bug there could be potentially catastrophic. With this we need to
    // make sure the backend sends a blank user with the same ID, or else
    // Ember throws an error.
    return this.save();
  },
});

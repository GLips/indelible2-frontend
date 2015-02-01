import DS from "ember-data";

export default DS.Model.extend({
  username: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirm: DS.attr('string'),
  email: DS.attr('string'),
  login: function() {
    // TODO: Persist login in Ember after login
    // TODO: Bootstrap user logged in information on initial load.
    this.set('loggingIn', true);
    return this.save();
  },
});

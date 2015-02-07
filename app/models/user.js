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
    return this.save();
  },
});

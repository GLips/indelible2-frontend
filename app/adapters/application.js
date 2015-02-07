import DS from "ember-data";
import Ember from "ember";

var forEach = Ember.EnumerableUtils.forEach;

export default DS.RESTAdapter.extend({
  namespace: 'api/1',
  ajaxError: function(jqXHR) {
    var error = this._super(jqXHR);

    // Server has returned an 'unprocessable entity' error, extract
    // the fields with error messages for Ember.
    if (jqXHR && jqXHR.status === 422) {
      var response = Ember.$.parseJSON(jqXHR.responseText),
      errors = {};

      if (response.errors !== undefined) {
        var jsonErrors = response.errors;

        forEach(Ember.keys(jsonErrors), function(key) {
          errors[Ember.String.camelize(key)] = jsonErrors[key];
        });
      }

      return new DS.InvalidError(errors);
    } else {
      return error;
    }
  }
});

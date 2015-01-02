import Ember from "ember";
import DS from "ember-data";

export default DS.RESTSerializer.extend({
  primaryKey: "Id",
  keyForAttribute: function (attr) {
    return Ember.String.capitalize(attr);
  },
  keyForRelationship: function(attr) {
    return Ember.String.capitalize(attr);
  }
});


import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    var entry = this.store.createRecord('entry');
    return entry;
  },
  afterModel: function(model) {
    var history = this.get('store').createRecord('entry/history');
    model.set('history', history);
  }
});

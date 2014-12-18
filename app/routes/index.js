import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    var store = this.get('store'),
        entry = store.createRecord('entry');
    return entry;
  },
  afterModel: function(model) {
    var history = this.get('store').createRecord('entry/history');
    model.set('history', history);
  }
});

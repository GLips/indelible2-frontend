import Ember from "ember";
import Authorized from "frontend/routes/mixins/authorized";

export default Ember.Route.extend(Authorized, {
  model: function() {
    var entry = this.store.createRecord('entry');
    return entry;
  },
  afterModel: function(model) {
    var history = this.get('store').createRecord('entry/history');
    model.set('history', history);
  }
});

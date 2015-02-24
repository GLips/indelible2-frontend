import Ember from "ember";
import Authorized from "frontend/routes/mixins/authorized";

export default Ember.Route.extend(Authorized, {
  model: function(params) {
    var entry = this.store.find('entry', params.entry_id);
    return entry;
  }
});


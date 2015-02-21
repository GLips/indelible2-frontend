import Ember from "ember";
import Authorized from "frontend/routes/mixins/authorized";

export default Ember.Route.extend(Authorized, {
  model: function() {
    var userId = parseInt(this.get('session.currentUser.id'));
    return this.store.filter('entry', {}, function(entry) {
      return parseInt(entry.get('userId')) === userId;
    });
  }
});

import Ember from "ember";
import Authorized from "frontend/routes/mixins/authorized";

export default Ember.Route.extend(Authorized, {
  model: function() {
    var userId = parseInt(this.get('session.currentUser.id'));
    return this.store.filter('entry', {}, function(entry) {
      // Need to filter in case a user logs out & logs back in
      // as another user. Old entries will still be in the app's
      // cache.
      return parseInt(entry.get('userId')) === userId;
    });
  }
});

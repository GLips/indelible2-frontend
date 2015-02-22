/* global CryptoJS */
import Ember from "ember";
import Authorized from "frontend/routes/mixins/authorized";

export default Ember.Route.extend(Authorized, {
  model: function() {
    var userId = parseInt(this.get('session.currentUser.id'));
    return this.store.filter('entry', {}, function(entry) {
      return parseInt(entry.get('userId')) === userId;
    });
  },
  afterModel: function(entries) {
    entries.forEach(function(entry) {
      var content = entry.get('content'),
          passwordHash = localStorage.getItem('passwordHash');
      content = CryptoJS.AES.decrypt(content, passwordHash);
      entry.set('content', content.toString(CryptoJS.enc.Utf8));
    });
  }
});

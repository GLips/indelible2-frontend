import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    register: function() {
      var password = this.get('model.password'),
          _this = this;
      this.get('model').save().then(function(data) {
        _this.get('session').login(data, password);
        _this.transitionToRoute('entries');
      }, function() { /* Catch errors */ });
    }
  }
});

import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    register: function() {
      localStorage.setItem("password", this.get('model.password'));
      this.get('model').save();
    }
  }
});

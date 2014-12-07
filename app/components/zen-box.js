import Ember from "ember";

export default Ember.Component.extend({
  timeElapsed: function() {
    return this.get('clock.pulse');
  }.property('clock.pulse')
});

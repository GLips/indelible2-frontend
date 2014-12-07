import Ember from "ember";

export default Ember.Component.extend({
  content: "",
  charactersPerMinute: function() {
    var content = this.get('content'),
        timeElapsed = this.get('clock.pulse');
    return (content.length / timeElapsed).toFixed(2);
  }.property('content', 'clock.pulse'),
  timeElapsed: function() {
    return this.get('clock.pulse');
  }.property('clock.pulse')
});

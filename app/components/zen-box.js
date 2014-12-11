import Ember from "ember";

export default Ember.Component.extend({
  content: "",
  startTime: 0,
  charactersPerMinute: function() {
    var content = this.get('content'),
        timeElapsed = this.get('timeElapsed');

    if(this.get('startTime') === 0 && content.length > 0) {
      this.set('startTime', timeElapsed);
    }

    return (content.length / timeElapsed).toFixed(2);
  }.property('content', 'clock.pulse'),
  timeElapsed: function() {
    return this.get('clock.pulse') - this.get('startTime');
  }.property('clock.pulse')
});

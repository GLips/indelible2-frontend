import Ember from "ember";

export default Ember.Component.extend({
  giveFeedback: function() {
    var target = this.get('target'),
        modifier = this.get('modifier'),
        scale = Math.max(0, modifier - target + 1);
    this.set('zenCircleStyle',
      "transform:scale(" + scale + ");"
    );
  }.observes('modifier')
});

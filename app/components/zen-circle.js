import Ember from "ember";

export default Ember.Component.extend({
  giveFeedback: function() {
    this.set('zenCircleStyle',
      "transform:scale(" + this.get('modifier') + ");"
    );
  }.observes('modifier')
});

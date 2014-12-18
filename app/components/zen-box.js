import Ember from "ember";

export default Ember.Component.extend({
  classNames: ['zen-box'],

  focus: function() {
    this.$('input').focus();
  }.on('didInsertElement'),

  charactersPerSecond: function() {
    return this.get('model.history.CPS');
  }.property('content', 'clock.pulse'),

  targetRate: function() {
    //int[60]
  }
});

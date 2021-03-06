import Ember from "ember";

var ClockService = Ember.Object.extend({
  pulse: Ember.computed.oneWay('_seconds').readOnly(),
  tick: function() {
    var clock = this;
    Ember.run.later(function() {
      var seconds = clock.get('_seconds');
      if(typeof seconds === 'number') {
        clock.set('_seconds', seconds + (1/4));
      }
    }, 250);
  }.observes('_seconds').on('init'),
  _seconds: 0
});

export default {
  name: 'clockServiceInitializer',
  initialize: function(container, application) {
    container.register('clock:service', ClockService);
    application.inject('component:zen-box', 'clock', 'clock:service');
    application.inject('model:entry/history', 'clock', 'clock:service');
    application.inject('model:entry', 'clock', 'clock:service');
  }
};

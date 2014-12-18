import DS from "ember-data";

export default DS.Model.extend({
  timeline: [],
  entry: DS.belongsTo('entry'),
  _startTime: 0,
  interval: 0.25,
  totalTime: 60,
  oldContentLength: 0,
  targetCPS: 4,

  startTime: function() {
    var contentLength = this.get('entry.content.length'),
        timeElapsed = this.get('timeElapsed');
    if(this.get('_startTime') === 0 && contentLength > 0) {
      this.set('_startTime', timeElapsed);
      this.removeObserver('entry.content', this, this.startTime);
    }
  }.observes('entry.content'),

  CPS: function() {
    var timeline  = this.get('timeline'),
        range     = this.get('range');
    var start = timeline.length - range;
    var period = timeline.slice(start, timeline.length);
    var average = period.reduce(function(a, b) {
      return a + b;
    }, 0);
    return average / (period.length / this.get('entriesPerSecond'));
  }.property('entry.content', 'clock.pulse'),

  entriesPerSecond: function() {
    return (1 / this.get('interval'));
  }.property('interval'),

  range: function() {
    return Math.min(
        this.get('timeline.length') - 1,
        this.get('entriesPerSecond') * this.get('totalTime')
    );
  }.property('entriesPerSecond', 'totalTime', 'clock.pulse'),

  addEntry: function() {
    var contentLength = this.get('entry.content.length'),
        oldContentLength = this.get('oldContentLength'),
        timeElapsed = this.get('timeElapsed'),
        timeline = this.get('timeline'),
        interval = this.get('interval');

    // Determine CPS by activity in the last 30 seconds
    if(this.get('_startTime') > 0 && timeElapsed % interval === 0) {
      timeline.push(contentLength - oldContentLength);
      this.set('oldContentLength', contentLength);
      this.set('timeline', timeline);
    }

  }.observes('clock.pulse'),

  timeElapsed: function() {
    return this.get('clock.pulse') - this.get('_startTime');
  }.property('clock.pulse')
});

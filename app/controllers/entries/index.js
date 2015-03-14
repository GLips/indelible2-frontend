import Ember from "ember";

var monthObject = function(month) {
  return Ember.Object.create({
    month: month,
    entries: [],
    addNewEntry: function(entry) {
      this.entries.push(entry);
    }
  });
};

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  months: function() {
    var months = [],
      lastMonth = "",
      month,
      currentMonth;
    // Assumes list is sorted.
    this.get('content').forEach(function(entry) {
      month = entry.get('month');
      if(month !== lastMonth) {
        months.push(monthObject(month));
        lastMonth = month;
        currentMonth = months[(months.length - 1)];
      }
      currentMonth.addNewEntry(entry);
    });
    return months;
  }.property('[]'),
  actions: {
    decryptEntry: function(entry) {
      entry.decrypt().then(()=> {
        this.transitionToRoute('entries.view', entry);
      });
    }
  }
});


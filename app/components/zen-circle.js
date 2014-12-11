import Ember from "ember";

export default Ember.Component.extend({
  content: "content! yay!",
  classNames: ['circle'],
  giveFeedback: function() {
    var circumference;
    circumference = this.get('modifier') * 100;
    this.$().css("width", circumference);
    this.$().css("height", circumference);
  }.observes('modifier')
});

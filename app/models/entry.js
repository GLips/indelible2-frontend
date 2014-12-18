import DS from "ember-data";

export default DS.Model.extend({
  content: DS.attr('string', { defaultValue: "" }),
  history: DS.belongsTo('entry/history')
});

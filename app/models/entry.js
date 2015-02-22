/* global CryptoJS */
import DS from "ember-data";

export default DS.Model.extend({
  content: DS.attr('string', { defaultValue: "" }),
  userId: DS.attr('number'),
  history: DS.belongsTo('entry/history'),
  save: function() {
    var content = this.get('content'),
        password = window.localStorage.getItem('passwordHash');

    // Encrypt the journal entry's contents using the user's
    // hashed password before they're sent to the server.
    content = CryptoJS.AES.encrypt(content, password);
    this.set('content', content.toString());

    return this._super();
  }
  // TODO: (FIX) Newly created entries should show up at the
  //       top of the entries list. Currently at bottom.
  // TODO: Redirect to entries index on successful creation of
  //       a new entry
  // TODO: Create a registry of globally used variable/accessor
  //       names to replace things like passwordHash everywhere
  // TODO: Content and style for the home page
  // TODO: Style out the entry index page
  // TODO: Give entries on the entry index page good titles
  // TODO: Style and layout for the new entry page
});

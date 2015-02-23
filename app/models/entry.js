/* global CryptoJS */
import DS from "ember-data";

export default DS.Model.extend({
  content: DS.attr('string', { defaultValue: "" }),
  userId: DS.attr('number'),
  history: DS.belongsTo('entry/history'),
  decrypt: function() {
    this.set('decrypted', true);
    var content = this.get('content'),
        passwordHash = this.get('session.passwordHash');
    // TODO: Add a timer, flag for 'decrypting' to drive a
    //       progress bar on the frontend.
    CryptoJS.AES.decrypt(content, passwordHash);
    content = CryptoJS.AES.decrypt(content, passwordHash);
    if(content) {
      this.set('content', content.toString(CryptoJS.enc.Utf8));
    }
    return this;
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

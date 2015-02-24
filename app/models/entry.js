/* global CryptoJS */
import Ember from "ember";
import DS from "ember-data";
import IndModel from "frontend/models/mixins/model";

export default IndModel.extend({
  content: DS.attr('string', { defaultValue: "" }),
  userId: DS.attr('number'),
  history: DS.belongsTo('entry/history'),
  decryptionPercentage: function() {
    var percentage = (this.get('clock.pulse') - this.get('decryptionStartTime')) * 200;
    return percentage;
  }.property('clock.pulse'),
  // TODO: decrypt() ideally won't mutate the object
  decrypt: function() {
    if(this.get('decrypted') || this.get('decrypting')) {
      return this;
    }

    this.set('decrypting', true);
    this.set('decryptionStartTime', this.get('clock.pulse'));
    // We return a promise so we can chain events using .then() depending
    // on the context decrypt is called in.
    return new Ember.RSVP.Promise((resolve)=> {
      // Add a delay and drive a progress bar to drive home the fact that
      // these entries are encrypted.
      Ember.run.later(()=> {
        this.set('decrypting', false);
        this.set('decrypted', true);
        var content = this.get('content'),
            passwordHash = this.get('session.passwordHash');
        CryptoJS.AES.decrypt(content, passwordHash);
        content = CryptoJS.AES.decrypt(content, passwordHash);
        if(content) {
          this.set('content', content.toString(CryptoJS.enc.Utf8));
        }
        resolve();
      }, 500);
    });
  }
  // TODO: Create a registry of globally used variable/accessor
  //       names to replace things like passwordHash everywhere
  // TODO: Create an entry view page
  // TODO: Content and style for the home page
  // TODO: Style out the entry index page
  // TODO: Give entries on the entry index page good titles
  // TODO: Style and layout for the new entry page
});

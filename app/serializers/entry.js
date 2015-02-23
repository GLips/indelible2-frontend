/* global CryptoJS */
import ApplicationSerializer from "frontend/serializers/application";

export default ApplicationSerializer.extend({
  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);

    // Always encrypt content before it's saved to the server
    var content = json.Content,
        password = this.get('session.passwordHash');

    // Encrypt the journal entry's contents using the user's
    // hashed password.
    content = CryptoJS.AES.encrypt(content, password).toString();
    json.Content = content;

    return json;
  }
});



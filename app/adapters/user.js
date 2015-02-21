import app from "../adapters/application";

export default app.extend({
  buildURL: function(type, id, record) {
    // Send the user to the /user/logins URL if they're logging in.
    // This is a simple hack to not require a special 'login' model
    // to point to a different URL when logging in vs. registering.
    if(record.get('loggingIn')) {
      type = "user/login";
    } else if(record.get('loggingOut')) {
      type = "user/logout";
    }
    return this._super(type, id, record);
  }
});

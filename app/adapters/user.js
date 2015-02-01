import app from "../adapters/application";

export default app.extend({
  buildURL: function(type, id, record) {
    if(record.get('loggingIn')) {
      type = "user/login";
    }
    return this._super(type, id, record);
  }
});

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/crypto/core-min.js')
app.import('vendor/crypto/aes.js')
app.import('vendor/crypto/sha3.js')

var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/fonts/bootstrap'
});

module.exports = app.toTree(bootstrapFonts);

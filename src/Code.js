/* global CacheService, UrlFetchApp, HtmlService, PropertiesService, OAuth2 */

if (typeof(require) !== 'undefined') {
  var Connector = require('./Connector.js')['default'];
}

var connector = new Connector({
  CacheService: CacheService,
  UrlFetchApp: UrlFetchApp,
  HtmlService: HtmlService,
  PropertiesService: PropertiesService,
  OAuth2: OAuth2
});

// eslint-disable-next-line no-unused-vars
function getConfig() {
  return connector.getConfig();
}

// eslint-disable-next-line no-unused-vars
function getSchema() {
  return connector.getSchema();
}

// eslint-disable-next-line no-unused-vars
function getData(request) {
  return connector.getData(request);
}

// eslint-disable-next-line no-unused-vars
function getAuthType() {
  return connector.getAuthType();
}

// eslint-disable-next-line no-unused-vars
function isAdminUser() {
  return connector.isAdminUser();
}

// eslint-disable-next-line no-unused-vars
function authCallback(request) {
  return connector.authCallback(request);
}

// eslint-disable-next-line no-unused-vars
function isAuthValid() {
  return connector.isAuthValid();
}

// eslint-disable-next-line no-unused-vars
function resetAuth() {
  connector.resetAuth();
}

// eslint-disable-next-line no-unused-vars
function get3PAuthorizationUrls() {
  return connector.get3PAuthorizationUrls();
}

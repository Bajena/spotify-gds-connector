/* global CacheService, UrlFetchApp, HtmlService, PropertiesService, OAuth2 */

/* istanbul ignore next */
if (typeof(require) !== 'undefined') {
  var Connector = require('./Connector.js')['default'];
}

function getConnector() {
  return new Connector({
    CacheService: CacheService,
    UrlFetchApp: UrlFetchApp,
    HtmlService: HtmlService,
    PropertiesService: PropertiesService,
    OAuth2: OAuth2
  });
}

// eslint-disable-next-line no-unused-vars
function getConfig() {
  return getConnector().getConfig();
}

// eslint-disable-next-line no-unused-vars
function getSchema() {
  return getConnector().getSchema();
}

// eslint-disable-next-line no-unused-vars
function getData(request) {
  return getConnector().getData(request);
}

// eslint-disable-next-line no-unused-vars
function getAuthType() {
  return getConnector().getAuthType();
}

// eslint-disable-next-line no-unused-vars
function isAdminUser() {
  return getConnector().isAdminUser();
}

// eslint-disable-next-line no-unused-vars
function authCallback(request) {
  return getConnector().authCallback(request);
}

// eslint-disable-next-line no-unused-vars
function isAuthValid() {
  return getConnector().isAuthValid();
}

// eslint-disable-next-line no-unused-vars
function resetAuth() {
  getConnector().resetAuth();
}

// eslint-disable-next-line no-unused-vars
function get3PAuthorizationUrls() {
  return getConnector().get3PAuthorizationUrls();
}

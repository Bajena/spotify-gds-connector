var oauth = {};

/** @const */
oauth.OAUTH_CLIENT_ID = 'OAUTH_CLIENT_ID';

/** @const */
oauth.OAUTH_CLIENT_SECRET = 'OAUTH_CLIENT_SECRET';

/**
 * This builds an OAuth2 service for connecting to Spotify
 * More info here: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorizaton-code-flow
 *
 * @return {OAuth2Service}
 */
function getOAuthService() {
  // This is where we pull out the "client id" and "client secret" from the
  // Script Properties.
  var scriptProps = PropertiesService.getScriptProperties();
  var clientId = scriptProps.getProperty(oauth.OAUTH_CLIENT_ID);
  var clientSecret = scriptProps.getProperty(oauth.OAUTH_CLIENT_SECRET);
  return OAuth2.createService('spotify')
    .setAuthorizationBaseUrl('https://accounts.spotify.com/authorize')
    .setTokenUrl('https://accounts.spotify.com/api/token')
    .setClientId(clientId)
    .setClientSecret(clientSecret)
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('user-read-recently-played')
    .setCallbackFunction('authCallback');
}

/**
 * The callback that is invoked after a successful or failed authentication
 * attempt.
 *
 * @param {object} request
 * @return {OAuth2Service}
 */
function authCallback(request) {
  console.log(request);
  var authorized = getOAuthService().handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

/**
 * @return {boolean} `true` if the user has successfully authenticated and false
 * otherwise.
 */
function isAuthValid() {
  var service = getOAuthService();
  if (service == null) {
    return false;
  }
  return service.hasAccess();
}

/**
 * Resets the OAuth2 service. This will allow the user to reauthenticate with
 * the external OAuth2 provider.
 */
function resetAuth() {
  var service = getOAuthService();
  service.reset();
}

/**
 * Used as a part of the OAuth2 flow.
 *
 * @return {string} The authorization url if service is defined.
 */
function get3PAuthorizationUrls() {
  var service = getOAuthService();
  if (service == null) {
    return '';
  }
  return service.getAuthorizationUrl();
}

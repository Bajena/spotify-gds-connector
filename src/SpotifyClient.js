if (typeof(require) !== 'undefined') {
  var DataCache = require('./DataCache.js')['default'];
}

/**
 * Constructor for SpotifyClient
 *
 * @param cacheService {object} - An object with same interface as Google's CacheService
 * @param urlFetchApp {object} - An object with same interface as Google's UrlFetchApp
 * @param apiKey {String} - Spotify API key
 *
 * @return {object} a Connector object.
 */
function SpotifyClient(cacheService, urlFetchApp, apiKey) {
  this.cacheService = cacheService;
  this.urlFetchApp = urlFetchApp;
  this.apiKey = apiKey;

  return this;
}

/**
 * @return {array} Array of Spotify play objects
 */
SpotifyClient.prototype.getRecentPlays = function(startDate, endDate) {
  var dataCache = new DataCache(this.cacheService, startDate, endDate);
  var plays = null;
  plays = this.fetchFromCache(dataCache);
  if (!plays) {
    plays = this.fetchFromApi(startDate, endDate);
    this.storeInCache(plays, dataCache);
  }

  return plays;
};

// private

SpotifyClient.prototype.fetchFromCache = function(cache) {
  var plays = null;
  console.log('Trying to fetch from cache...');
  try {
    var playsString = cache.get();
    plays = JSON.parse(playsString);
    console.log('Fetched succesfully from cache', plays.length);
  } catch (e) {
    console.log('Error when fetching from cache:', e);
  }

  return plays;
};

SpotifyClient.prototype.storeInCache = function(cache, plays) {
  console.log('Setting data to cache...');
  try {
    cache.set(JSON.stringify(plays));
  } catch (e) {
    console.log('Error when storing in cache', e);
  }
};

SpotifyClient.prototype.fetchFromApi = function(startDate, endDate) {
  var headers = {
    Authorization: 'Bearer ' + this.apiKey
  };
  var start = startDate.getTime();
  var end = endDate.getTime();

  var url = 'https://api.spotify.com/v1/me/player/recently-played?before=' + end;

  var data = [];
  var fetchNext = true;

  do {
    console.log('Fetching', url, headers);
    var result = this.urlFetchApp.fetch(url, { headers: headers });
    console.log('Response', result);
    const parsedResult = JSON.parse(result.getContentText());

    for (var i = 0; i < parsedResult.items.length; i++) {
      var v = parsedResult.items[i];
      var playedAt = new Date(v.played_at).getTime();
      if (playedAt < start) {
        console.log('Item not eligible. ', v);
        fetchNext = false;
      } else {
        data.push(v);
      }
    }

    if (!fetchNext) {
      console.log('Ending');
      break;
    }

    url = parsedResult.next;

    if (!url) {
      console.log("No 'next' key. Done!");
      break;
    }
  } while (fetchNext);

  console.log('Data:', data.length);
  return data;
};

/* global exports */
/* istanbul ignore next */
if (typeof(exports) !== 'undefined') {
  exports['__esModule'] = true;
  exports['default'] = SpotifyClient;
}

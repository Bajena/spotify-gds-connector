function getConfig() {
  return {
    dateRangeRequired: true
  };
}

function getSchema() {
  return {
    schema: [
      {
        name: 'track_name',
        label: 'Track Name',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION'
        }
      },
      {
        name: 'artist',
        label: 'Artist',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION'
        }
      },
      {
        name: 'played_at_hour',
        label: 'Played at (date + hour)',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION',
          semanticGroup: 'DATETIME',
          semanticType: 'YEAR_MONTH_DAY_HOUR'
        }
      },
      {
        name: 'played_at_date',
        label: 'Played at (date)',
        dataType: 'STRING',
        semantics: {
          conceptType: 'DIMENSION',
          semanticGroup: 'DATETIME',
          semanticType: 'YEAR_MONTH_DAY'
        }
      },
      {
        name: 'plays',
        label: 'Plays',
        dataType: 'NUMBER',
        formula: 'COUNT(track_name)',
        semantics: {
          conceptType: 'METRIC',
          isReaggregatable: false
        }
      },
      {
        name: 'tracks_count',
        label: 'Played Tracks',
        dataType: 'NUMBER',
        formula: 'COUNT(track_name)',
        semantics: {
          conceptType: 'METRIC',
          isReaggregatable: false
        }
      },
      {
        name: 'popularity',
        label: 'Popularity',
        dataType: 'NUMBER',
        semantics: {
          conceptType: 'METRIC'
        }
      }
    ]
  };
}

function fetchPlays(startDate, endDate) {
  var headers = {
    Authorization: 'Bearer ' + getOAuthService().getAccessToken()
  }
  var url = 'https://api.spotify.com/v1/me/player/recently-played'
  console.log('Fetching', headers);
  var result = UrlFetchApp.fetch(url, { headers: headers });
  console.log('Response', result);
  return JSON.parse(result.getContentText());
}

function getData(request) {
  // Prepare the schema for the fields requested.
  var dataSchema = [];
  var fixedSchema = getSchema().schema;
  request.fields.forEach(function(field) {
    for (var i = 0; i < fixedSchema.length; i++) {
      if (fixedSchema[i].name == field.name) {
        dataSchema.push(fixedSchema[i]);
        break;
      }
    }
  });

  // We'll query Spotify API here. For now let's just return two mocked records
  // var mockedData = {
  //   items: [
  //     {
  //       track: {
  //         name: "Voice of the New Generation",
  //         popularity: 25,
  //         artists: [
  //           {
  //             name: "Santa Cruz"
  //           }
  //         ]
  //       },
  //       played_at: "2018-06-08T16:16:13.185Z"
  //     },
  //     {
  //       track: {
  //         name: "Shorty Wanna Be A Thug",
  //         popularity: 59,
  //         artists: [
  //           {
  //             name: "2Pac"
  //           }
  //         ]
  //       },
  //       played_at: "2018-06-08T14:11:02Z"
  //     }
  //   ]
  // };

  // Prepare the tabular data.
  var data = [];
  fetchPlays().items.forEach(function(play) {
    var values = [];
    var playTime = new Date(play.played_at);
    // Google expects YYMMDD format
    var playedAtDate = playTime.toISOString().slice(0, 10).replace(/-/g, "");
    // Provide values in the order defined by the schema.
    dataSchema.forEach(function(field) {
      switch (field.name) {
      case 'track_name':
        values.push(play.track.name);
        break;
      case 'artist':
        values.push(play.track.artists[0].name);
        break;
      case 'played_at_hour':
        values.push(
          playedAtDate +
          (playTime.getHours() < 10 ? '0' : '') + playTime.getHours()
        );
        break;
      case 'played_at_date':
        values.push(playedAtDate);
        break;
      case 'popularity':
        values.push(play.track.popularity);
        break;
      default:
        values.push('');
      }
    });
    data.push({
      values: values
    });
  });

  return {
    schema: dataSchema,
    rows: data
  };
}

function getAuthType() {
  return { type: "OAUTH2" };
}

function isAdminUser() {
  return true;
}

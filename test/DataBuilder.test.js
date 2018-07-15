import DataBuilder from '../src/DataBuilder';

let dataSchema, builder;

beforeEach(() => {
  dataSchema = [
    {
      name: 'track_name'
    },
    {
      name: 'artist'
    },
    {
      name: 'played_at_hour'
    },
    {
      name: 'played_at_date'
    },
    {
      name: 'popularity'
    }
  ];

  builder = new DataBuilder(dataSchema);
});

test('build', () => {
  const play = {
    'track': {
      'artists': [
        {
          'external_urls': {
            'spotify': 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb'
          },
          'href': 'https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb',
          'id': '5INjqkS1o8h1imAzPqGZBb',
          'name': 'Tame Impala',
          'type': 'artist',
          'uri': 'spotify:artist:5INjqkS1o8h1imAzPqGZBb'
        }
      ],
      'available_markets': [
        'CA',
        'MX',
        'US'
      ],
      'disc_number': 1,
      'duration_ms': 467586,
      'explicit': false,
      'external_urls': {
        'spotify': 'https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed'
      },
      'href': 'https://api.spotify.com/v1/tracks/2X485T9Z5Ly0xyaghN73ed',
      'id': '2X485T9Z5Ly0xyaghN73ed',
      'name': 'Let It Happen',
      'preview_url': 'https://p.scdn.co/mp3-preview/05dee1ad0d2a6fa4ad07fbd24ae49d58468e8194',
      'track_number': 1,
      'type': 'track',
      'uri': 'spotify:track:2X485T9Z5Ly0xyaghN73ed',
      'popularity': 3
    },
    'played_at': '2016-12-13T20:42:17.016Z',
    'context': {
      'uri': 'spotify:artist:5INjqkS1o8h1imAzPqGZBb',
      'external_urls': {
        'spotify': 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb'
      },
      'href': 'https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb',
      'type': 'artist'
    },
  };

  const expected = [
    'Let It Happen',
    'Tame Impala',
    '2016121321',
    '20161213',
    3
  ];

  expect(builder.build(play)).toEqual(expected);
});

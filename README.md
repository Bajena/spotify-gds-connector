# Custom Google Data Studio connector
[![CircleCI](https://circleci.com/gh/Bajena/spotify-gds-connector/tree/master.svg?style=svg)](https://circleci.com/gh/Bajena/spotify-gds-connector/tree/master)

## Description
This repo contains code of a custom [Google Data Studio connector](https://developers.google.com/datastudio/connector/gallery/) for displaying stats about your recent plays in Spotify. 

The connector uses [Spotify API](https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/) to fetch the tracks.
Unfortunately the API endpoint is currently limited to the recent 50 tracks.

## Preview
Here's how an example report looks like:
![image](https://user-images.githubusercontent.com/5732023/42778465-7441218c-893d-11e8-98d5-cc27c7399481.png)

## More info
I described the whole development process in a few blog posts:
* Introduction - https://medium.com/@bajena3/building-a-custom-google-data-studio-connector-from-a-z-b4d711a5cf58
* Development environment setup and creating basic connector code - https://medium.com/@bajena3/building-a-custom-google-data-studio-connector-from-a-z-part-1-basic-setup-445a6d965d3f
* OAuth and calling Spotify API - https://medium.com/@bajena3/building-a-custom-google-data-studio-connector-from-a-z-part-2-oauth-calling-apis-caching-edb3e25b18e7
* Unit testing and linting the code - https://medium.com/@bajena3/building-a-custom-google-data-studio-connector-from-a-z-part-3-unit-tests-and-eslint-setup-16807675dc10

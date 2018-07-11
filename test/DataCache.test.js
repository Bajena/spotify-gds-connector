import DataCache from '../src/DataCache';

test('initialization', () => {
  const startDate = new Date('2018-07-09');
  const endDate = new Date('2018-07-10');
  const cache = new DataCache({}, startDate, endDate);

  expect(cache.cacheKey).toBe('2018-07-09_2018-07-10');
});
